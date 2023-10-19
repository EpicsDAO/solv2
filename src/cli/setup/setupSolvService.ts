import { SOL_SERVICE_PATH } from '@/config'
import { solvService } from '@/template/solvService'
import { writeFileSync, existsSync } from 'fs'

export function setupSolvService(): void {
  console.log('Creating solvService configuration for solana')

  if (existsSync(SOL_SERVICE_PATH)) {
    console.log(
      'SOL_SERVICE_PATH already exists. Skipping solvService configuration.'
    )
  } else {
    const body = solvService()
    writeFileSync(SOL_SERVICE_PATH, body)
    console.log('solv.service configuration created.')
  }
}
