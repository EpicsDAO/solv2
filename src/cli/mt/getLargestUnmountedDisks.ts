import { execSync } from 'child_process'

type DiskInfo = {
  name: string
  size: number
}

export function getLargestUnmountedDisks(): DiskInfo[] {
  const commandOutput = execSync('lsblk -l -b -o NAME,SIZE,MOUNTPOINT', {
    encoding: 'utf8',
  })
  const lines = commandOutput.split('\n').slice(1) // skip the header line
  const unmountedDisks: DiskInfo[] = []

  for (const line of lines) {
    const [name, sizeStr, mountPoint] = line.trim().split(/\s+/)
    const size = parseInt(sizeStr, 10)

    // Check if the disk is unmounted and has a size of 1TB or more
    if (!mountPoint && size >= 1e12) {
      unmountedDisks.push({ name, size })
    }
  }

  // Sort the unmounted disks in descending order of size
  unmountedDisks.sort((a, b) => b.size - a.size)

  // Return only the two largest disks
  return unmountedDisks.slice(0, 2)
}
