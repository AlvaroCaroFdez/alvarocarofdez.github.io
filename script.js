document.addEventListener('DOMContentLoaded', function () {
    // Selecciona todas las tarjetas y el header
    const cards = document.querySelectorAll('.card');
    const header = document.querySelector('header');

    // Función para mostrar las tarjetas con animación al hacer scroll
    function animateCards() {
        cards.forEach((card, index) => {
            const rect = card.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                card.style.opacity = 1;
                card.style.transform = 'translateY(0)';
                card.style.transitionDelay = `${index * 100}ms`; // Retardo para cada tarjeta
            }
        });
    }

    // Llama a la animación de tarjetas en el scroll
    window.addEventListener('scroll', animateCards);

    // Establece el estilo inicial de cada tarjeta
    cards.forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(20px)';
    });

    // Efecto ripple en el header
    header.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const size = Math.max(header.clientWidth, header.clientHeight);
        const x = e.clientX - header.offsetLeft - size / 2;
        const y = e.clientY - header.offsetTop - size / 2;

        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.classList.add('ripple');

        header.appendChild(ripple);

        // Elimina el efecto después de un tiempo
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});
