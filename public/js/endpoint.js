document.addEventListener("DOMContentLoaded", async () => {
    try {
        // Verificar conexión al cargar la página, pero SIN actualizar "Data"
        await fetch("http://localhost:3000/proxy/pet/create"); 

        // Si la API responde correctamente, guardar estado de conexión en LocalStorage
        localStorage.setItem("Conexion", JSON.stringify("Online"));
    } catch (error) {
        console.error("Error en la conexión:", error);
        localStorage.setItem("Conexion", JSON.stringify("Sin Conexion"));
    }

    // Evento para el botón "create"
    const createButton = document.getElementById("create");
    if (createButton) {
        createButton.addEventListener("click", async () => {
            try {
                const data = await fetchAndStore("http://localhost:3000/proxy/pet/create", "Data");
                if (data) {
                    const storedData = JSON.parse(localStorage.getItem("Data") || "null");
                    console.log("Datos obtenidos correctamente:", storedData);

                    // Actualizar estado de conexión
                    localStorage.setItem("Conexion", JSON.stringify("Online"));

                    // Mostrar datos en la interfaz si es necesario
                    const healthLabel = document.getElementById("healthLabel");
                    if (healthLabel) {
                        healthLabel.textContent = storedData ? storedData.health : "No hay datos disponibles";
                    }
                } else {
                    localStorage.setItem("Conexion", JSON.stringify("Offline"));
                    const playPetButton = document.getElementById('playPet')
                    const trainingPetButton = document.getElementById('training')

                    playPetButton.disabled = true;
                    trainingPetButton.disabled = true;

                    playPetButton.classList.add('bg-gray-400', 'cursor-not-allowed');
                    trainingPetButton.classList.add('bg-gray-400', 'cursor-not-allowed');

                    
                    console.log("Sin Conexion");


                }
            } catch (error) {
                console.error("Error en la petición:", error);
                localStorage.setItem("Conexion", JSON.stringify("Sin Conexion"));
            }
            location.reload();
        });
    }
});





    // Llamada a la API local (proxy)






// Función para hacer la petición GET y almacenar los datos
async function fetchAndStore(endpoint, storageKey) {
    try {
        const response = await fetch(endpoint, {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json' 
            }
        });

        if (!response.ok) {
            throw new Error(`Error en la petición: ${response.statusText}`);
        }

        const data = await response.json(); // Convierte la respuesta a JSON
        localStorage.setItem(storageKey, JSON.stringify(data)); // Guarda los datos en localStorage

        console.log("Datos guardados en localStorage correctamente.");
        return data; // Devuelve los datos
    } catch (error) {
        console.error("Error al obtener los datos:", error);
        return null; // Si hay error, retorna null
    }
}


