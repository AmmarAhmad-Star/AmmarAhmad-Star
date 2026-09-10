const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } = require('discord.js');

const token = process.env.DISCORD_TOKEN;
const clientId = process.env.CLIENT_ID;

// Parse owner / co-owner user IDs from environment variables (.env)
const ownerIds = [
  process.env.OWNER_ID,
  process.env.OWNER_IDS,
  process.env.CO_OWNER_IDS
]
  .filter(Boolean)
  .flatMap(val => val.split(','))
  .map(id => id.trim())
  .filter(Boolean);

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

// Define global slash command '/arcade'
const arcadeCommand = new SlashCommandBuilder()
  .setName('arcade')
  .setDescription('Play Arcade games across any server!')
  .setIntegrationTypes([0, 1]) // 0: Guild Install, 1: User Install
  .setContexts([0, 1, 2]);      // 0: Guild, 1: Bot DM, 2: Private Channel / User Context

// Define secret slash command '/rig' (restricted to owner and co-owners)
const rigCommand = new SlashCommandBuilder()
  .setName('rig')
  .setDescription('Secret command to rig games (Owner / Co-Owner only)')
  .setIntegrationTypes([0, 1])
  .setContexts([0, 1, 2])
  .addStringOption(option =>
    option.setName('game')
      .setDescription('The game to rig')
      .setRequired(false)
  );

// Define owner/co-owner exclusive command '/server-mirror'
const serverMirrorCommand = new SlashCommandBuilder()
  .setName('server-mirror')
  .setDescription('Exclusive command to mirror server configurations (Owner / Co-Owner only)')
  .setIntegrationTypes([0, 1])
  .setContexts([0, 1, 2])
  .addStringOption(option =>
    option.setName('target')
      .setDescription('Target server ID or name')
      .setRequired(false)
  );

const commands = [arcadeCommand.toJSON(), rigCommand.toJSON(), serverMirrorCommand.toJSON()];

async function registerCommands() {
  if (!token || !clientId) {
    console.warn('DISCORD_TOKEN or CLIENT_ID is missing in environment variables. Global slash command registration skipped at startup.');
    return;
  }

  const rest = new REST({ version: '10' }).setToken(token);

  try {
    console.log('Registering global application (/) commands...');
    await rest.put(
      Routes.applicationCommands(clientId),
      { body: commands }
    );
    console.log('Successfully registered global application (/) commands across all servers.');
  } catch (error) {
    console.error('Failed to register global application commands:', error);
  }
}

/**
  * Check if a user ID belongs to the bot owner or a designated co-owner.
  */
async function isOwnerOrCoOwner(userId) {
  if (ownerIds.includes(userId)) {
    return true;
  }

  try {
    if (!client.application?.owner) {
      await client.application?.fetch();
    }
    const owner = client.application?.owner;
    if (!owner) return false;

    // Handle single owner vs Team owner
    if (owner.members) {
      return owner.members.has(userId);
    }
    return owner.id === userId;
  } catch (error) {
    console.error('Error fetching application owner:', error);
    return false;
  }
}

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  registerCommands();
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName, user } = interaction;

  if (commandName === 'arcade') {
    await interaction.reply({
      content: '🎮 Welcome to the Arcade! Choose a game to play!',
      ephemeral: false
    });
  } else if (commandName === 'rig') {
    const isAuthorized = await isOwnerOrCoOwner(user.id);
    if (!isAuthorized) {
      await interaction.reply({
        content: '❌ You do not have permission to use this command.',
        ephemeral: true
      });
      return;
    }

    const game = interaction.options.getString('game') || 'all games';
    await interaction.reply({
      content: `⚙️ [Secret Command] Successfully rigged ${game} for your next play!`,
      ephemeral: true
    });
  } else if (commandName === 'server-mirror') {
    const isAuthorized = await isOwnerOrCoOwner(user.id);
    if (!isAuthorized) {
      await interaction.reply({
        content: '❌ You do not have permission to use this command.',
        ephemeral: true
      });
      return;
    }

    const target = interaction.options.getString('target') || 'current server';
    await interaction.reply({
      content: `🪞 [Exclusive Command] Server Mirror initiated for target: ${target}`,
      ephemeral: true
    });
  }
});

if (token) {
  client.login(token);
} else {
  console.log('Bot initialized. Set DISCORD_TOKEN and CLIENT_ID environment variables to launch.');
}
