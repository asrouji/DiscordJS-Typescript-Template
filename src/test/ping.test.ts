import { executeCommandAndSpyReply } from '../util/mock-discord'
import pingCommand from '../commands/ping'

describe('ping command', () => {
  it('should reply with Pong!', async () => {
    const { spy } = await executeCommandAndSpyReply(pingCommand)
    expect(spy).toHaveBeenCalledWith('Pong!')
  })
})
