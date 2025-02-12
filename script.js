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
        showSuccessMessage();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Lo sentimos, hubo un error al enviar el formulario. Por favor, inténtalo de nuevo.');
    });
});

// Success message handling
function showSuccessMessage() {
    const successMessage = document.querySelector('.form-success-message');
    successMessage.classList.remove('hidden');
    setTimeout(() => {
        successMessage.classList.add('visible');
    }, 10);
    
    // Prevent page scrolling when modal is open
    document.body.style.overflow = 'hidden';
}

function hideSuccessMessage() {
    const successMessage = document.querySelector('.form-success-message');
    successMessage.classList.remove('visible');
    setTimeout(() => {
        successMessage.classList.add('hidden');
        // Restore page scrolling
        document.body.style.overflow = '';
    }, 300);
}

// Close success message when clicking outside
document.querySelector('.form-success-message').addEventListener('click', function(event) {
    if (event.target === this) {
        hideSuccessMessage();
    }
}); 