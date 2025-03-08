document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('feedPet').addEventListener('click', () => openModal('feedModal'));
    document.getElementById('playPet').addEventListener('click', () => openModal('playModal'));
    document.getElementById('sleepPet').addEventListener('click', () => openModal('sleepModal'));

    document.getElementById('closeFeedModal').addEventListener('click', () => closeModal('feedModal'));
    document.getElementById('closePlayModal').addEventListener('click', () => closeModal('playModal'));
    document.getElementById('closeSleepModal').addEventListener('click', () => closeModal('sleepModal'));
});


// Cerrar modal al hacer clic fuera de él
document.querySelectorAll('.hidden.fixed').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal(modal.id);
    });
});



// Función para abrir modal
function openModal(modalId) {
    document.getElementById(modalId).classList.remove('hidden');
}

// Función para cerrar modal
function closeModal(modalId) {
    document.getElementById(modalId).classList.add('hidden');
}