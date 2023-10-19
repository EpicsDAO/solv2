import { Logger } from '@/lib/logger'
import chalk from 'chalk'
import { execSync, spawnSync } from 'child_process'
import { checkMemoryAndSwap } from '../check/checkMemoryAndSwap'
import { ensureFstabEntries } from '../check/ensureMountAndFiles'
import { formatDisk } from './formatDisk'
import { mkdirSync } from 'fs'
import {
  DEFAULT_FILE_SYSTEM,
  MOUNT_ROOT,
  SECOND_FILE_SYSTEM,
  SOLANA_ACCOUNT_ROOT,
  SWAP_PATH,
} from '@/config'

export const setupSwap = (
  fileSystem = DEFAULT_FILE_SYSTEM,
  fileSystem2 = SECOND_FILE_SYSTEM
) => {
  try {
    formatDisk(fileSystem)
    formatDisk(fileSystem2)
    if (!execSync(SOLANA_ACCOUNT_ROOT)) {
      mkdirSync(SOLANA_ACCOUNT_ROOT, { recursive: true })
    }
    if (!execSync(MOUNT_ROOT)) {
      mkdirSync(MOUNT_ROOT, { recursive: true })
    }

    const cmds = [
      `sudo mount ${fileSystem} ${MOUNT_ROOT}`,
      `sudo mount -t tmpfs -o rw,size=300G,user=solv 0 0 tmpfs ${SOLANA_ACCOUNT_ROOT}`,
      `sudo swapoff ${SWAP_PATH}`,
      `sudo dd if=/dev/zero of=${SWAP_PATH} bs=1MiB count=250KiB`,
      `sudo mkswap ${SWAP_PATH}`,
      `sudo chmod 600 ${SWAP_PATH}`,
      `sudo swapon ${SWAP_PATH}`,
      `sudo swapon --all --verbose`,
    ]
    if (!checkMemoryAndSwap()) {
      ensureFstabEntries(fileSystem, fileSystem2)
    }
    console.log(chalk.white('Setting up swap...\n'))
    const spinner = Logger.syncSpinner('This may take a while...')
    for (const line of cmds) {
      spawnSync(line, { shell: true, stdio: 'inherit' })
    }
    spinner.stop()
    console.log(chalk.green('Swap setup complete!\n'))
  } catch (error) {
    throw new Error(`setupSwap Error: ${error}`)
  }
}
