import { ClientEvents } from 'discord.js'

export default interface Event<T extends keyof ClientEvents> {
  name: T
  once?: boolean
  execute: (...args: ClientEvents[T]) => Promise<unknown>
}
