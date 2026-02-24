
function formatDate(timestamp) {
    if (!timestamp) return "Nooit";
    return new Date(timestamp).toLocaleDateString("nl-NL");
}


async function makePlayerData(data) {
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
        activityStatus = `Playing ${game} " " ${map}`;
        activityColor = 'online';
    }
    /*
    let username = null;
    if (player.socialMedia?.links?.DISCORD) {
        username = await getDiscordusername(player.socialMedia.links.DISCORD);
    }
    */
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
      //  discord: username 
    }
}
async function processSkyblockData(data, uuid) {
    const activeProfile = data.profiles.find(p => p.selected);
    
    if (!activeProfile) return { error: "Geen actief profiel gevonden" };

    const memberData = activeProfile.members[uuid]; 

    if (!memberData) return { error: "Speler niet gevonden in dit profiel" };

    const bankBalance = memberData.banking ? (bankData.balance || 0) : "N/A";

    return {
        profileName: activeProfile.cute_name,
        purse: memberData.coin_purse || 0,
        xp: memberData.leveling?.experience || 0,
        bank: bankBalance || 0,
        gameMode: activeProfile.game_mode || "Normal"
    };
}
