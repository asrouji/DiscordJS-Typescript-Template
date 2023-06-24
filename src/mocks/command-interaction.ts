import Discord from 'discord.js'
import Props from '../types/mock-props'

export class CommandInteraction {
  protected constructor(props?: Props<Discord.CommandInteraction>) {
    Object.getOwnPropertyNames(Discord.CommandInteraction.prototype)
      .filter(name => name !== 'constructor')
      .forEach(name => {
        Object.defineProperty(this, name, {
          value: jest.fn(),
          writable: false,
          enumerable: false,
          configurable: false,
        })
      })
    if (props) {
      Object.assign(this, props)
    }
  }

  static create<Cached extends Discord.CacheType = Discord.CacheType>(props?: Props<Discord.CommandInteraction>) {
    return new CommandInteraction(props) as unknown as Discord.CommandInteraction<Cached>
  }
}
