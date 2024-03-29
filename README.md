# Discord.js Typescript Template

- ⚙️ 100% Typescript (ESM)
- 🛠️ Slash Command & Event Handler
- 🧪 Unit Testing with Jest
- 🧹 ESLint + Prettier Config

## Getting Started

Start by creating a new repository on Github from this template. You can then clone the repo and install dependencies:

```bash
npm install -g yarn # install yarn (if not already installed)
yarn                # install dependencies
```

Create a bot application on the [Discord Developer Portal](https://discord.com/developers/applications) and add a bot user to it. Copy the bot token and client ID and add them to a `.env` file in the root of the project:

```bash
touch .env
echo "BOT_TOKEN=<your-bot-token>" >> .env
echo "CLIENT_ID=<your-client-id>" >> .env
```

After [adding the bot to a Discord server](https://discordjs.guide/preparations/adding-your-bot-to-servers.html#creating-and-using-your-invite-link), you can run the bot start script:

```bash
yarn dev # development mode (reloads on file changes)
yarn start # production mode (no reloads)
```

## Adding Slash Commands

To add a new slash command, create a new `.ts` file in the `src/commands` directory. The file should export a `Command` object. An example command from `src/commands/ping.ts` is shown below:

```ts
import { SlashCommandBuilder } from 'discord.js'
import { Command } from '../types/command'

const command: Command = {
  data: new SlashCommandBuilder().setName('ping').setDescription('Replies with Pong!'),
  execute: async interaction => await interaction.reply(`Pong!`),
}

export default command
```

The `Command` object has the following properties:

- `data` - The command data to be displayed on Discord, as shown:
  
![Command Data](images/slash_command_preview.png)

- `execute` - The function to run when the command is invoked. This function recieves an `Interaction` object which must be aknowledged with a reply or deferred response.

To deploy all created commands to Discord, run the `deploy-commands` script:

```bash
yarn deploy-commands
```

You can also delete all commands from Discord with the `delete-commands` script:

```bash
yarn delete-commands
```

## Adding Event Listeners

Two events listeners are already set up in the template: `ready` and `interactionCreate`:

- `ready` - Triggered when the bot first comes online
- `interactionCreate` - Triggered when a user interacts with the bot via slash command, button, modal, etc.

You can support other events by adding additional event listeners `src/events` directory. Each listener should export an `EventListener` object. An example event from `src/events/ready.ts` is shown below:

```ts
import { Events } from 'discord.js'
import { createEventListener } from '../types/eventListener'

const event = createEventListener({
  name: Events.ClientReady,
  once: true,
  execute: async client => {
    console.log(`Logged in as ${client.user?.tag}`)
  },
})

export default event
```

The `Event` object has the following properties:

- `name` - The Discord event to listen for (see [Discord.js docs](https://discord.js.org/docs/packages/discord.js/14.14.1/Events:Enum))
- `once` - Whether the event should only be run once
- `execute` - The function to run when the event is triggered

All events in the `src/events` directory will be automatically registered when the bot starts, so there is no need to manually deploy them to Discord or make any other code changes.

## Handling Interaction Events

The interaction event listener in `src/events/interactionCreate.ts` passes the interaction to an **interaction handler** depending on the interaction type (e.g. chat input command, button click, etc.). These handlers are defined in `src/handlers` and all share the `InteractionHandler` interface:

```ts
import { BaseInteraction } from 'discord.js'

export default interface InteractionHandler<T extends BaseInteraction> {
  handle(interaction: T): Promise<unknown>
}
```

`T` refers to the type of interaction being handled. The list of all interaction types can be found in the [Discord.js docs](https://discord.js.org/docs/packages/discord.js/14.14.1/Interaction:TypeAlias).

This modular setup enables the recieved interaction type to be inferred by the handler, which is important since all interaction types have different properties. Additional interaction types can be supported by adding a new handler to `src/handlers` and routing interactions to it in `src/events/interactionCreate.ts`.

## Built-In Scripts

- `yarn dev` - Start the bot in development mode
- `yarn start` - Start the bot in production mode
- `yarn test` - Runs Jest unit tests
- `yarn lint` - Runs ESLint
- `yarn typecheck` - Runs Typescript type checking
- `yarn ci` - Runs all CI checks (lint, typecheck, test)
- `yarn deploy-commands` - Deploys slash commands to Discord
- `yarn delete-commands` - Deletes all slash commands from Discord
