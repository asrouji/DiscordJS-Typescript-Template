import { Client, Events, GatewayIntentBits } from 'discord.js'
import dotenv from 'dotenv'

dotenv.config()

export const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
})

client.on(Events.ClientReady, c => {
  console.log(`Logged in as ${c.user?.tag}`)
})

client.on(Events.MessageCreate, async message => {
  console.log(message.content)
})

client.login(process.env.BOT_TOKEN)
