async function getHypixelData(uuid) {
    const url = `https://api.hypixel.net/v2/player?uuid=${uuid}`;
try {
         
        const playerRes = await fetch(`https://api.hypixel.net/v2/player?uuid=${uuid}`, {
            headers: { 'API-Key': apiKey }
        });
        const playerData = await playerRes.json();

        if (playerData.success && playerData.player) {
            displayPlayerData(playerData.player.displayname, playerData.player.newPackageRank);
        }

        const sbRes = await fetch(`https://api.hypixel.net/v2/skyblock/profiles?uuid=${uuid}`, {
            headers: { 'API-Key': apiKey }
        });
        const sbData = await sbRes.json();

        if (sbData.success && sbData.profiles) {
            const activeProfile = sbData.profiles.find(p => p.selected);
            const memberKey = Object.keys(activeProfile.members).find(key => 
            key.replaceAll("-", "") === uuid.replaceAll("-", ""));
            const memberData = activeProfile.members[memberKey];

            const rawXp = memberData.leveling?.experience || 0;
            const exactLevel = Math.floor(rawXp / 100);
            const progressToNext = rawXp % 100;

            SBdisplayProfileDataLevel(exactLevel, progressToNext, rawXp);
        }
     } catch (error) {
        console.error("Failed to fetch data:", error);
    }
}
async function getUUIDFromName(username) {
    try {
        const response = await fetch(`https://api.ashcon.app/mojang/v2/user/${username}`);
        if (!response.ok) throw new Error("Speler niet gevonden!");
        const data = await response.json();
        return data.uuid; 
    } catch (error) {
        console.error("Fout bij ophalen UUID:", error);
        return null;
    }
}
async function getSkinFromUUID(uuid) {
    console.log("hoi")
    try {
        const response = await fetch (`https://api.ashcon.app/mojang/v2/user/${uuid}`);
        if (!response.ok) throw new Error("invalid input")
            const data = await response.json();
      
            const username = data.username;

          displaySkin(`https://mc-heads.net/body/${username}/200`);
    } catch (error) {
        console.error("Fout data retrieve: " + error);
        displaySkin("https://mc-heads.net/body/Steve/200");
    }
    
}

document.getElementById('inputForm').addEventListener('submit', async (event) => {
    event.preventDefault(); 
    
    await handleSearch(event);
});
async function handleSearch(event) {
    event.preventDefault(); 

    const username = document.getElementById('username').value;
    console.log("zoeken naar: ", username);

    const uuid = await getUUIDFromName(username);
    if (uuid) {
        getHypixelData(uuid);
        getSkinFromUUID(uuid);
    }
}


    function displayPlayerData(name,rank) {
        console.log(rank);
        const nameElement = document.getElementById('colName');
        const rankElement = document.getElementById('colRank');
        if (!nameElement || !rankElement) {
            console.error("Could not find 'name' or 'rank' elements in your HTML!");
            return;
        }

        const ranks = {
            "VIP": "VIP",
            "VIP_PLUS": "VIP+",
            "MVP": "MVP",
            "MVP_PLUS": "MVP+",
            "SUPERSTAR": "MVP++",
            "GAME_MASTER": "STAFF",
            "ADMIN": "Admin"
        };

        nameElement.innerText = name;
        rankElement.innerText = ranks[rank] || "Default";
    }

    function SBdisplayProfileDataLevel (SBlevel, SBxp, SBrawXp) {
        const levelElement = document.getElementById('colLevel');

        if (!levelElement) {
            console.error("level data not found")
            return;
        }
        levelElement.innerText = `Level ${SBlevel}`;

        levelElement.title = `Progressie: ${SBxp}/100 XP (Totaal: ${SBrawXp} XP)`;
        
        levelElement.onmouseover = () => levelElement.style.color = "#000000";
        levelElement.onmouseout = () => levelElement.style.color = "white";
    }


function displaySkin(skinUrl) {
    const skinContainer = document.getElementById('colPlayerSkin');
    if (skinContainer) {
        skinContainer.innerHTML = `<img src="${skinUrl}" alt="Player Skin">`;
    } else {
        console.error("Element 'colPlayerSkin' niet gevonden!");
    }
}