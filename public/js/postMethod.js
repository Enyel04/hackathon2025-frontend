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
    const playMood = 5
    const playHunger = 5
    const petName = document.getElementById("petNameLabel").value;

    // Crear el objeto con los datos del formulario
    const formData = {
        name: petName,
        food_value: playWith,
        mood: playMood,
        hunger: playHunger,
    };
    console.log(formData);
    

    try {
        // Enviar los datos a la API a través del proxy
        const response = await fetch("https://hackaton.corpoeureka.net/pet/feed", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        // Verificar si la respuesta es exitosa
        if (response.ok) {
            const result = await response.json();
            console.log("Resultado:", result);

            // Actualizar el localStorage con la respuesta
            localStorage.setItem("petData", JSON.stringify(result));

            // Mostrar un mensaje de éxito en el modal
            alert(`Alimentación exitosa. ${result.msj}`);

            // Cerrar el modal
            feedModal.classList.add("hidden");
        } else {
            const errorResult = await response.json();
            console.error("Error al alimentar:", errorResult);
            alert(`Error: ${errorResult.msj}`);
        }
    } catch (error) {
        console.error("Error al hacer la solicitud:", error);
       
    }
});
