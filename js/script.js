function switchTab(event, tabId) {
    document.querySelectorAll('.tab-content').forEach(function (tab) {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.nav-btn').forEach(function (btn) {
        btn.classList.remove('active');
    });
    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');

    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    }

    localStorage.setItem('activeTab', tabId);
}

window.onload = function() {
    const savedTabId = localStorage.getItem('activeTab');
    
    if (savedTabId && document.getElementById(savedTabId)) {
        const activeBtn = Array.from(document.querySelectorAll('.nav-btn')).find(btn => {
            return btn.getAttribute('onclick') && btn.getAttribute('onclick').includes(savedTabId);
        });

        switchTab(null, savedTabId);

        if (activeBtn) {
            activeBtn.classList.add('active');
        }
    } else {

    }
};

const spinButton = document.getElementById("spinButton");
const randomPhrase = document.getElementById("randomPhrase");
const spinStatus = document.getElementById("spinStatus");

const frasesSobreMi = [
    "Programar es como las matemáticas, pero con más café. ☕",
    "Me encanta descubrir cómo funcionan las cosas. 🔍",
    "Programar es mi forma de convertir ideas locas en realidad. 💻",
    "Me gusta aprender algo nuevo cada día. 🚀",
    "La tecnología y la creatividad son mi combinación favorita. 💜",
    "Me encantan los retos que me hacen pensar. 🧠",
    "Sueño con convertirme en ingeniera informática. 👩‍💻",
    "A menudo tengo un proyecto esperando a ser creado. ⚡",
];

let girando = false;
let ultimaFrase = randomPhrase.textContent.trim();

function elegirFrase() {
    const opciones = frasesSobreMi.filter(
        frase => frase !== ultimaFrase
    );

    return opciones[Math.floor(Math.random() * opciones.length)];
}

function girarFrases() {
    if (girando) return;

    girando = true;
    spinButton.disabled = true;
    spinButton.textContent = "Girando...";
    spinStatus.textContent = "Buscando una frase...";
    randomPhrase.classList.remove("is-winner");
    randomPhrase.classList.add("is-spinning");

    const duracion = 2500;
    const inicio = performance.now();
    let siguienteCambio = 0;

    function animar(ahora) {
        const transcurrido = ahora - inicio;
        const progreso = Math.min(transcurrido / duracion, 1);

        // La ruleta cambia rápido al principio y frena poco a poco.
        const intervalo = 45 + Math.pow(progreso, 3) * 350;

        if (ahora >= siguienteCambio) {
            randomPhrase.textContent = elegirFrase();
            siguienteCambio = ahora + intervalo;
        }

        if (progreso < 1) {
            requestAnimationFrame(animar);
        } else {
            ultimaFrase = elegirFrase();
            randomPhrase.textContent = ultimaFrase;

            randomPhrase.classList.remove("is-spinning");

            // Reinicia la animación de la frase ganadora.
            void randomPhrase.offsetWidth;
            randomPhrase.classList.add("is-winner");

            spinStatus.textContent = "¡Esta es tu frase! 🎉";
            spinButton.textContent = "Girar otra vez ↻";
            spinButton.disabled = false;
            girando = false;
        }
    }

    requestAnimationFrame(animar);
}

spinButton.addEventListener("click", girarFrases);