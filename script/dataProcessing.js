async function processPlayerData(data) {
    const player = data.player;
   
    const ranks = {
        "VIP": "VIP",
        "VIP_PLUS": "VIP+",
        "MVP": "MVP",
        "MVP_PLUS": "MVP+",
        "SUPERSTAR": "MVP++"
    };

    let activityStatus = 'Offline'; 
    let activityColor = 'offline'; 

    if (player.session?.online === true) {
        const game = player.session.gameType || 'Unknown';
        const map = player.session.map ? ` - ${player.session.map}` : '';
        activityStatus = `Playing ${game}${map}`;
        activityColor = 'online';
    }
    let username = null;
    if (player.socialMedia?.links?.DISCORD) {
        username = await getDiscordUsername(player.socialMedia.links.DISCORD);
    }
    return {
        name: player.displayname,
        rank: ranks[player.newPackageRank] || '',
        firstJoin: formatDate(player.firstLogin),
        isOnline: player.session?.online === true,
        activityStatus: activityStatus,
        activityColor: activityColor,
        linkSkycrypt: `https://sky.shiiyu.moe/stats/${player.displayname}/`,
        linkPlancke: `https://plancke.io/hypixel/player/stats/${player.displayname}`,
        linkElitebot: `https://elitebot.dev/@${player.displayname}/`,
        discord: username 
    }
}
