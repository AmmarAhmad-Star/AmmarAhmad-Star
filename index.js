const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } = require('discord.js');

const token = process.env.DISCORD_TOKEN;
const clientId = process.env.CLIENT_ID;

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

// Define global slash command '/arcade'
const arcadeCommand = new SlashCommandBuilder()
  .setName('arcade')
  .setDescription('Play Arcade games across any server!')
  // Enable integration contexts for both Guilds and User Apps (usable anywhere / in DMs and all servers)
  .setIntegrationTypes([0, 1]) // 0: Guild Install, 1: User Install
  .setContexts([0, 1, 2]);      // 0: Guild, 1: Bot DM, 2: Private Channel / User Context

const commands = [arcadeCommand.toJSON()];

async function registerCommands() {
  if (!token || !clientId) {
    console.warn('DISCORD_TOKEN or CLIENT_ID is missing in environment variables. Global slash command registration skipped at startup.');
    return;
  }

  const rest = new REST({ version: '10' }).setToken(token);

  try {
    console.log('Registering global application (/) commands...');
    // Registering to Routes.applicationCommands(clientId) makes the command available globally in every server
    await rest.put(
      Routes.applicationCommands(clientId),
      { body: commands }
    );
    console.log('Successfully registered global application (/) commands across all servers.');
  } catch (error) {
    console.error('Failed to register global application commands:', error);
  }
}

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  registerCommands();
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'arcade') {
    await interaction.reply({
      content: '🎮 Welcome to the Arcade! Choose a game to play!',
      ephemeral: false
    });
  }
});

if (token) {
  client.login(token);
} else {
  console.log('Bot initialized. Set DISCORD_TOKEN and CLIENT_ID environment variables to launch.');
}
