import { spawnSync } from 'child_process'

export const updateSolv = () => {
  const cmd = [`npm i -g @epics-dao/solv2`]
  spawnSync(cmd.join(' && '), { shell: true, stdio: 'inherit' })
}
