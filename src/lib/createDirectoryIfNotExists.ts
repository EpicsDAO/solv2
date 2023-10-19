import { execSync } from 'child_process'

export function createDirectoryIfNotExists(path: string): void {
  try {
    // Check if the directory exists
    execSync(`test -d ${path}`)
  } catch {
    // If the directory does not exist, create it with sudo privileges
    execSync(`sudo mkdir -p ${path}`)
  }
}
