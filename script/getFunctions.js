async function  getUUID(username) {
    try {
        const response = await fetch(`https://api.ashcon.app/mojang/v2/user/${username}`);
        if (!response.ok) throw new Error(username + " <--- invalid Username/Player not found.");
        const data = await response.json();
        return data.uuid;
    } catch (error){
        console.error(error);
        return null;
    }
} 
/* 
async function getDiscordusername(discordId) {
    try {
        const response = await fetch(`https://discord.com/api/v10/users/${discordId}`, {headers: {'Authorization': `Bot ${discordToken}`}});
        if (!response.ok) throw new Error('Discord Api error')
        
        const data = await response.json();
        return data;

    } catch (error){
        console.error(error)
        return null;
    }
}
*/
async function getPlayerData(uuid) {
    try {
        const response = await fetch(`https://api.hypixel.net/v2/player?uuid=${uuid}`, {headers: { 'API-Key': apiKey }});
        if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);
        const playerData = await response.json();
            return playerData;
    } catch (error){
        console.error(error)
        return null;
    }
    
}

async function getSkyblocData(uuid) {
    try {
        const response = await fetch(`https://api.hypixel.net/v2/skyblock/profiles?uuid=${uuid}`, {headers: { 'API-Key': apiKey }});
        if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);
            const skyblockData = await response.json();
            return skyblockData;
    } catch (error){
        console.error(error)
        return null;
    }
}

async function getSkinTexture(uuid) {
    try {
         const response = await fetch(`https://api.ashcon.app/mojang/v2/user/${uuid}`);
        if (!response.ok) throw new Error("invalid input")
        const data = await response.json();
            return data;        
    } catch (error){
        console.error(error)
        return null;
    }
}