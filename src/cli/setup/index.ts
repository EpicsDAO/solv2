import { program } from '@/index'
import { setup } from './setup'
import { startValidator } from './startValidator'
import chalk from 'chalk'
import { VALIDATOR_STARTUP_SCRIPT } from '@/config'

export const setupCommands = async () => {
  program
    .command('setup')
    .description('Setup Solana Validator All-in-One')
    .option('--sh', 'Update Validator StartUp Bash Script', false)
    .action((options) => {
      if (options.sh) {
        console.log(chalk.white(`Generating ${VALIDATOR_STARTUP_SCRIPT} ...`))
        startValidator()
      } else {
        console.log(chalk.white('Setting up Solana Validator ...'))
        setup()
      }
    })
}
