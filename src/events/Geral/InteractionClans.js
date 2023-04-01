const client = require('../../../index');
const Discord = require("discord.js");
const { QuickDB } = require('quick.db');
const db = new QuickDB();


client.on("interactionCreate", async (interaction) => {
    try {
    if(!interaction.isButton()) return
    
    const chan = interaction.guild.channels.cache.get(interaction.channelId);
    let confirmar = interaction.guild.channels.cache.get("1055846945412890745")

    let quantia = await db.get(`quantia_${chan.topic}`);
    let membros = await db.get(`membros_${chan.topic}`);
    let clan = await db.get(`clan_${chan.topic}`);
    

    if(interaction.customId === "aceitar") {
      if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) {

        interaction.reply({ content: `Apenas um staff pode aceitar a confirmação de clans!.`, ephemeral: true })
  
      } else 

        await interaction.deferUpdate()

        let embed = new Discord.EmbedBuilder()
        .setColor("Gold")
        .setAuthor({ name: `Confirmação de clans`, iconURL: interaction.guild.iconURL({ dynamic: true }) })
        .setDescription(`> **Clan:** ${clan}\n > **Quantia:** ${quantia}\n\n 📰 **Lista de membros:** \`\`\`\ ${membros} \`\`\``)

        interaction.channel.delete()
        confirmar.send({ embeds: [embed] })      
        
      } if(interaction.customId === "negar") { 
        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) {

          interaction.reply({ content: `Apenas um staff pode negar a confirmação de clans!`, ephemeral: true })
    
        } else 

        await interaction.deferUpdate()

        let embed2 = new Discord.EmbedBuilder()
        .setColor("Gold")
        .setAuthor({ name: `Confirmação de clans`, iconURL: interaction.guild.iconURL({ dynamic: true }) })
        .setDescription(`> **Clan:** ${clan}\n > **Quantia:** ${quantia}\n\n 📰 **Lista de membros:** \`\`\`\ ${membros} \`\`\``)

        interaction.channel.delete()
        confirmar.send({ embeds: [embed2] })
    
      } 
  
    } catch(e) {
      console.error(e)
      interaction.followUp({content: e.message, ephemeral: true})
    }
  })