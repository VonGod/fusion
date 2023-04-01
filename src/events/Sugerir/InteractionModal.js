const client = require('../../../index');
const Discord = require("discord.js");

client.on('interactionCreate', interaction => {
    if (!interaction.isModalSubmit()) return;
    
    const sugestao = interaction.fields.getTextInputValue('sugestao')
  
    const embed = new Discord.EmbedBuilder()
    .setColor("Green")
    .setAuthor({ name: `Sugestão de ${interaction.user.username}`, iconURL: interaction.guild.iconURL({ dynamic: true }) })
    .setDescription(`🔖 **Mensagem**\n\`\`\`\n${sugestao}\`\`\`\n> Reaja com ✅ se você **Concorda**\n> Ou reaja com ❌ se você **Discorda**`)
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

    interaction.reply({ embeds: [embed], components: [botao] });
  
  })
  