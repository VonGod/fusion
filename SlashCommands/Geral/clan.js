const Discord = require("discord.js");
const { QuickDB } = require('quick.db');
const db = new QuickDB();

module.exports = {
  name: "clan", 
  description: "Cria uma confirmação de clan",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
        name: "tag",
        type: Discord.ApplicationCommandOptionType.String,
        description: "Coloque aqui a tag e o nome do seu clan",
        required: true,
      },
    {
        name: "quantia",
        type: Discord.ApplicationCommandOptionType.String,
        description: "Selecione a quantidade de membros.",
        required: true,
        choices: [
          {
            name: "10 membros",
            value: "10 membros",
          },
          {
            name: "15 membros",
            value: "15 membros",
          },
          {
            name: "20 membros",
            value: "20 membros",
          },
        ],
      },
    {
      name: "membros",
      type: Discord.ApplicationCommandOptionType.String,
      description: "Coloque aqui o nick de todos os membros",
      required: true,
    },
  ],

  run: async (client, interaction, args) => {
    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) {

      interaction.reply({ content: `Comando em desenvolvimento.`, ephemeral: true })

    } else {
      let quantia = interaction.options.getString("quantia");
      let membros = interaction.options.getString("membros");
      let clan = interaction.options.getString("tag")

      let nome = `🔑・confirmação-de-${interaction.user.username}`;
      let categoria = "1055924483426353322"

      if (!interaction.guild.channels.cache.get(categoria)) categoria = null;

      if (interaction.guild.channels.cache.find(c => c.name === nome)) {
        interaction.reply({ content: `❌ Você já possui uma confirmação aberta em ${interaction.guild.channels.cache.find(c => c.name === nome)}!`, ephemeral: true })
      } else {
        interaction.guild.channels.create({
        name: nome,
        type: Discord.ChannelType.GuildText,
        parent: categoria,
        topic: interaction.user.id,
        permissionOverwrites: [
          {
            id: interaction.guild.id,
            deny: [
              Discord.PermissionFlagsBits.ViewChannel
            ]
          },
          {
            id: interaction.user.id,
            allow: [
              Discord.PermissionFlagsBits.ViewChannel,
              Discord.PermissionFlagsBits.SendMessages,
              Discord.PermissionFlagsBits.AttachFiles,
              Discord.PermissionFlagsBits.EmbedLinks,
              Discord.PermissionFlagsBits.AddReactions
            ]
          }
        ]
      }).then( (ch) => {
        interaction.reply({ content: `✅ Olá ${interaction.user}, sua confirmação foi aberta em ${ch}!`, ephemeral: true })
        let buttons = new Discord.ActionRowBuilder().addComponents(
          aceitar = new Discord.ButtonBuilder()
            .setCustomId("aceitar")
            .setEmoji("<:check_mark:1056934551672336405>")
            .setLabel("Aceitar")
            .setStyle(Discord.ButtonStyle.Success),
          negar = new Discord.ButtonBuilder()
            .setCustomId("negar")
            .setEmoji("<:cross_mark:1056934553152913518>")
            .setLabel("Negar")
            .setStyle(Discord.ButtonStyle.Danger)
        );
  
        db.set(`quantia_${interaction.user.id}`, quantia);
        db.set(`membros_${interaction.user.id}`, membros);
        db.set(`clan_${interaction.user.id}`, clan);
  
        let embed = new Discord.EmbedBuilder()
        .setColor("Gold")
        .setAuthor({ name: `Confirmação de clans`, iconURL: interaction.guild.iconURL({ dynamic: true }) })
        .setDescription(`> **Clan:** ${clan}\n > **Quantia:** ${quantia}\n\n 📰 **Lista de membros:** \`\`\`\ ${membros} \`\`\``)

        ch.send({ embeds: [embed], components: [buttons] }).then( m => { 
          m.pin()
         })
      })
    }
  }
}};

