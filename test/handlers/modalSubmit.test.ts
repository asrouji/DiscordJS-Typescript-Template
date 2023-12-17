import { ModalSubmitInteraction } from 'discord.js'
import modalSubmitHandler from '../../src/handlers/modalSubmit'
import { mock } from 'jest-mock-extended'

beforeAll(() => {
  console.error = jest.fn()
})

afterAll(() => {
  jest.restoreAllMocks()
})

describe('unknown select menu handling', () => {
  test('outputs an error message', async () => {
    const interaction = mock<ModalSubmitInteraction>({
      deferUpdate: jest.fn().mockReturnValue({
        catch: jest.fn(),
      }),
      valueOf: jest.fn(),
    })

    await modalSubmitHandler.handle(interaction)
    expect(interaction.deferUpdate).toHaveBeenCalled()
    expect(console.error).toHaveBeenCalled()
  })
})
