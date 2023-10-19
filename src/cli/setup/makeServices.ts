import { setupSystemd } from '@/template/setupSystemd'
import { setupLogrotate } from './setupLogrotate'
import { setupSolvService } from './setupSolvService'

export const makeServices = () => {
  setupLogrotate()
  setupSolvService()
  setupSystemd()
}
