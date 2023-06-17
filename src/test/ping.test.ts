import pingCommand from '../commands/ping'
import CommandInteraction from '../mocks/command-interaction'

describe('ping command', () => {
  it('should reply with Pong!', async () => {
    const interaction = CommandInteraction.create({
      isButton: () => false,
    })
    await pingCommand.execute(interaction)
    expect(interaction.reply).toHaveBeenCalledWith('Pong!')
    expect(interaction.reply).toHaveBeenCalledTimes(1)
    const isButton = interaction.isButton()
    expect(isButton).toBe(false)
  })
})
