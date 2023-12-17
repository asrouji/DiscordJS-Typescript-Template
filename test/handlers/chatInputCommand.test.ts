import { ChatInputCommandInteraction, Client, Collection } from 'discord.js'
import chatInputCommandHandler from '../../src/handlers/chatInputCommand'
import { mock } from 'jest-mock-extended'
import BotClient from '../../src/util/botClient'
import Command from '../../src/types/slashCommand'

beforeAll(() => {
  console.error = jest.fn()
})

afterAll(() => {
  jest.restoreAllMocks()
})

describe('handles known commands', () => {
  test('invokes the command', async () => {
    const client = mock<BotClient>()
    const interaction = mock<ChatInputCommandInteraction>({
      reply: jest.fn(),
      valueOf: jest.fn(),
      client: client as unknown as Client<true>,
      commandName: 'sample_command',
    })

    const command = mock<Command>({
      execute: jest.fn(),
    })

    client.commands = new Collection<string, Command>([['sample_command', command]])

    await chatInputCommandHandler.handle(interaction)
    expect(command.execute).toHaveBeenCalled()
  })

  test('catches any errors the command throws', async () => {
    const client = mock<BotClient>()
    const interaction = mock<ChatInputCommandInteraction>({
      reply: jest.fn().mockReturnValue({
        catch: jest.fn(),
      }),
      valueOf: jest.fn(),
      client: client as unknown as Client<true>,
      commandName: 'sample_command',
    })

    const command = mock<Command>({
      execute: jest.fn().mockRejectedValue(new Error('Sample error')),
    })

    client.commands = new Collection<string, Command>([['sample_command', command]])

    await chatInputCommandHandler.handle(interaction)
    expect(command.execute).toHaveBeenCalled()
    expect(interaction.reply).toHaveBeenCalled()
  })
})

describe('unknown select menu handling', () => {
  test('outputs an error message', async () => {
    const client = mock<BotClient>()
    const interaction = mock<ChatInputCommandInteraction>({
      reply: jest.fn().mockReturnValue({
        catch: jest.fn(),
      }),
      valueOf: jest.fn(),
      client: client as unknown as Client<true>,
      commandName: 'unknown_command',
    })

    client.commands = new Collection<string, Command>()

    await chatInputCommandHandler.handle(interaction)
    expect(interaction.reply).toHaveBeenCalled()
    expect(console.error).toHaveBeenCalled()
  })
})
