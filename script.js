document.addEventListener('DOMContentLoaded', function() {
    const pressButton = document.getElementById('pressButton');
    const envelopeContainer = document.getElementById('envelopeContainer');
    const openButton = document.getElementById('openButton');
    const closeButton = document.getElementById('closeButton');
    const notebookContainer = document.getElementById('notebookContainer');
    const cover = document.getElementById('cover');
    const openNotebookButton = document.getElementById('openNotebookButton');
    const pagesContainer = document.getElementById('pagesContainer');
    const prevPageButton = document.getElementById('prevPageButton');
    const nextPageButton = document.getElementById('nextPageButton');
    const messageFinal = document.getElementById('messageFinal');
    const newBackground = document.getElementById('newBackground');
    

    // Función para crear corazones
    function createHeart() {
        let heart = document.createElement('div');
        heart.className = 'heart';
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.bottom = `-10%`;
        document.body.appendChild(heart);
        setTimeout(() => {
            heart.remove();
        }, 6000); // Duración de la animación del corazón
    }

    // Generar corazones continuamente con un intervalo ajustado
    setInterval(createHeart, 200); // Intervalo ajustado para generar nuevos corazones más frecuentemente

    // Mostrar el sobre y ocultar el botón Presióname
    pressButton.addEventListener('click', function() {
        pressButton.style.display = 'none';
        envelopeContainer.style.display = 'block';
    });

    // Abrir el sobre y mostrar el fondo beige
    openButton.addEventListener('click', function() {
        newBackground.style.display = 'block';
        setTimeout(() => {
            newBackground.style.transform = 'scaleY(1)';
        }, 0);
        notebookContainer.style.display = 'block';
    });

    // Cerrar el sobre y mostrar el mensaje final con cohetes
    closeButton.addEventListener('click', function() {
        envelopeContainer.style.display = 'none';
        newBackground.style.transform = 'scaleY(0)';
        setTimeout(() => {
            messageFinal.style.display = 'block';
            // Crear cohetes en forma de abanico
            createFanOfRockets();
        }, 500); // Tiempo para mostrar el mensaje final
    });

    // Función para crear cohetes en forma de abanico desde el centro
    function createFanOfRockets() {
        const numberOfRockets = 10; // Número de cohetes
        const halfRockets = numberOfRockets / 2; // Número de cohetes en cada dirección

        for (let i = 0; i < numberOfRockets; i++) {
            let rocket = document.createElement('div');
            rocket.className = 'rocket';
            
            // Posicionar los cohetes
            const angle = (i < halfRockets) ? (-90 - (90 / (halfRockets - 1)) * i) : (-90 + (90 / (halfRockets - 1)) * (i - halfRockets)); // Ángulo para separación
            const radians = angle * (Math.PI / 180); // Convierte a radianes
            const distance = 150; // Distancia máxima en dirección horizontal
            const y = Math.sin(radians) * distance; // Posición vertical
            const x = Math.cos(radians) * distance; // Posición horizontal
            
            rocket.style.left = `50%`;
            rocket.style.bottom = `0px`; // Inicia desde la parte inferior

            document.body.appendChild(rocket);

            // Animar los cohetes
            rocket.animate([
                { opacity: 1, transform: `translateY(0) translateX(0)` },
                { opacity: 1, transform: `translateY(-100vh) translateX(${x}px)` }
            ], {
                duration: 2000,
                easing: 'ease-out',
                fill: 'forwards'
            });

            // Eliminar el cohete del DOM después de la animación
            setTimeout(() => {
                rocket.remove();
                // Crear confeti después de que el cohete se haya ido
                createConfetti();
            }, 2000);
        }
    }

    // Función para crear confeti
    function createConfetti() {
        const numberOfConfetti = 100; // Número total de piezas de confeti
        const container = document.getElementById('confettiContainer');
    
        for (let i = 0; i < numberOfConfetti; i++) {
            let confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 60%)`; // Color aleatorio
            confetti.style.left = `${Math.random() * 100}vw`;
            confetti.style.top = `${Math.random() * 100}vh`;
            container.appendChild(confetti);
    
            // Añadir animación de confeti
            confetti.animate([
                { opacity: 1, transform: `translateY(-100vh) rotate(0deg)` },
                { opacity: 1, transform: `translateY(100vh) rotate(360deg)` }
            ], {
                duration: 8000, // Duración más lenta
                easing: 'ease-out',
                fill: 'forwards'
            });
    
            // Eliminar el confeti del DOM después de la animación
            setTimeout(() => {
                confetti.remove();
            }, 8000); // Asegúrate de que se elimine después de la animación
        }
    }

    // Abrir la libreta y mostrar las páginas
    openNotebookButton.addEventListener('click', function() {
        cover.style.display = 'none';
        pagesContainer.style.display = 'block';
    });

    // Navegar entre páginas
    let currentPage = 1;
    const totalPages = 6;

    function updatePage() {
        document.querySelectorAll('.page').forEach((page, index) => {
            page.style.display = (index + 1 === currentPage) ? 'flex' : 'none';
        });
    }

    prevPageButton.addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            updatePage();
        }
    });

    nextPageButton.addEventListener('click', function() {
        if (currentPage < totalPages) {
            currentPage++;
            updatePage();
        }
        if (currentPage === totalPages) {
            nextPageButton.textContent = 'Terminar';
            nextPageButton.addEventListener('click', function() {
                // Desaparecer la libreta
                notebookContainer.style.display = 'none';
                // Asegúrate de que el sobre esté oculto
                envelopeContainer.style.display = 'none';

                // Mostrar el mensaje final
                messageFinal.style.display = 'block';

                // Crear cohetes en forma de abanico
                createFanOfRockets();
            });
        }
    });

    // Inicializar la primera página
    updatePage();
});
 // Reproducir música al hacer clic en cualquier parte de la pantalla
 document.addEventListener('click', function() {
    if (backgroundMusic.paused) {
        backgroundMusic.play();
    }
});
