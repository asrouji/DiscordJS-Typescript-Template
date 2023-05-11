import { Collection, SlashCommandBuilder } from 'discord.js'

declare module 'discord.js' {
  export interface Client {
    commands: Collection<unknown, Command>
  }

  export interface Command {
    data: Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>
    execute: (interaction: CommandInteraction) => Promise<unknown>
  }
}
