import { SlashCommandBuilder } from 'discord.js'
import Command from '../types/slashCommand'

const command: Command = {
  data: new SlashCommandBuilder().setName('ping').setDescription('Replies with Pong!'),
  execute: async interaction => await interaction.reply(`Pong!`),
}

export default command
