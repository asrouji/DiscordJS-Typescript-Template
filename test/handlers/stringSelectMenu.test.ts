import { StringSelectMenuInteraction } from 'discord.js'
import stringSelectMenuHandler from '../../src/handlers/stringSelectMenu'
import { mock } from 'jest-mock-extended'

beforeAll(() => {
  console.error = jest.fn()
})

afterAll(() => {
  jest.restoreAllMocks()
})

describe('sample select menu handling', () => {
  test('outputs the custom ID of the selection', async () => {
    const interaction = mock<StringSelectMenuInteraction>({
      customId: 'sample_select_menu',
      values: ['option_2'],
      update: jest.fn(),
      valueOf: jest.fn(),
    })
    await stringSelectMenuHandler.handle(interaction)
    expect(interaction.update).toHaveBeenCalledWith({ content: 'Selection ID: option_2', components: [] })
  })
})

describe('unknown select menu handling', () => {
  test('outputs an error message', async () => {
    const interaction = mock<StringSelectMenuInteraction>({
      customId: 'unknown_select_menu',
      deferUpdate: jest.fn().mockReturnValue({
        catch: jest.fn(),
      }),
      valueOf: jest.fn(),
    })
    await stringSelectMenuHandler.handle(interaction)
    expect(interaction.deferUpdate).toHaveBeenCalled()
    expect(console.error).toHaveBeenCalled()
  })
})
