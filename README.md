# Arcade Bot 🎮

A Discord bot that provides the `/arcade` command across every server, along with owner/co-owner restricted commands like `/rig` and `/server-mirror`.

## Features
- **Global `/arcade` Command**: Accessible across all servers and user contexts.
- **Owner & Co-Owner Permissions**: Restricted commands (such as `/rig` and `/server-mirror`) check whether the user is the application owner, a team member, or listed in the `OWNER_ID`, `OWNER_IDS`, or `CO_OWNER_IDS` environment variables. Unauthorized users receive an ephemeral error.

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Set the following environment variables before starting the bot:
- `DISCORD_TOKEN`: Your Discord Bot Token from Developer Portal.
- `CLIENT_ID`: Your Discord Application Client ID.
- `OWNER_ID` / `OWNER_IDS` / `CO_OWNER_IDS` *(Optional)*: Single ID or comma-separated list of Discord user IDs for owners/co-owners who should have access to secret/admin commands in every server.

Example (Linux/macOS):
```bash
export DISCORD_TOKEN="your-bot-token"
export CLIENT_ID="your-client-id"
export OWNER_ID="123456789012345678"
export CO_OWNER_IDS="987654321098765432"
```

### 3. Run the Bot
```bash
npm start
```
When the bot launches, it registers global commands so they can be used in every server.
