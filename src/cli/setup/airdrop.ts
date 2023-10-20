import chalk from 'chalk'
import { spawnSync } from 'child_process'

export const airdrop = () => {
  try {
    const solanaPubkey = spawnSync(`solana address`, {
      shell: true,
      encoding: 'utf8',
    })
    const cmd = `solana airdrop 1`
    const result = String(spawnSync(cmd, { shell: true, stdio: 'inherit' }))
    if (result.includes('Error')) {
      console.log(
        chalk.yellow(
          `Airdrop failed. Please get 1 SOL in your pubkey: ${solanaPubkey} and Try Again with this command;\n`
        )
      )
      console.log(chalk.green(`$ solv setup --vote\n`))
    }
    return true
  } catch (error) {
    throw new Error(`airdrop Error: ${error}`)
  }
}
