import { Events } from 'discord.js'
import Event from '../types/event'

const event: Event<Events.ClientReady> = {
  name: Events.ClientReady,
  once: true,
  execute: async client => {
    console.log(`Logged in as ${client.user?.tag}`)
  },
}

export default event
