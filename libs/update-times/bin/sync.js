import { spawn } from "node:child_process"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const srcDir = path.resolve(__dirname, "../src")

/**
 * runScript executes a script and returns a promise
 */
function runScript(scriptPath, stepName) {
  return new Promise((resolve, reject) => {
    console.log(`\n${"=".repeat(60)}`)
    console.log(`Running: ${stepName}`)
    console.log(`${"=".repeat(60)}\n`)
    const child = spawn("node", [scriptPath], {
      stdio: "inherit",
      cwd: path.dirname(scriptPath),
    })
    child.on("exit", (code) => {
      if (code === 0) {
        console.log(`\n✅ ${stepName} completed successfully\n`)
        resolve()
      } else {
        reject(new Error(`${stepName} failed with exit code ${code}`))
      }
    })
    child.on("error", (err) => {
      reject(new Error(`Failed to start ${stepName}: ${err.message}`))
    })
  })
}

/**
 * Main sync function that runs all 3 steps
 */
async function main() {
  console.log("🔄 Starting prayer times data sync process...\n")
  try {
    await runScript(
      path.join(srcDir, "step-1-download-sources.js"),
      "Step 1: Download PDFs"
    )
    await runScript(
      path.join(srcDir, "step-2-extract-prayer-times.js"),
      "Step 2: Extract Prayer Times"
    )
    await runScript(
      path.join(srcDir, "step-3-combine-locations.js"),
      "Step 3: Combine Locations"
    )
    console.log("\n" + "=".repeat(60))
    console.log("✅ All steps completed successfully!")
    console.log("=".repeat(60))
  } catch (error) {
    console.error("\n" + "=".repeat(60))
    console.error(`❌ Sync failed: ${error.message}`)
    console.error("=".repeat(60))
    process.exit(1)
  }
}

main()
