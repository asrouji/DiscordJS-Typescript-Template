import Discord from 'discord.js'

type CommandInteractionProps = {
  -readonly [prop in keyof Discord.CommandInteraction as Exclude<prop, 'valueOf'>]?: Discord.CommandInteraction[prop]
}

export default class CommandInteraction {
  isCommand = jest.fn().mockReturnValue(true)
  reply = jest.fn()

  private constructor(props?: CommandInteractionProps) {
    if (props) {
      Object.assign(this, props)
    }
  }

  static create(props?: CommandInteractionProps) {
    return new CommandInteraction(props) as unknown as Discord.CommandInteraction
  }
}
