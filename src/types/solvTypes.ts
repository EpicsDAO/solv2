export type UbuntuDhParams = {
  Filesystem: string
  Size: string
  Used: string
  Avail: string
  Use: string
  MountedOn: string
}

export type SolvConfig = {
  lang: 'en' | 'ja'
  network: 'testnet' | 'mainnet-beta'
  version: string
}
