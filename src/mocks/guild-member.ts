import Discord from 'discord.js'
import Props from '../types/mock-props'

export class GuildMember {
  protected constructor(props?: Props<Discord.GuildMember>) {
    Object.getOwnPropertyNames(Discord.GuildMember.prototype)
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

  static create(props?: Props<Discord.GuildMember>) {
    return new GuildMember(props) as unknown as Discord.GuildMember
  }
}
