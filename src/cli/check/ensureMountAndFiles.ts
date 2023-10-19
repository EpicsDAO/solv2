import {
  DEFAULT_FILE_SYSTEM,
  SECOND_FILE_SYSTEM,
  SOLANA_ACCOUNT_ROOT,
  SWAP_PATH,
} from '@/config'
import { spawnSync } from 'child_process'

const ramLine = `tmpfs ${SOLANA_ACCOUNT_ROOT} tmpfs rw,size=300G,user=solv 0 0`

export const ensureFstabEntries = (
  fileSystem = DEFAULT_FILE_SYSTEM,
  fileSystem2 = SECOND_FILE_SYSTEM
) => {
  const mtLine = `${fileSystem}        /mt     ext4 auto 0 0`
  const mtLine2 = `${fileSystem2}        /mnt     ext4 auto 0 0`
  const swapLine = `${SWAP_PATH} none swap sw 0 0`
  const lines = [mtLine, mtLine2, ramLine, swapLine]
  const output = spawnSync(`cat /etc/fstab`, {
    shell: true,
    encoding: 'utf8',
  })

  const fstabContent = output.stdout

  let linesToAdd = []

  for (let line of lines) {
    if (!fstabContent.includes(line)) {
      linesToAdd.push(line)
    }
  }

  if (linesToAdd.length) {
    const addCmd = `echo "${linesToAdd.join('\n')}" | sudo tee -a /etc/fstab`
    spawnSync(addCmd, {
      shell: true,
      encoding: 'utf8',
    })
    const reloadCmd = `sudo mount --all --verbose`
    spawnSync(reloadCmd, {
      shell: true,
      encoding: 'utf8',
    })
    console.log(`Added lines to /etc/fstab: \n${linesToAdd.join('\n')}`)
  } else {
    console.log('All lines are already present in /etc/fstab')
  }
}
