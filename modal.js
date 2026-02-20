// Modal de Contacto - Script sin librerías adicionales
(function () {
    // Elementos del DOM
    const contactBtn = document.getElementById('contactBtn');
    const contactModal = document.getElementById('contactModal');
    const contactOverlay = document.getElementById('contactOverlay');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const cancelModalBtn = document.getElementById('cancelModalBtn');
    const contactForm = document.getElementById('contactForm');
    const messageContainer = document.getElementById('messageContainer');

    // API endpoint
    const API_URL = 'https://corsproxy.io/?url=https://diane-domesticable-eliz.ngrok-free.dev/enviar';

    // Funciones de control del modal
    function openModal() {
        contactModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Prevenir scroll
        resetMessages(); // Limpiar mensajes previos
    }

    function closeModal() {
        contactModal.classList.add('hidden');
        document.body.style.overflow = 'auto'; // Permitir scroll
        contactForm.reset(); // Limpiar formulario
        resetMessages(); // Limpiar mensajes
    }

    // Mostrar mensaje de éxito
    function showSuccessMessage(message) {
        messageContainer.className = 'block mb-4 p-3 rounded-lg text-sm font-semibold bg-emerald-900/40 border border-emerald-700/60 text-emerald-300';
        messageContainer.textContent = message || '✓ ¡Mensaje enviado exitosamente!';
    }

    // Mostrar mensaje de error
    function showErrorMessage(message) {
        messageContainer.className = 'block mb-4 p-3 rounded-lg text-sm font-semibold bg-rose-900/40 border border-rose-700/60 text-rose-300';
        messageContainer.textContent = '✕ ' + (message || 'Error al enviar el mensaje. Intenta de nuevo.');
    }

    // Limpiar mensajes
    function resetMessages() {
        messageContainer.className = 'hidden mb-4 p-3 rounded-lg text-sm font-semibold transition-all';
        messageContainer.textContent = '';
    }

    // Event listeners
    if (contactBtn) {
        contactBtn.addEventListener('click', openModal);
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    if (cancelModalBtn) {
        cancelModalBtn.addEventListener('click', closeModal);
    }

    // Cerrar al hacer clic en el overlay
    if (contactOverlay) {
        contactOverlay.addEventListener('click', closeModal);
    }

    // Cerrar con tecla Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && !contactModal.classList.contains('hidden')) {
            closeModal();
        }
    });

    // Manejar envío del formulario
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Resetear mensajes previos
            resetMessages();

            // Obtener valores del formulario
            const nombre = document.getElementById('name').value.trim();
            const correo = document.getElementById('email').value.trim();
            const asunto = document.getElementById('subject').value.trim();

            // Validación básica
            if (!nombre || !correo || !asunto) {
                showErrorMessage('Por favor completa todos los campos.');
                return;
            }

            // Crear objeto de datos
            const datosFormulario = {
                nombre: nombre,
                correo: correo,
                asunto: asunto
            };

            // Enviar datos mediante fetch
            fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'true' // Encabezado para evitar advertencia de ngrok
                },
                body: JSON.stringify(datosFormulario)
            })
                .then(response => {
                    // Verificar si la respuesta es exitosa
                    if (!response.ok) {
                        throw new Error('Error: ' + response.status);
                    }
                    return response.json();
                })
                .then(data => {
                    // Éxito
                    //console.log('Respuesta del servidor:', data);
                    showSuccessMessage('¡Mensaje enviado exitosamente!');
                    contactForm.reset();
                    
                    // Cerrar modal después de 2 segundos
                    setTimeout(closeModal, 2000);
                })
                .catch(error => {
                    // Error
                    console.error('Error al enviar:', error);
                    showErrorMessage(error.message || 'Error al enviar el mensaje. Por favor intenta de nuevo.');
                });
        });
    }
})();
