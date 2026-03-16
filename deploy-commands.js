require("dotenv").config();
const { REST, Routes, SlashCommandBuilder } = require('discord.js');

const commands = [
  new SlashCommandBuilder().setName('join-dj').setDescription('Participer à la roulette DJ'),
  new SlashCommandBuilder().setName('leave-dj').setDescription('Quitter la roulette DJ'),
  new SlashCommandBuilder().setName('list-dj').setDescription('Voir les participants'),
  new SlashCommandBuilder().setName('clear-dj').setDescription('Vider la liste de participants'),
  new SlashCommandBuilder().setName('spin-dj').setDescription('Tirer le DJ au sort')
].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
  try {
    await rest.put(
      Routes.applicationCommands("1478830027985518803"),
      { body: commands },
    );
    console.log('Commandes installées');
  } catch (error) {
    console.error(error);
  }
})();