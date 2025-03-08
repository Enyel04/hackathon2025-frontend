// Función para obtener los datos de la mascota desde localStorage
function getPetData() {
  // Recupera el objeto JSON almacenado en localStorage y lo convierte en un objeto JavaScript
  return JSON.parse(localStorage.getItem('Data'));
}

// Función para guardar los datos actualizados de la mascota en localStorage
function savePetData(data) {
  // Convierte el objeto de datos de la mascota a formato JSON y lo guarda en localStorage
  localStorage.setItem('Data', JSON.stringify(data));
}

// Función que actualiza los datos de la mascota cada minuto
function updatePetData() {
  // Recupera los datos actuales de la mascota
  let petData = getPetData();

  // Comprobamos si el hambre es mayor que 0
  if (petData.hunger > 0) {
    // Si tiene hambre, reducimos la cantidad en una cantidad aleatoria entre 5 y 25
    const randomDecrease = Math.floor(Math.random() * (25 - 5 + 1)) + 5;
    petData.hunger -= randomDecrease;

    // Aseguramos que el hambre no sea menor que 0
    if (petData.hunger < 0) {
      petData.hunger = 0;
    }
  } else {
    // Si el hambre es 0, la mascota comienza a perder vida
    petData.health -= 1;

    // Aseguramos que la vida no sea menor que 0
    if (petData.health < 0) {
      petData.health = 0;
    }
  }

  // Guardamos los datos actualizados de la mascota
  savePetData(petData);
}

// Llamamos a la función de actualización cada 60 segundos (1 minuto)
setInterval(updatePetData, 60000);

// Para ver cómo cambian los datos de la mascota, mostramos el estado cada 60 segundos
setInterval(() => {
  console.log(getPetData());
  location.reload();
  
}, 60000);