import {
  ActionRowBuilder,
  StringSelectMenuBuilder,
  SlashCommandBuilder,
  StringSelectMenuOptionBuilder,
} from 'discord.js'
import Command from '../types/slashCommand'

const command: Command = {
  data: new SlashCommandBuilder().setName('select').setDescription('Sample select menu command'),
  execute: async interaction => {
    const selectMenu = new StringSelectMenuBuilder()
      .setCustomId('sample_select_menu')
      .setPlaceholder('Select an option...')
      .setOptions([
        new StringSelectMenuOptionBuilder()
          .setLabel('Option 1')
          .setValue('option_1')
          .setDescription('This is the first option'),
        new StringSelectMenuOptionBuilder()
          .setLabel('Option 2')
          .setValue('option_2')
          .setDescription('This is the second option'),
      ])

    const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(selectMenu)
    await interaction.reply({ content: 'Choose an option!', components: [row], ephemeral: true })
  },
}

export default command
