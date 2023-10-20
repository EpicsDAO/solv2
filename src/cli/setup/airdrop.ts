import chalk from 'chalk'
import { spawnSync } from 'child_process'

export const airdrop = () => {
  try {
    const cmd = `solana airdrop 1`
    const result = String(spawnSync(cmd, { shell: true, stdio: 'inherit' }))
    if (result.includes('Error')) {
      console.log(
        chalk.yellow(
          `Airdrop failed. Please get 1 SOL and Try Again with this command;\n`
        )
      )
      console.log(chalk.green(`$ solv setup --vote\n`))
    }
    return true
  } catch (error) {
    throw new Error(`airdrop Error: ${error}`)
  }
}
