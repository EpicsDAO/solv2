import { discordChangeLog } from '@skeet-framework/discord-utils'
import { dotenv } from '@skeet-framework/utils'
dotenv.config()

const REPO_NAME = 'epicsDAO/solv2'

const run = async (project: 'labo' | 'epics') => {
  if (project === 'labo') {
    return
  } else if (project === 'epics') {
    console.log('epics')
    const token = process.env.DISCORD_TOKEN || ''
    const channelId = process.env.DISCORD_CHANNEL_ID || ''
    const channelIdJA = process.env.DISCORD_CHANNEL_ID_JA || ''
    await discordChangeLog(token, REPO_NAME, [channelId])
    await discordChangeLog(token, REPO_NAME, [channelIdJA], 'ja')
  } else {
    console.log('invalid project name')
  }
}

const project = process.argv[2] as 'labo' | 'epics'
run(project)
