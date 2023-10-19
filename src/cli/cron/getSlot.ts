import { execSync } from 'child_process'

export const getSlot = () => {
  try {
    const cmd = `solana --url http://127.0.0.1:8899 slot`
    const slot = execSync(cmd, { encoding: 'utf-8' }).toString()
    return slot.replace(/\n/g, '')
  } catch (error) {
    return `getSlot Error: ${error}`
  }
}
