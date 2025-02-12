// Form submission handling
document.querySelector('.contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        // Clear form
        form.reset();
        // Show success message
        alert('¡Gracias! Tu mensaje ha sido enviado correctamente.');
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Lo sentimos, hubo un error al enviar el formulario. Por favor, inténtalo de nuevo.');
    });
}); 