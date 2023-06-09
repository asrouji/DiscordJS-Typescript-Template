import { CommandInteraction, SlashCommandBuilder } from 'discord.js'

/**
 * Interface for defining slash commands. Import the `SlashCommandBuilder` from discord.js to create the command data.
 * @template T The name of the command
 */
export default interface Command {
  /** The command data for Discord to display (use a SlashCommandBuilder!) */
  data: SlashCommandBuilder
  /** The function to execute when the command is called */
  execute: (interaction: CommandInteraction) => Promise<unknown>
}
