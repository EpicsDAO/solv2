import { program } from '@/index'
import { setup } from './setup'
import { startValidator } from './startValidator'
import chalk from 'chalk'
import { DEFAULT_FILE_SYSTEM, VALIDATOR_STARTUP_SCRIPT } from '@/config'

export const setupCommands = async () => {
  program
    .command('setup')
    .description('Setup Solana Validator All-in-One')
    .option('--sh', 'Update Validator StartUp Bash Script', false)
    .option('--swap', 'Setup Swap', false)
    .option(
      '-p, --path <path>',
      'Path to Solana Directory',
      DEFAULT_FILE_SYSTEM
    )
    .action((options) => {
      if (options.sh) {
        console.log(chalk.white(`Generating ${VALIDATOR_STARTUP_SCRIPT} ...`))
        startValidator()
      } else {
        console.log(chalk.white('Setting up Solana Validator ...'))
        setup(options)
      }
    })
}
