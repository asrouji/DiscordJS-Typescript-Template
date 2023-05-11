# Discord.js Typescript Template

- 100% Typescript (ESM)
- Slash Command Handler
- Jest + Babel Integration
- ESLint + Prettier Config

## Getting Started

Start by cloning this repo and installing dependencies:

```bash
git clone <repo-url> <project-name>
yarn # install dependencies
```

Create a bot application on the [Discord Developer Portal](https://discord.com/developers/applications) and add a bot user to it. Copy the bot token and add it to a `.env` file in the root of the project:

```bash
touch .env
echo "BOT_TOKEN=<your-bot-token>" > .env
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
