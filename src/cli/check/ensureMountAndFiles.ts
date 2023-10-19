import { DEFAULT_FILE_SYSTEM, SOLANA_ACCOUNT_ROOT } from '@/config'
import { spawnSync } from 'child_process'

const ramLine = `tmpfs ${SOLANA_ACCOUNT_ROOT} tmpfs rw,size=300G,user=solv 0 0`

export const ensureFstabEntries = (fileSystem = DEFAULT_FILE_SYSTEM) => {
  const mtLine = `${fileSystem}        /mt     ext4 auto 0 0`
  const lines = [ramLine, mtLine]
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
