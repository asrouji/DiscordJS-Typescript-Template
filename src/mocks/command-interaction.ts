import Discord from 'discord.js'

type CommandInteractionProps = {
  -readonly [prop in keyof Discord.CommandInteraction as Exclude<prop, 'valueOf'>]?: Discord.CommandInteraction[prop]
}

export class CommandInteraction {
  protected constructor(props?: CommandInteractionProps) {
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

  static create<Cached extends Discord.CacheType = Discord.CacheType>(props?: CommandInteractionProps) {
    return new CommandInteraction(props) as unknown as Discord.CommandInteraction<Cached>
  }
}
