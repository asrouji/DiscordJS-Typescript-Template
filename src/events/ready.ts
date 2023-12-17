import { Events } from 'discord.js'
import { createEventListener } from '../types/event'

const event = createEventListener({
  name: Events.ClientReady,
  once: true,
  execute: async client => {
    console.log(`Logged in as ${client.user?.tag}`)
  },
})

export default event
