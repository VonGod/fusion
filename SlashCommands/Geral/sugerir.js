const Discord = require("discord.js");
const { QuickDB } = require('quick.db');
const db = new QuickDB();

module.exports = {
  name: "sugerir",
  description: "「Geral」Faça sua sugestão.",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
        name: "sugestão",
        description: "Escreva sua sugestão.",
        type: Discord.ApplicationCommandOptionType.String,
        required: true,
    }
],

  run: async (client, interaction) => {

    let canal_comandos = interaction.guild.channels.cache.get("1051648167910838304");
    let canal = interaction.guild.channels.cache.get("1051649345591709726");

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) {

      interaction.reply({ content: `Comando em desenvolvimento.`, ephemeral: true })

    } else {
    
    if (interaction.channel.id != canal_comandos) {interaction.reply({ content: `Comandos permitidos apenas no canal <#1051648167910838304>`, ephemeral: true })} else {
        let sugestao = interaction.options.getString("sugestão");
        let embed = new Discord.EmbedBuilder()
        .setColor("Green")
        .setAuthor({ name: `Sugestão de ${interaction.user.username}`, iconURL: interaction.guild.iconURL({ dynamic: true }) })
        .setDescription(`🔖 **Mensagem**\n\`\`\`${sugestao}\`\`\`\n> Reaja com ✅ se você **Concorda**\n> Ou reaja com ❌ se você **Discorda**`)
        .setTimestamp()
        .setFooter({ text: `${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) });
        

        let botao = new Discord.ActionRowBuilder().addComponents(
            new Discord.ButtonBuilder()
            .setCustomId("Sugest")
            .setLabel(`Enviar Sugestão`)
            .setEmoji("📨")
            .setStyle(Discord.ButtonStyle.Primary),
            new Discord.ButtonBuilder()
            .setCustomId("Accept")
            .setLabel(`Aceitar (0)`)
            .setEmoji("✅")
            .setStyle(Discord.ButtonStyle.Success),
            new Discord.ButtonBuilder()
            .setCustomId("Reject")
            .setLabel(`Negar (0)`)
            .setEmoji("❌")
            .setStyle(Discord.ButtonStyle.Danger)
        );

        canal.send({ embeds: [embed], components: [botao] });

        interaction.reply({content: `Sugestão enviada para o chat ${canal}`, ephemeral: true});
    }


  }}
}