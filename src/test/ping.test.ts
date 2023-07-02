import pingCommand from '../commands/ping'
import { CommandInteraction } from 'discord.js'
import { mock } from 'jest-mock-extended'

describe('ping command', () => {
  test('replies with pong when called', async () => {
    const interaction = mock<CommandInteraction>()
    await pingCommand.execute(interaction)
    expect(interaction.reply).toHaveBeenCalledTimes(1)
    expect(interaction.reply).toHaveBeenCalledWith('Pong!')
  })
})
