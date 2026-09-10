# Arcade Bot 🎮

A Discord bot that provides the `/arcade` command across every server, along with owner/co-owner restricted commands like `/rig`.

## Features
- **Global `/arcade` Command**: Accessible across all servers and user contexts.
- **Owner & Co-Owner Permissions**: Restricted commands (such as the secret `/rig` command) check whether the user is the application owner, a team member, or listed in the `CO_OWNER_IDS` environment variable. Unauthorized users receive an ephemeral error.

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Set the following environment variables before starting the bot:
- `DISCORD_TOKEN`: Your Discord Bot Token from Developer Portal.
- `CLIENT_ID`: Your Discord Application Client ID.
- `CO_OWNER_IDS` *(Optional)*: Comma-separated list of Discord user IDs for co-owners who should have access to secret/admin commands in every server.

Example (Linux/macOS):
```bash
export DISCORD_TOKEN="your-bot-token"
export CLIENT_ID="your-client-id"
export CO_OWNER_IDS="123456789012345678,987654321098765432"
```

### 3. Run the Bot
```bash
npm start
```
When the bot launches, it registers global commands so they can be used in every server.
