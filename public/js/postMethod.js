// Obtener el formulario y el modal
const feedForm = document.getElementById("feedForm");
const feedModal = document.getElementById("feedModal");
const closeFeedModalButton = document.getElementById("closePlayModal");


//FORMULARIO PARA ALIMENTAR EL MUÑECO
// Función para manejar el envío del formulario
feedForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevenir que el formulario se envíe de forma tradicional
    
    // Obtener los valores del formulario
    const playWith = document.getElementById("playWith").value;
    const petName = document.getElementById("petNameLabel").textContent;

    

    // Obtener los datos de mood y hunger desde el localStorage
    const storedPetData = JSON.parse(localStorage.getItem("Data"));

    // Verificar si los datos existen en el localStorage, y asignar valores por defecto si no
    const mood = storedPetData ? storedPetData.mood : null; 
    const hunger = storedPetData ? storedPetData.hunger : null; 

    // Crear el objeto con los datos del formulario
    const formData = {
        name: petName,
        food_value: playWith,
        mood: mood,
        hunger: hunger,
    };
    console.log(formData);
    
    try {
        // Enviar los datos a la API a través del proxy
        const response = await fetch("http://localhost:3000/proxy/pet/feed", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
    
        // Verificar si la respuesta es exitosa
        if (response.ok) {
            const responseData = await response.json();
            console.log("Resultado:", responseData);

            // Acceder al resultado dentro de 'result' que es lo que queremos
            const result = responseData.result;
            
            // Actualizar el localStorage con la nueva respuesta
            const updatedData = {
                ...storedPetData, // Mantener los datos anteriores
                hunger: result.hunger, // Actualizar los valores de hambre
                mood: result.mood,   // Actualizar los valores de ánimo
            };

            localStorage.setItem("petData", JSON.stringify(updatedData));
    
            // Mostrar un mensaje de éxito con el mensaje recibido
            alert(`${result.msj}`);
    
            // Cerrar el modal
            feedModal.classList.add("hidden");
        } else {
            // Si la respuesta no es exitosa, ver más detalles sobre la respuesta
            const errorResult = await response.json();
            console.error("Error al alimentar:", errorResult);
    
            // Verificar si hay detalles adicionales en la respuesta de error
            console.error("Detalles de la respuesta de error:", errorResult);
    
            alert(`Error: ${errorResult.msj || "No se pudo procesar la solicitud."}`);
        }
    } catch (error) {
        console.error("Error al hacer la solicitud:", error);
        alert("Hubo un problema con la solicitud.");
    }
});
