import * as cheerio from 'cheerio'
import { mkdir, writeFile } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

/**
 * Base URL of the website with source data.
 */
const BASE_URL = 'https://www.acju.lk/prayer-times/'

/**
 * Valid months for PDFs to validate against
 */
const VALID_MONTHS = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

/**
 * fetchPrayerTimesPage fetches and parses the ACJU prayer times HTML page
 */
async function fetchPrayerTimesPage() {
  console.log(`Fetching prayer times page from ${BASE_URL}...`)
  const response = await fetch(BASE_URL)
  if (!response.ok) {
    throw new Error(`Failed to fetch page: ${response.status} ${response.statusText}`)
  }
  const html = await response.text()
  return cheerio.load(html)
}

/**
 * sanitizeLocationName sanitizes location name to only contain lowercase a-z characters
 */
function sanitizeLocationName(name) {
  let sanitized = name.toLowerCase()
  sanitized = sanitized.replace(/\([^)]*\)/g, '')
  sanitized = sanitized.replace(/district/g, '')
  sanitized = sanitized.replace(/[^a-z ]/g, '')
  sanitized = sanitized.replace(/\s+/g, ' ')
  sanitized = sanitized.replace(/nuwara eliya/g, 'nuwaraeliya')
  sanitized = sanitized.trim()
  return sanitized
}

/**
 * sanitizeMonthName sanitizes month name to lowercase and validates it
 */
function sanitizeMonthName(name) {
  const sanitized = name.toLowerCase().trim()
  if (!VALID_MONTHS.includes(sanitized)) {
    throw new Error(`Invalid month name: ${name}`)
  }
  return sanitized
}

/**
 * getMonthNumber returns the month number (01-12) for a given month name
 */
function getMonthNumber(monthName) {
  const index = VALID_MONTHS.indexOf(monthName)
  return String(index + 1).padStart(2, '0')
}

/**
 * extractLocationsWithPdfs extracts locations and their PDFs using DOM structure
 */
function extractLocationsWithPdfs($) {
  const locations = []

  $('details.e-n-accordion-item').each((_, accordionElement) => {
    const $accordion = $(accordionElement)

    const locationName = $accordion.find('summary .e-n-accordion-item-title-text').text().trim()
    if (!locationName) return

    const sanitizedLocationName = sanitizeLocationName(locationName)

    const pdfs = []

    $accordion.find('div[role="region"] > div.e-con.e-child').each((__, monthBlock) => {
      const $block = $(monthBlock)

      const monthName = $block.find('.elementor-widget-text-editor strong').first().text().trim()
      const pdfLink = $block.find('a.elementor-icon[href$=".pdf"]').attr('href')

      if (monthName && pdfLink) {
        pdfs.push({
          month: sanitizeMonthName(monthName),
          url: pdfLink
        })
      }
    })

    if (pdfs.length > 0) {
      locations.push({
        name: locationName,
        sanitizedName: sanitizedLocationName,
        pdfs
      })
    }
  })

  console.log(`Found ${locations.length} locations`)
  return locations
}

/**
 * validateLocations validates that each location has exactly 12 PDFs
 */
function validateLocations(locations) {
  console.log('\n=== Validating Locations ===')
  const errors = []

  for (const location of locations) {
    if (location.pdfs.length !== 12) {
      const error = `${location.name} (${location.sanitizedName}): has ${location.pdfs.length} PDFs, expected 12`
      errors.push(error)
      console.error(`  ✗ ${error}`)
    } else {
      console.log(`  ✓ ${location.name}: 12 PDFs`)
    }
  }

  if (errors.length > 0) {
    throw new Error(`Validation failed: ${errors.length} location(s) do not have 12 PDFs`)
  }

  console.log('All locations validated successfully\n')
}

/**
 * downloadPdf downloads a single PDF file to the specified path
 */
async function downloadPdf(url, filePath) {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to download ${url}: ${response.status} ${response.statusText}`)
  }

  const arrayBuffer = await response.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  await mkdir(dirname(filePath), { recursive: true })
  await writeFile(filePath, buffer)

  return filePath
}

/**
 * downloadLocationPdfs downloads all PDFs for a single location in parallel
 */
async function downloadLocationPdfs(location, cacheDir) {
  const locationDir = join(cacheDir, location.sanitizedName)

  console.log(`\nDownloading ${location.pdfs.length} PDFs for ${location.name}...`)
  console.log(`  Folder: ${location.sanitizedName}`)

  const downloadPromises = location.pdfs.map(async ({ month, url }) => {
    const monthNumber = getMonthNumber(month)
    const fileName = `${monthNumber}-${month}.pdf`
    const filePath = join(locationDir, fileName)

    try {
      await downloadPdf(url, filePath)
      console.log(`  ✓ Downloaded: ${fileName}`)
      return { success: true, fileName }
    } catch (error) {
      console.error(`  ✗ Failed: ${fileName} - ${error.message}`)
      return { success: false, fileName, error: error.message }
    }
  })

  const results = await Promise.all(downloadPromises)
  const successful = results.filter(r => r.success).length
  const failed = results.filter(r => !r.success).length

  console.log(`${location.sanitizedName}: ${successful} succeeded, ${failed} failed`)

  return results
}

/**
 * downloadAllPdfs orchestrates the download of all PDFs
 */
async function downloadAllPdfs() {
  const cacheDir = join(__dirname, '..', '.cache')

  try {
    const $ = await fetchPrayerTimesPage()
    const locations = extractLocationsWithPdfs($)

    validateLocations(locations)

    const totalPdfs = locations.reduce((sum, loc) => sum + loc.pdfs.length, 0)
    console.log(`Total PDFs to download: ${totalPdfs}`)
    console.log(`Cache directory: ${cacheDir}\n`)

    let totalSuccessful = 0
    let totalFailed = 0

    for (const location of locations) {
      const results = await downloadLocationPdfs(location, cacheDir)
      totalSuccessful += results.filter(r => r.success).length
      totalFailed += results.filter(r => !r.success).length
    }

    console.log(`\n=== Download Complete ===`)
    console.log(`Total successful: ${totalSuccessful}`)
    console.log(`Total failed: ${totalFailed}`)
    console.log(`Cache directory: ${cacheDir}`)

  } catch (error) {
    console.error('Fatal error:', error)
    process.exit(1)
  }
}

downloadAllPdfs()
