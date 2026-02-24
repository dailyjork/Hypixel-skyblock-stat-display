



document.getElementById('inputForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    await handleSearch(event);
});
async function handleSearch(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    console.log("zoeken naar: ", username);

    const uuid = await getUUID(username);
    if (uuid) {
        Pdata = await getPlayerData(uuid);
        SBdata = await getSkyblocData(uuid);
        skin = getSkinTexture(uuid);

        Player = await makePlayerData(Pdata);
        SkyblockData = await processSkyblockData(SBdata, uuid);   
    }

    if (Pdata) {
         displayPlayer(Pdata)
    }
}


function displayPlayer(data) {
    colName = document.getElementById('colName');
    colRank = document.getElementById('colRank');
    colFirst = document.getElementById('colFirst');
    colStatus = document.getElementById('colStatus');
    colSkycrypt = document.getElementById('colSkycrypt');
    colPlancke = document.getElementById('colPlancke');
    colElitebot = document.getElementById('colElitebot');
    //colDiscord = document.getElementById('colDiscord');
    
    Player = data;

    let statusString = '';
    if (Player.isOnline = true) {
        statusString = ("Online: " + Player.activityStatus);
        colStatus.style.color = "green";
    } else {
        statusString = 'Offline'
        colStatus.style.color = "red";
    }



    colName.innerText = Player.name;
    colRank.innerText = Player.rank;
    colFirst.innerText = Player.firstJoin;
    colStatus.innerText = statusString;
    colSkycrypt.innerHTML = ('<a>' + Player.linkSkycrypt + '</a>')
    colPlancke.innerHTML = ('<a>' + Player.linkPlancke + '</a>')
    colElitebot.innerHTML = ('<a>' + Player.linkElitebot + '</a>')
    //colDiscord = ""

    
}

function displaySkyblock() {

}



function displaySkin(skinUrl) {
    const skinContainer = document.getElementById('colPlayerSkin');
    if (skinContainer) {
        skinContainer.innerHTML = `<img src="${skinUrl}" alt="Player Skin">`;
    } else {
        console.error("Element 'colPlayerSkin' niet gevonden!");
    }
}
