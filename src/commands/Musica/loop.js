const Command = require("../../structures/Command");
const { Manager } = require('erela.js')
const Emojis = require('../../utils/Emojis')
const ClientEmbed = require('../../structures/ClientEmbed')
const ms = require('ms')

module.exports = class Loop extends Command {
  constructor(client) {
    super(client);
    this.client = client;

    this.name = "loop";
    this.category = "Musica";
    this.description = "Comando para que eu coloque a fila em loop!";
    this.usage = "loop";

    this.enabled = true;
    this.guildOnly = true;
  }

  async run(message, args, prefix, author) {

    const player = message.client.manager.players.get(message.guild.id);

    if (message.guild.me.voice.channel != null) {
      if (
        (message.member.voice.channel.id !=
          message.guild.me.voice.channel.id) ===
        true
      )
        return message.reply(
          `${Emojis.Errado} **|** Você precisa estar no mesmo canal que eu estou para modificar a fila!`
        );
    }
    if (!player)
      return message.reply(`${Emojis.Errado} **|** Não estou em nenhum canal!`);
      
    if (player.queueRepeat === true) {
      player.setQueueLoop(false);
      message.channel.send(`${Emojis.Certo} **|** Loop desativado!`);
    } else {
      player.setQueueLoop(true);
      message.channel.send(`${Emojis.Certo} **|** Loop ativado!`);
    }
      }
  }

