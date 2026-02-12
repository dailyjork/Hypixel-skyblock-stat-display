document.getElementById('searchButton').addEventListener('click', async () => {
    const username = document.getElementById('searchInput').value.trim(); // ← UUID ophalen
    
    if (!username) {
        showError('Voer een username in');
        return;
    }
    const uuid = await getUUID(username);
    await loadPlayerData(uuid);
});

async function loadPlayerData(uuid) {
    showLoader();
    try {
        const playerData = await getPlayerData(uuid);      
        const processed = processPlayerData(playerData);     
        renderPlayerCard(processed);
    } catch (error) {
        showError(error.message);
    }
    hideLoader();
}