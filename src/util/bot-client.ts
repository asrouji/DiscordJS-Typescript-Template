import { Client, ClientOptions, Collection } from 'discord.js'
import { Command } from '../types/command'

export class BotClient extends Client {
  commands: Collection<unknown, Command>

  constructor(options: ClientOptions) {
    super(options)
    this.commands = new Collection()
  }
}
