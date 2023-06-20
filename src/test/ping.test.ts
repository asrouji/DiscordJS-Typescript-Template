import pingCommand from '../commands/ping'
import * as Mocks from '../util/discord-mocks'

describe('ping command', () => {
  it('should reply with Pong!', async () => {
    const interaction = Mocks.CommandInteraction.create()
    await pingCommand.execute(interaction)
    expect(interaction.reply).toHaveBeenCalledTimes(1)
    expect(interaction.reply).toHaveBeenCalledWith('Pong!')
  })
})
