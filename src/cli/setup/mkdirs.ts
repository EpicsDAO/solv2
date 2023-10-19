import { LEDGER_PATH, LOG_DIR, SOLANA_ACCOUNT_ROOT } from '@/config'
import { exec } from 'child_process'
import { existsSync, mkdirSync } from 'fs'

const user = process.env.SOLV_USER || 'solv'

export const setupDirs = () => {
  try {
    const dirs = [LOG_DIR, LEDGER_PATH, SOLANA_ACCOUNT_ROOT]

    for (const dir of dirs) {
      if (existsSync(dir)) return
      mkdirSync(dir, { recursive: true })
      exec(`sudo chown -R ${user}:${user} ${dir}`, (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`)
          return
        }
        console.log(`stdout: ${stdout}`)
        console.error(`stderr: ${stderr}`)
      })
    }
  } catch (error) {
    throw new Error(`setupDirs Error: ${error}`)
  }
}
