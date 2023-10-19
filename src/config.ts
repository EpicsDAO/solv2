import { dotenv } from '@skeet-framework/utils'
import { readFileSync } from 'fs'
dotenv.config()

export const config = JSON.parse(
  readFileSync(`${__dirname}/config.json`, 'utf8')
)
export const DEFAULT_LANG = 'en'
export const DEFAULT_SOLANA_VERSION = '1.17.2'
export const DEFAULT_NODE_VERSION = '18.18.1'
export const DEFAULT_DELINQUENT_STAKE = 5
export const DEFAULT_SOLANA_NETWORK = 'testnet'
export const USERNAME = 'solv'

export const SOLANA_ACCOUNT_ROOT = '/mnt/solana-accounts'
export const SWAP_PATH = `/swap.img`

export const MOUNT_ROOT = '/mt'
export const LEDGER_PATH = `${MOUNT_ROOT}/ledger/validator-ledger`
export const SOLV_ROOT = `${MOUNT_ROOT}/solana`
export const LOG_DIR = `${SOLV_ROOT}/log`
export const LOG_PATH = `${SOLV_ROOT}/log/solana-validator.log`
export const VALIDATOR_STARTUP_SCRIPT = `${SOLV_ROOT}/start-validator.sh`

export const DEFAULT_FILE_SYSTEM = '/dev/nvme1n1'
export const SECOND_FILE_SYSTEM = '/dev/nvme0n1'

export const MAINNET_VALIDATOR_KEYFILE = `${SOLV_ROOT}/mainnet-validator-keypair.json`
export const TESTNET_VALIDATOR_KEYFILE = `${SOLV_ROOT}/testnet-validator-keypair.json`
export const VALIDATOR_VOTE_KEYFILE = `${SOLV_ROOT}/vote-account-keypair.json`
export const VALITATOR_AUTHORITY_KEYFILE = `${SOLV_ROOT}/authority-keypair.json`

export const SOL_SERVICE_PATH = '/etc/systemd/system/solv.service'
export const SOL_LOGROTATE_PATH = '/etc/logrotate.d/solana'
export const SOL_SYSTEM_CONFIG21_PATH = '/etc/sysctl.d/21-solana-validator.conf'
export const SOL_NOFILES_CONF_PATH =
  '/etc/security/limits.d/90-solana-nofiles.conf'
export const SOL_SYSTEM_CONF = '/etc/systemd/system.conf'

export const DEFAULT_VALIDATOR_VOTE_ACCOUNT_PUBKEY =
  '76DafWkJ6pGK2hoD41HjrM4xTBhfKqrDYDazv13n5ir1'
export const DEFAULT_AUTHORITY_ACCOUNT_KEYFILE = './authority-keypair.json'
