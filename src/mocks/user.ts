import Discord from 'discord.js'
import Props from '../types/mock-props'

export class User {
  protected constructor(props?: Props<Discord.User>) {
    Object.getOwnPropertyNames(Discord.User.prototype)
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

  static create(props?: Props<Discord.User>) {
    return new User(props) as unknown as Discord.User
  }
}
