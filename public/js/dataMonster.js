document.addEventListener("DOMContentLoaded", () => {


    const storedData = JSON.parse(localStorage.getItem("Data"));
    const conexion = JSON.parse(localStorage.getItem("Conexion"));
    const monsterImage = document.getElementById("monsterImage");
    const connection= document.getElementById('noConnectionLabel');
 
    if (storedData && monsterImage) {
   
        healthLabel.textContent = storedData.health || "No disponible";
        const newImageSrc = "./img/monster/monster01_amazed.png";  // Ruta de la imagen
        monsterImage.src = newImageSrc;

    } else {
        // Si no hay datos en localStorage, no hacemos nada con la imagen
        console.log("No se encontraron datos en LocalStorage o no hay imagen.");
    }

    if (connection) {
        connection.textContent = conexion || 0;
    }

    updateLabels(storedData);
});

// Función para actualizar los labels
function updateLabels(storedData) {
    if (storedData) {
        // Si los datos existen, asignamos los valores a los labels
        const healthLabel = document.getElementById('healthLabel');
        const petNameLabel = document.getElementById('petNameLabel');
        const moodLabel = document.getElementById('moodLabel');
        const hungerLabel = document.getElementById('hungerLabel');
        const physicalLabel = document.getElementById('physicalLabel');

        if (healthLabel) healthLabel.textContent = storedData.health || 0;
        if (petNameLabel) petNameLabel.textContent = storedData.pet_name || 0;
        if (moodLabel) moodLabel.textContent = storedData.mood || 0;
        if (hungerLabel) hungerLabel.textContent = storedData.hunger || 0;
        if (physicalLabel) physicalLabel.textContent = storedData.physical || 0;
        
    } else {
        console.log("No se encontraron datos en LocalStorage.");
    }
}