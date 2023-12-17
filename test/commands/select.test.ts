import selectCommand from '../../src/commands/select'
import { CommandInteraction } from 'discord.js'
import { MockProxy, mock } from 'jest-mock-extended'

let slashCommandInteraction: MockProxy<CommandInteraction>

beforeEach(() => {
  // Mock console.log and console.error to prevent them from logging to the console
  console.log = jest.fn()
  console.error = jest.fn()

  slashCommandInteraction = mock<CommandInteraction>({
    reply: jest.fn(),
    valueOf: jest.fn(),
    user: {
      id: '1234567890',
      toString: jest.fn(),
      valueOf: jest.fn(),
    },
  })
})

test('replies with the select menu', async () => {
  await selectCommand.execute(slashCommandInteraction)
  expect(slashCommandInteraction.reply).toHaveBeenCalled()
})
