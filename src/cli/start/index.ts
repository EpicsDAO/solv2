import { program } from '@/index'
import { startSolana } from './startSolana'
import { chmodSync, existsSync, writeFileSync } from 'fs'
import { SNAPSHOT_PATH, VALIDATOR_STARTUP_SCRIPT } from '@/config'
import { startValidatorSh } from '@/template/startValitatorSh'

export const startCommand = () => {
  program
    .command('start')
    .description('Start Solana Validator')
    .action(async () => {
      if (existsSync(SNAPSHOT_PATH)) {
        const startValidator = startValidatorSh(false)
        writeFileSync(VALIDATOR_STARTUP_SCRIPT, startValidator)
        chmodSync(VALIDATOR_STARTUP_SCRIPT, '755')
      } else {
        const startValidator = startValidatorSh(true)
        writeFileSync(VALIDATOR_STARTUP_SCRIPT, startValidator)
        chmodSync(VALIDATOR_STARTUP_SCRIPT, '755')
      }
      startSolana()
    })
}
