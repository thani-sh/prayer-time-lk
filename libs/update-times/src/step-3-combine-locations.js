import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

/**
 * Valid month names in order
 */
const VALID_MONTHS = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']

/**
 * sanitizeLocationName sanitizes a single location name
 */
function sanitizeLocationName(name) {
  return name.toLowerCase().trim()
}

/**
 * splitLocationNames splits a directory name into individual location names
 */
function splitLocationNames(directoryName) {
  return directoryName.split(/\s+/).map(sanitizeLocationName)
}

/**
 * combineMonthlyData combines all monthly JSON files into a 3D array
 */
async function combineMonthlyData(locationPath, locationDirName) {
  console.log(`\nProcessing location directory: ${locationDirName}`)
  const files = await readdir(locationPath)
  const jsonFiles = files.filter(f => f.endsWith('.json') && f.match(/^\d{2}-\w+\.json$/)).sort()
  if (jsonFiles.length !== 12) {
    throw new Error(`Expected 12 JSON files in ${locationDirName}, found ${jsonFiles.length}`)
  }
  const combinedData = []
  for (const jsonFile of jsonFiles) {
    const filePath = join(locationPath, jsonFile)
    const content = await readFile(filePath, 'utf-8')
    const monthData = JSON.parse(content)
    if (!Array.isArray(monthData)) {
      throw new Error(`Expected array in ${jsonFile}, got ${typeof monthData}`)
    }
    combinedData.push(monthData)
    console.log(`  ✓ Loaded ${jsonFile}: ${monthData.length} days`)
  }
  if (combinedData.length !== 12) {
    throw new Error(`Expected 12 months of data, got ${combinedData.length}`)
  }
  return combinedData
}

/**
 * writeLocationFiles writes the combined data to individual location files
 */
async function writeLocationFiles(combinedData, locationNames, outputDir) {
  const results = []
  for (const locationName of locationNames) {
    const fileName = `acju.${locationName}.json`
    const filePath = join(outputDir, fileName)
    await writeFile(filePath, JSON.stringify(combinedData))
    console.log(`  ✓ Created: ${fileName}`)
    results.push(fileName)
  }
  return results
}

/**
 * processLocationDirectory processes a single location directory
 */
async function processLocationDirectory(locationPath, locationDirName, outputDir) {
  try {
    const combinedData = await combineMonthlyData(locationPath, locationDirName)
    const locationNames = splitLocationNames(locationDirName)
    console.log(`  Locations: ${locationNames.join(', ')}`)
    const createdFiles = await writeLocationFiles(combinedData, locationNames, outputDir)
    return { success: true, count: createdFiles.length, files: createdFiles }
  } catch (error) {
    console.error(`  ✗ Failed: ${error.message}`)
    return { success: false, error: error.message }
  }
}

/**
 * combineAllLocations orchestrates the combination of all location data
 */
async function combineAllLocations() {
  const cacheDir = join(__dirname, '..', '.cache')
  const outputDir = join(__dirname, '..', '..', '..', 'data')
  try {
    console.log('=== Combining Location Data ===')
    console.log(`Cache directory: ${cacheDir}`)
    console.log(`Output directory: ${outputDir}\n`)
    await mkdir(outputDir, { recursive: true })
    const locations = await readdir(cacheDir, { withFileTypes: true })
    const locationDirs = locations.filter(dirent => dirent.isDirectory())
    console.log(`Found ${locationDirs.length} location directories\n`)
    let totalFilesCreated = 0
    let totalSuccess = 0
    let totalFailed = 0
    for (const locationDir of locationDirs) {
      const locationPath = join(cacheDir, locationDir.name)
      const result = await processLocationDirectory(locationPath, locationDir.name, outputDir)
      if (result.success) {
        totalFilesCreated += result.count
        totalSuccess++
      } else {
        totalFailed++
      }
    }
    console.log(`\n=== Combination Complete ===`)
    console.log(`Location directories processed: ${totalSuccess} succeeded, ${totalFailed} failed`)
    console.log(`Total location files created: ${totalFilesCreated}`)
    console.log(`Output directory: ${outputDir}`)
    if (totalFailed > 0) {
      process.exit(1)
    }
  } catch (error) {
    console.error('Fatal error:', error)
    process.exit(1)
  }
}

combineAllLocations()
