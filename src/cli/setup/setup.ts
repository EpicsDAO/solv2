import { execSync, spawnSync } from 'child_process'
import { setupDirs } from './mkdirs'
import { setupKeys } from './setupKeys'
import { setupSwap } from './setupSwap'
import { startValidator } from './startValidator'
import { Logger } from '@/lib/logger'
import chalk from 'chalk'
import { DEFAULT_FILE_SYSTEM, MOUNT_ROOT } from '@/config'
import { makeServices } from './makeServices'

export const setup = (
  options = { swap: false, fileSystem: DEFAULT_FILE_SYSTEM }
) => {
  try {
    if (!isSolanaInstalled()) {
      Logger.normal(
        `Did you forget to restart your terminal?\n\n${chalk.green(
          `$ source ~/.profile`
        )}`
      )
      return
    }
    const chown = `sudo chown -R solv:solv ${MOUNT_ROOT} && sudo chmod -R 755 ${MOUNT_ROOT}`
    spawnSync(chown, { shell: true, stdio: 'inherit' })
    makeServices()
    startValidator()
    setupDirs()
    setupKeys()
    spawnSync(chown, { shell: true, stdio: 'inherit' })
    if (options.swap) setupSwap(options.fileSystem)
    const cmds = [
      'sudo systemctl daemon-reload',
      'sudo systemctl enable solv',
      'sudo systemctl restart logrotate',
    ]
    for (const line of cmds) {
      spawnSync(line, { shell: true, stdio: 'inherit' })
    }
    return true
  } catch (error) {
    throw new Error(`setup Error: ${error}`)
  }
}

function isSolanaInstalled() {
  try {
    execSync('solana --version')
    return true
  } catch (error) {
    return false
  }
}
