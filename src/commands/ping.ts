import { SlashCommandBuilder } from 'discord.js'
import SlashCommand from '../types/slashCommand'

const command: SlashCommand = {
  data: new SlashCommandBuilder().setName('ping').setDescription('Replies with Pong!'),
  execute: async interaction => await interaction.reply(`Pong!`),
}

export default command
