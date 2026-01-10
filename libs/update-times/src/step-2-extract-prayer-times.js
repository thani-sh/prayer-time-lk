import { PDFParse } from 'pdf-parse'
import { readdir, readFile, writeFile } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

/**
 * Valid prayer names expected in the data
 */
const VALID_PRAYERS = ['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha']

/**
 * Valid month names to validate directory processing
 */
const VALID_MONTHS = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']

/**
 * sanitizeTime sanitizes time string and returns minutes from midnight
 */
function sanitizeTime(timeStr) {
  if (!timeStr) {
    throw new Error('Time string is empty')
  }
  let sanitized = timeStr.toLowerCase().trim()
  sanitized = sanitized.replace(/\s+/g, '')
  sanitized = sanitized.replace(/[^\d:]/g, '')
  const timeMatch = sanitized.match(/^(\d{1,2}):(\d{2})$/)
  if (!timeMatch) {
    throw new Error(`Invalid time format: ${timeStr}`)
  }
  const hours = parseInt(timeMatch[1])
  const minutes = parseInt(timeMatch[2])
  if (hours > 23 || minutes > 59) {
    throw new Error(`Invalid time value: ${timeStr}`)
  }
  return hours * 60 + minutes
}

/**
 * convertTimeToMinutes converts HH:MM format to minutes from midnight
 */
function convertTimeToMinutes(timeStr) {
  const match = timeStr.match(/^(\d{2}):(\d{2})$/)
  if (!match) {
    throw new Error(`Invalid time format: ${timeStr}`)
  }
  const hours = parseInt(match[1])
  const minutes = parseInt(match[2])
  return hours * 60 + minutes
}

/**
 * sanitizeDate sanitizes date string to standard format (YYYY-MM-DD)
 */
function sanitizeDate(dateStr) {
  if (!dateStr) {
    throw new Error('Date string is empty')
  }
  let sanitized = dateStr.toLowerCase().trim()
  sanitized = sanitized.replace(/\s+/g, '')
  sanitized = sanitized.replace(/[^\d-]/g, '')
  const dateMatch = sanitized.match(/^(\d{4})-(\d{2})-(\d{2})$/)
  if (!dateMatch) {
    throw new Error(`Invalid date format: ${dateStr}`)
  }
  const year = parseInt(dateMatch[1])
  const month = parseInt(dateMatch[2])
  const day = parseInt(dateMatch[3])
  if (year < 2000 || year > 2100 || month < 1 || month > 12 || day < 1 || day > 31) {
    throw new Error(`Invalid date value: ${dateStr}`)
  }
  return sanitized
}

/**
 * extractTextFromPdf extracts text content from a PDF file
 */
async function extractTextFromPdf(pdfPath) {
  const buffer = await readFile(pdfPath)
  const parser = new PDFParse({ data: buffer })
  const result = await parser.getText()
  return result.text
}

/**
 * convertTo24Hour converts 12-hour time format to 24-hour format
 */
function convertTo24Hour(time12h) {
  const match = time12h.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i)
  if (!match) {
    throw new Error(`Invalid 12-hour time format: ${time12h}`)
  }
  let hours = parseInt(match[1])
  const minutes = match[2]
  const period = match[3].toUpperCase()
  if (period === 'PM' && hours !== 12) {
    hours += 12
  } else if (period === 'AM' && hours === 12) {
    hours = 0
  }
  return `${String(hours).padStart(2, '0')}:${minutes}`
}

/**
 * parseDate parses date in format "1-Jan" or "Jan-1" and returns YYYY-MM-DD
 */
function parseDate(dateStr, year, monthName) {
  const monthMap = {
    jan: '01', feb: '02', mar: '03', apr: '04',
    may: '05', jun: '06', jul: '07', aug: '08',
    sep: '09', oct: '10', nov: '11', dec: '12'
  }
  const dayMonthMatch = dateStr.match(/^(\d{1,2})-([A-Za-z]{3})$/)
  if (dayMonthMatch) {
    const day = dayMonthMatch[1].padStart(2, '0')
    const monthAbbr = dayMonthMatch[2].toLowerCase()
    const month = monthMap[monthAbbr]
    if (!month) {
      throw new Error(`Unknown month abbreviation: ${monthAbbr}`)
    }
    const expectedMonthIndex = VALID_MONTHS.indexOf(monthName)
    if (month !== String(expectedMonthIndex + 1).padStart(2, '0')) {
      throw new Error(`Date ${dateStr} does not match expected month ${monthName}`)
    }
    return `${year}-${month}-${day}`
  }
  const monthDayMatch = dateStr.match(/^([A-Za-z]{3})-(\d{1,2})$/)
  if (monthDayMatch) {
    const monthAbbr = monthDayMatch[1].toLowerCase()
    const day = monthDayMatch[2].padStart(2, '0')
    const month = monthMap[monthAbbr]
    if (!month) {
      throw new Error(`Unknown month abbreviation: ${monthAbbr}`)
    }
    const expectedMonthIndex = VALID_MONTHS.indexOf(monthName)
    if (month !== String(expectedMonthIndex + 1).padStart(2, '0')) {
      throw new Error(`Date ${dateStr} does not match expected month ${monthName}`)
    }
    return `${year}-${month}-${day}`
  }
  throw new Error(`Invalid date format: ${dateStr}`)
}

/**
 * parsePrayerTimesFromText parses prayer times from extracted PDF text
 * Returns a 2D array where each row is [fajr, sunrise, dhuhr, asr, maghrib, isha] for that day
 */
function parsePrayerTimesFromText(text, pdfFileName, year, monthName) {
  const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0)
  const prayerTimes = []
  for (const line of lines) {
    const parts = line.split('\t').map(p => p.trim()).filter(p => p.length > 0)
    if (parts.length < 7) continue
    const dateMatch = parts[0].match(/^(\d{1,2}-[A-Za-z]{3}|[A-Za-z]{3}-\d{1,2})$/)
    if (!dateMatch) continue
    try {
      parseDate(parts[0], year, monthName)
      const fajr = sanitizeTime(convertTo24Hour(parts[1]))
      const sunrise = sanitizeTime(convertTo24Hour(parts[2]))
      const dhuhr = sanitizeTime(convertTo24Hour(parts[3]))
      const asr = sanitizeTime(convertTo24Hour(parts[4]))
      const maghrib = sanitizeTime(convertTo24Hour(parts[5]))
      const isha = sanitizeTime(convertTo24Hour(parts[6]))
      prayerTimes.push([fajr, sunrise, dhuhr, asr, maghrib, isha])
    } catch (error) {
      console.warn(`  Warning: Skipping invalid line in ${pdfFileName}: ${line.substring(0, 50)}... - ${error.message}`)
    }
  }
  if (prayerTimes.length === 0) {
    throw new Error(`No valid prayer times found in ${pdfFileName}`)
  }
  return prayerTimes
}

/**
 * validatePrayerTimes validates extracted prayer times in 2D array format
 */
function validatePrayerTimes(prayerTimes, pdfFileName) {
  if (prayerTimes.length === 0) {
    throw new Error(`No prayer times found in ${pdfFileName}`)
  }
  for (let dayIndex = 0; dayIndex < prayerTimes.length; dayIndex++) {
    const dayTimes = prayerTimes[dayIndex]
    if (!Array.isArray(dayTimes) || dayTimes.length !== 6) {
      throw new Error(`Day ${dayIndex + 1} in ${pdfFileName} does not have exactly 6 prayer times`)
    }
    for (let prayerIndex = 0; prayerIndex < 6; prayerIndex++) {
      const timeValue = dayTimes[prayerIndex]
      if (typeof timeValue !== 'number' || timeValue < 0 || timeValue >= 1440) {
        throw new Error(`Invalid prayer time at day ${dayIndex + 1}, prayer ${prayerIndex} in ${pdfFileName}: ${timeValue}`)
      }
    }
  }
}

/**
 * processPdfFile processes a single PDF file and extracts prayer times
 */
async function processPdfFile(pdfPath, pdfFileName) {
  try {
    const monthMatch = pdfFileName.match(/^\d{2}-(\w+)\.pdf$/)
    if (!monthMatch) {
      throw new Error(`Invalid PDF filename format: ${pdfFileName}`)
    }
    const monthName = monthMatch[1]
    if (!VALID_MONTHS.includes(monthName)) {
      throw new Error(`Invalid month name in filename: ${monthName}`)
    }
    const monthIndex = VALID_MONTHS.indexOf(monthName)
    const year = new Date().getFullYear()
    const text = await extractTextFromPdf(pdfPath)
    const prayerTimes = parsePrayerTimesFromText(text, pdfFileName, year, monthName)
    validatePrayerTimes(prayerTimes, pdfFileName)
    return prayerTimes
  } catch (error) {
    throw new Error(`Failed to process ${pdfFileName}: ${error.message}`)
  }
}

/**
 * processLocationDirectory processes all PDFs in a location directory
 */
async function processLocationDirectory(locationPath, locationName) {
  console.log(`\nProcessing location: ${locationName}`)

  const files = await readdir(locationPath)
  const pdfFiles = files.filter(f => f.endsWith('.pdf')).sort()

  if (pdfFiles.length !== 12) {
    throw new Error(`Expected 12 PDF files in ${locationName}, found ${pdfFiles.length}`)
  }

  let successCount = 0
  let failCount = 0

  for (const pdfFile of pdfFiles) {
    const pdfPath = join(locationPath, pdfFile)
    const jsonPath = pdfPath.replace('.pdf', '.json')

    try {
      const prayerTimes = await processPdfFile(pdfPath, pdfFile)
      await writeFile(jsonPath, JSON.stringify(prayerTimes, null, 2))
      console.log(`  ✓ Extracted: ${pdfFile} → ${prayerTimes.length} days`)
      successCount++
    } catch (error) {
      console.error(`  ✗ Failed: ${pdfFile} - ${error.message}`)
      failCount++
    }
  }

  console.log(`${locationName}: ${successCount} succeeded, ${failCount} failed`)

  return { successCount, failCount }
}

/**
 * extractAllPrayerTimes orchestrates the extraction of prayer times from all PDFs
 */
async function extractAllPrayerTimes() {
  const cacheDir = join(__dirname, '..', '.cache')

  try {
    console.log('=== Extracting Prayer Times from PDFs ===')
    console.log(`Cache directory: ${cacheDir}\n`)

    const locations = await readdir(cacheDir, { withFileTypes: true })
    const locationDirs = locations.filter(dirent => dirent.isDirectory())

    console.log(`Found ${locationDirs.length} locations`)

    let totalSuccess = 0
    let totalFail = 0

    for (const locationDir of locationDirs) {
      const locationPath = join(cacheDir, locationDir.name)
      const result = await processLocationDirectory(locationPath, locationDir.name)
      totalSuccess += result.successCount
      totalFail += result.failCount
    }

    console.log(`\n=== Extraction Complete ===`)
    console.log(`Total successful: ${totalSuccess}`)
    console.log(`Total failed: ${totalFail}`)

    if (totalFail > 0) {
      process.exit(1)
    }

  } catch (error) {
    console.error('Fatal error:', error)
    process.exit(1)
  }
}

extractAllPrayerTimes()
