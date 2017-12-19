const config = require("../config.json");

const whiteList = config.whitelistedServers

module.exports = (bot) => {
  console.log(`Loaded commands!\n`);
  console.log(`~ Prefix: ${config.prefix}`);
  console.log(`~ ${bot.guilds.array().length} Guilds ${bot.channels.array().length} Channels ${bot.users.array().length} Users\n`)
  bot.user.setGame(`Ugh... School...`)
  //bot.user.setPresence(`${bot.user.username}`, {type: 'LOADING'});

  // Whitelist
  bot.guilds.forEach(async(guild, id) => {
    var allowedServer = false
    whiteList.forEach(async(id) => {
      if (guild.id == id) {
        allowedServer = true
      };
    });
    if (!allowedServer) {
      console.log(`[LEFT] [#${guild.memberCount}] ${guild.name}, ${guild.id} due to whitelist`)
      guild.leave()
    } else {
      console.log(`[SERVER] [#${guild.memberCount}] ${guild.name}, ${guild.id} | Joined: ${guild.joinedAt.toString()}`)
    }
  });
  console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`)
  console.log(`${bot.user.username} loaded!\n`)

  // Status Rotator
  gameval = 0
  setInterval(() => {
    if (gameval == config.statues.length) {
      gameval = 0
    }
    var game = config.statues[gameval]
    bot.user.setGame(`${config.prefix}help | littler.tk | ${game}`)
    //console.log(`Change staus: ${game} ${gameval}/${config.statues.length}`)
    gameval++
  }, 60000) // One min

};
