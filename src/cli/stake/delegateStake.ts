import { DEFAULT_AUTHORITY_ACCOUNT_KEYFILE } from '@/config'
import { spawnSync } from 'child_process'

export const delegateStake = async (
  stakeAccountPubkey: string,
  validatorVoteAccountPubkey: string,
  authorityAccountKeyfile = DEFAULT_AUTHORITY_ACCOUNT_KEYFILE
) => {
  try {
    const cmd = [
      `solana delegate-stake ${stakeAccountPubkey} ${validatorVoteAccountPubkey} --stake-authority ${authorityAccountKeyfile}`,
    ]
    spawnSync(cmd.join(' && '), { shell: true, stdio: 'inherit' })
    return true
  } catch (error) {
    throw new Error(`delegateStake Error: ${error}`)
  }
}
