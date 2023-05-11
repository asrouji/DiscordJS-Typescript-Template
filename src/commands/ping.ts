import { Command, SlashCommandBuilder } from 'discord.js'

const command: Command = {
  data: new SlashCommandBuilder().setName('ping').setDescription('Replies with Pong!'),
  execute: async interaction => await interaction.reply(`Pong!`),
}

export default command
