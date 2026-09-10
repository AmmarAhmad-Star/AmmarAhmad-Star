# Arcade Bot 🎮

A Discord bot that provides the `/arcade` command across every server.

## Features
- **Global `/arcade` Command**: Registered as a global application command using Discord REST API (`Routes.applicationCommands(clientId)`), making the `/arcade` command accessible in every server the bot joins as well as through User App installations.

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Set the following environment variables before starting the bot:
- `DISCORD_TOKEN`: Your Discord Bot Token from Developer Portal.
- `CLIENT_ID`: Your Discord Application Client ID.

Example (Linux/macOS):
```bash
export DISCORD_TOKEN="your-bot-token"
export CLIENT_ID="your-client-id"
```

### 3. Run the Bot
```bash
npm start
```
When the bot launches, it registers the `/arcade` command globally so it can be used in every server.
