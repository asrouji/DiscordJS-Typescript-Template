import { Client, User, CommandInteraction, SnowflakeUtil, ChatInputCommandInteraction } from 'discord.js'
import { Command } from '../types/command'

export default class MockDiscord {
  private client!: Client
  private user!: User
  public interaction!: ChatInputCommandInteraction

  constructor(options: { command?: Command } = {}) {
    this.mockClient()
    this.mockUser()
    this.mockInteracion(options?.command)
  }

  public getInteraction(): CommandInteraction {
    return this.interaction
  }

  private mockClient(): void {
    this.client = new Client({ intents: [] })
    this.client.login = jest.fn(() => Promise.resolve('LOGIN_TOKEN'))
  }

  private mockUser(): void {
    this.user = Reflect.construct(User, [
      this.client,
      {
        id: 'user-id',
        username: 'USERNAME',
        discriminator: 'user#0000',
        avatar: 'user avatar url',
        bot: false,
      },
    ])
  }

  private mockInteracion(command: Command | undefined): void {
    this.interaction = Reflect.construct(CommandInteraction, [
      this.client,
      {
        data: command,
        id: SnowflakeUtil.generate(),
        user: this.user,
      },
    ])
    this.interaction.reply = jest.fn()
    this.interaction.isCommand = jest.fn(() => true)
    this.interaction.isChatInputCommand = jest.fn(() => true)

    this.interaction.options = {
      client: this.client,
      data: [],
      resolved: null,
      get: jest.fn(),
      getMember: jest.fn(),
      getUser: jest.fn(),
      getString: jest.fn(),
      getBoolean: jest.fn(),
      getChannel: jest.fn(),
      getRole: jest.fn(),
      getMentionable: jest.fn(),
      getNumber: jest.fn(),
      getInteger: jest.fn(),
      getSubcommand: jest.fn(),
      getSubcommandGroup: jest.fn(),
      getAttachment: jest.fn(),
    }
  }
}

export async function executeCommandAndSpyReply(command: Command) {
  const discord = new MockDiscord({ command })
  const interaction = discord.getInteraction()
  const spy = jest.spyOn(interaction, 'reply')
  await command.execute(interaction)
  return { interaction, spy }
}
