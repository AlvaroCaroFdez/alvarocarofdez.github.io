document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.querySelector('.menu-icon');
    const menu = document.querySelector('.menu');

    menuIcon.addEventListener('click', function() {
        menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    });

    document.addEventListener('click', function(event) {
        if (!menu.contains(event.target) && !menuIcon.contains(event.target)) {
            menu.style.display = 'none';
        }
    });

    const unitCards = document.querySelectorAll('.unit-card');
    unitCards.forEach(card => {
        const popup = card.querySelector('.projects-popup');
        card.addEventListener('mouseenter', () => {
            popup.style.display = 'block';
        });
        card.addEventListener('mouseleave', () => {
            popup.style.display = 'none';
        });
    });
});

