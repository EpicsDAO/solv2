import { spawnSync } from 'child_process'
import { formatDisk } from '../setup/formatDisk'
import { MOUNT_ROOT } from '@/config'

export const mount = (fileSystem: string, mountPath = MOUNT_ROOT) => {
  try {
    formatDisk(fileSystem)
    const cmd = `sudo mount ${fileSystem} ${mountPath}`
    spawnSync(cmd, { shell: true, stdio: 'inherit' })
  } catch (error) {
    throw new Error(`mount Error: ${error}`)
  }
}
