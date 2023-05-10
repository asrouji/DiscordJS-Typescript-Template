import { Command, REST, Routes } from 'discord.js'
import fs from 'node:fs'
import path from 'node:path'
import dotenv from 'dotenv'

dotenv.config()

if (!process.env.BOT_TOKEN) {
  console.log('[ERROR] No BOT_TOKEN provided in the .env file.')
  process.exit(1)
}

const commands: Command[] = []
const foldersPath = path.join(__dirname, '..', 'commands')
const commandFolders = fs.readdirSync(foldersPath)

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder)
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts'))
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file)
    const command: Command = await import(filePath)
    commands.push(command)
  }
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
