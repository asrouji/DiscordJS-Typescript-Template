import { ClientEvents } from 'discord.js'

/**
 * Interface for defining event listners. Import the `Events` enum from discord.js to see all possible event types.
 * It is recommended to use the `createEvent` function to create an event, as it will infer the type of the event from its name.
 * @template T The event name, e.g. `Events.ClientReady`
 */
export default interface EventListener<T extends keyof ClientEvents> {
  /** The name of the event */
  name: T
  /** Whether the event should only be executed once */
  once?: boolean
  /** The function to execute when the event is emitted */
  execute: (...args: ClientEvents[T]) => Promise<unknown>
}

/**
 * Creates an event listener with the `EventListener` interface.
 * @param event parameters for the event listener
 * @returns the created EventListener
 */
export const createEventListener = <T extends keyof ClientEvents>(event: EventListener<T>) => event
