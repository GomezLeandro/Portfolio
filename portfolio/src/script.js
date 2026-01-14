function changeThemeColor() {
            const hues = [180, 200, 220, 280, 150]; 
            const randomHue = hues[Math.floor(Math.random() * hues.length)];
            const newPrimary = `hsl(${randomHue}, 100%, 50%)`;
            
            document.documentElement.style.setProperty('--primary', newPrimary);
        }

        setInterval(changeThemeColor, 4000);
        window.onload = changeThemeColor;


        

        // Swiper Initialization for carousel
document.addEventListener('DOMContentLoaded', () => {
    const swiper = new Swiper(".mySwiper", {
        loop: true,
        grabCursor: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        touchEventsTarget: 'container',
        threshold: 5,
    });
});