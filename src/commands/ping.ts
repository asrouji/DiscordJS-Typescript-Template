import { Command } from 'discord.js'

const command: Command = {
  name: 'ping',
  description: 'Replies with Pong!',
  async execute(interaction) {
    await interaction.reply('Pong!')
  },
}

export default command
