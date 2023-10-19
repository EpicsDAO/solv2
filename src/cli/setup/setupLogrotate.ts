import { SOL_LOGROTATE_PATH } from '@/config'
import { logRotates } from '@/template/logRotates'
import { writeFileSync, existsSync } from 'fs'

export function setupLogrotate(): void {
  console.log('Creating logrotate configuration for solana')

  if (existsSync(SOL_LOGROTATE_PATH)) {
    console.log(
      'SOL_LOGROTATE_PATH already exists. Skipping logrotate configuration.'
    )
  } else {
    const body = logRotates()
    writeFileSync(SOL_LOGROTATE_PATH, body)
    console.log('Logrotate configuration created.')
  }
}
