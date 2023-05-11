import { Command, REST, Routes } from 'discord.js'
import fs from 'node:fs'
import path from 'node:path'
import dotenv from 'dotenv'
import { fileURLToPath, pathToFileURL } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config()

if (!process.env.BOT_TOKEN) {
  console.log('[ERROR] No BOT_TOKEN provided in the .env file.')
  process.exit(1)
}

const commands: Command[] = []
const commandsPath = path.join(__dirname, '..', 'commands')
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts'))

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file)
  const command: Command = (await import(pathToFileURL(filePath).href)).default
  commands.push(command)
}

const rest = new REST().setToken(process.env.BOT_TOKEN)

;(async () => {
  if (!process.env.CLIENT_ID) {
    console.log('[ERROR] No CLIENT_ID provided in the .env file.')
    process.exit(1)
  }
  try {
    console.log(`Started refreshing application (/) commands.`)
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands })
    console.log(`Successfully reloaded application (/) commands.`)
  } catch (error) {
    console.error(error)
  }
})()
