/**
 * @file Start the bot.
 * Run with `yarn dev` for development or `yarn start` for production.
 */

import { BotClient } from '../util/bot-client'
import { Events, GatewayIntentBits } from 'discord.js'
import { Command } from '../types/command'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import { fileURLToPath, pathToFileURL } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config()

const client = new BotClient({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
})

const commandsPath = path.join(__dirname, '..', 'commands')
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts'))

for (const file of commandFiles) {
  const commandPath = path.join(commandsPath, file)
  const command: Command = (await import(pathToFileURL(commandPath).href)).default
  client.commands.set(command.data.name, command)
}

client.once(Events.ClientReady, c => {
  console.log(`Logged in as ${c.user?.tag}`)
})

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isCommand()) return

  const command = client.commands.get(interaction.commandName)

  if (!command) return

  try {
    await command.execute(interaction)
  } catch (error) {
    console.error(error)
    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true })
  }
})

client.login(process.env.BOT_TOKEN)
