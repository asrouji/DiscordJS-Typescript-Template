# Discord.js Typescript Template

- ⚙️ 100% Typescript (ESM)
- 🛠️ Slash Command Handler
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

You can now run the bot in development mode using `yarn dev` or in production mode using `yarn start`.

## Commands

- `yarn dev` - Start the bot in development mode
- `yarn start` - Start the bot in production mode
- `yarn lint` - Runs ESLint
- `yarn test` - Runs Jest unit tests
- `yarn test:watch` - Run the tests in watch mode
- `yarn typecheck` - Runs Typescript type checking
- `yarn build` - Runs all the build steps
- `yarn deploy-commands` - Deploys slash commands to Discord
- `yarn delete-commands` - Deletes all slash commands from Discord
