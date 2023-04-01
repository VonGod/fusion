const client = require('../../../index');
const Discord = require("discord.js");

client.on("interactionCreate", async (interaction) => {
    try {
    if(!interaction.isStringSelectMenu()) return
    
    if(interaction.customId === "Ticket") {
      
      let message = await interaction.channel.messages.fetch(interaction.message.id)
      let value = interaction.values

      let ticketduvidas = `📨・duvidas-de-${interaction.user.id}`;
      let ticketcompras = `📨・compras-de-${interaction.user.id}`;
      let ticketdenuncias = `📨・denuncias-de-${interaction.user.id}`;
      let ticketsolicitar = `📨・solicitacao-de-${interaction.user.id}`;
      let categoria = `1078740606349746197`

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

      let embed = new Discord.EmbedBuilder()
      .setColor("Gold")
      .setAuthor({ name: `Confirmação de clans`, iconURL: interaction.guild.iconURL({ dynamic: true }) })
      .setDescription(`> **Clan:** Teste1\n > **Quantia:** Teste2\n\n 📰 **Lista de membros:** \`\`\`\ Teste3 \`\`\``)


      //SelectMenu - Ticket
      const row = new Discord.ActionRowBuilder()
      .addComponents(
        new Discord.StringSelectMenuBuilder()
        .setCustomId("Ticket")
        .setPlaceholder('Selecione a categoria do atendimento!')
        .setMinValues(1)
        .setMaxValues(1)
        .addOptions([
          {
            label:"Dúvidas Gerais",
            description:"Tire suas dúvidas a respeito do servidor",
            value:"duvidas",
            emoji:"❓" 
          },
          {
            label:"Dúvidas Financeiras" ,
            description:"Tire suas dúvidas sobre compras de produtos",
            value:"compras",
            emoji:"🛒" 
          },
          {
            label:"Fazer uma Denúncia",
            description:"Realize denúncias de BUGS ou Jogadores",
            value:"denuncias",
            emoji:"⛔" 
          },
          {
            label:"Solicitar Tag",
            description:"Solicite a sua tag",
            value:"solicitar",
            emoji:"📋" 
          },
          
          ])
        )
      

      //Opção Dúvidas Gerais  
      if(value[0] === "duvidas") {
        
        if (!interaction.guild.channels.cache.get(categoria)) categoria = null;

        if (interaction.guild.channels.cache.find(c => c.name === ticketduvidas )) {
          interaction.reply({ content: `❌ Você já possui um ticket aberto em ${interaction.guild.channels.cache.find(c => c.name === ticketduvidas)}!`, ephemeral: true })
        } else {

          interaction.guild.channels.create({
          name: ticketduvidas,
          type: Discord.ChannelType.GuildText,
          parent: categoria,
          topic: interaction.message.id,
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
          interaction.reply({ content: `✅ Olá ${interaction.user}, seu ticket foi aberto em ${ch}!`, ephemeral: true })
        })
      }
        await message.edit({ components: [row] })
        
      //Opção Dúvidas Financeiras  
      } if(value[0] === "compras") { 

        if (!interaction.guild.channels.cache.get(categoria)) categoria = null;

        if (interaction.guild.channels.cache.find(c => c.name === ticketcompras)) {
          interaction.reply({ content: `❌ Você já possui um ticket aberto em ${interaction.guild.channels.cache.find(c => c.name === ticketcompras)}!`, ephemeral: true })
        } else {

          interaction.guild.channels.create({
          name: ticketcompras,
          type: Discord.ChannelType.GuildText,
          parent: categoria,
          topic: interaction.message.id,
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
          interaction.reply({ content: `✅ Olá ${interaction.user}, seu ticket foi aberto em ${ch}!`, ephemeral: true })
          ch.send({ embeds: [embed], components: [buttons] }).then( m => { 
            m.pin()
        })
      })
      }
        await message.edit({ components: [row] })

      //Opção Denuncias  
      } if(value[0] === "denuncias") { 

        if (!interaction.guild.channels.cache.get(categoria)) categoria = null;

        if (interaction.guild.channels.cache.find(c => c.name === ticketdenuncias)) {
          interaction.reply({ content: `❌ Você já possui um ticket aberto em ${interaction.guild.channels.cache.find(c => c.name === ticketdenuncias)}!`, ephemeral: true })
        } else {

          interaction.guild.channels.create({
          name: ticketdenuncias,
          type: Discord.ChannelType.GuildText,
          parent: categoria,
          topic: interaction.message.id,
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
          interaction.reply({ content: `✅ Olá ${interaction.user}, seu ticket foi aberto em ${ch}!`, ephemeral: true })
        })
      }
        await message.edit({ components: [row] })

      //Opção Solicitar Tag  
      } if(value[0] === "solicitar") { 

        if (!interaction.guild.channels.cache.get(categoria)) categoria = null;

        if (interaction.guild.channels.cache.find(c => c.name === ticketsolicitar)) {
          interaction.reply({ content: `❌ Você já possui um ticket aberto em ${interaction.guild.channels.cache.find(c => c.name === ticketsolicitar)}!`, ephemeral: true })
        } else {

          interaction.guild.channels.create({
          name: ticketsolicitar,
          type: Discord.ChannelType.GuildText,
          parent: categoria,
          topic: interaction.message.id,
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
          interaction.reply({ content: `✅ Olá ${interaction.user}, seu ticket foi aberto em ${ch}!`, ephemeral: true })
        })
      }
        await message.edit({ components: [row] })  

      }

      
    }
  
    } catch(e) {
      console.error(e)
      interaction.followUp({content: e.message, ephemeral: true})
    }
  
  })