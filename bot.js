require("dotenv").config()

const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});

const participants = new Set();

client.once("clientReady", () => {
  console.log("Bot DJ prêt !");
});

client.on("interactionCreate", async interaction => {

  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "join-dj") {

    participants.add(interaction.user.username);

    await interaction.reply(
      `${interaction.user.username} est inscrit pour la roulette DJ 🎧`
    );
  }

  if (interaction.commandName === "leave-dj") {

    participants.delete(interaction.user.username);

    await interaction.reply(
      `${interaction.user.username} quitte la roulette.`
    );
  }

  if (interaction.commandName === "list-dj") {

    if (participants.size === 0) {
      return interaction.reply("Personne n'est inscrit.");
    }

    await interaction.reply(
      "Participants :\n" + [...participants].join("\n")
    );
  }

  if (interaction.commandName === "clear-dj") {
    if (participants.size > 0) {
      participants.clear();
    }

    await interaction.reply(
      "Liste des participants vidée"
    );
  }

  if (interaction.commandName === "spin-dj") {

    if (participants.size === 0) {
      return interaction.reply("Aucun participant.");
    }

    const array = [...participants];
    const winner = array[Math.floor(Math.random() * array.length)];

    await interaction.reply(
      `🎧 Le DJ de cette session est : **${winner}**`
    );
  }

});

client.login(process.env.TOKEN);