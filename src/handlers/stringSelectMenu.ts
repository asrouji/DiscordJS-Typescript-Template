import InteractionHandler from '../types/interactionHandler'
import { StringSelectMenuInteraction } from 'discord.js'
import dotenv from 'dotenv'

dotenv.config()

const handler: InteractionHandler<StringSelectMenuInteraction> = {
  handle: async interaction => {
    // use interaction.customId to determine which string select menu was used
    if (interaction.customId === 'sample_select_menu') {
      const selectedCustomId = interaction.values[0]
      await interaction.update({ content: `Selection ID: ${selectedCustomId}`, components: [] })
    } else {
      console.error(`Unknown StringSelectMenuInteraction ${interaction.customId}`)
      interaction.deferUpdate().catch(console.error)
    }
  },
}

export default handler
