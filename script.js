const solisURL = 'https://majazocom.github.io/Data/solaris.json';
const planetsContainer = document.querySelector('.space-container');
const overlayEl = document.querySelector('.space-overlay');
let planets = [];

async function getSolarSystem() {
    let resp = await fetch(solisURL);
    planets = await resp.json();
    console.log(planets);
    renderPlanetsToUI();
};

function renderPlanetsToUI(){
    planets.forEach(planet => {
        let planetEl = document.createElement('div');
        planetEl.classList.add('planet', `planet-${planet.id}`);
        planetEl.setAttribute('id', planet.id);
        
        planetsContainer.appendChild(planetEl);

        planetEl.addEventListener('click', () => {
            overlayOn(planet);
        });
        planet.HTML = planetEl
    });
};
getSolarSystem();

function overlayOn(planet) {
    overlayEl.style.display = 'block';
    overlayEl.innerHTML = `
    <section class="overlay-container">
    <section class="planet-card">
        <button class="close-overlay">Tillbaka ut i rymden 🚀</button>
            <h3>${planet.name}</h3>
            <h2>${planet.latinName}</h2>
            <p class="desc">${planet.desc}</p>

            <div class="divider"></div>

            <section class="planet-card__info">
                <section>
                    <p class="bold">OMKRETS</p>
                    <p>${planet.circumference} km</p>
                </section>

                <section>
                    <p class="bold">KM FRÅN SOLEN</p>
                    <p>${planet.distance} km</p>
                </section>

                <section>
                    <p class="bold">MAX TEMPERATUR</p>
                    <p>${planet.temp.day} °C </p>
                </section>

                <section>
                    <p class="bold">MIN TEMPERATUR</p>
                    <p>${planet.temp.night}°C </p>
                </section>
            </section>

            <div class="divider"></div>

            <section>
                <p class="bold">MÅNAR</p>
                <p>${planet.moons.map((moon) => `${moon}`).join("  |  ")}</p>
            </section>

            <div class="divider"></div>

            <section class="navigate-planets">
                <p class="backwards"> ⇠ (kolla om får till)</p>
                <p class="forwards">(kolla om får till) ⇢ </p>
            </section>
        </section>
    </section>
    `;

    document.querySelector('.close-overlay').addEventListener('click', () => {
        overlayEl.style.display = 'none';
    });
};

// function lookThroughSpace(planets) {
//     let input, filter, i, txtValue;
//     input = document.getElementById('search');
//     filter = input.value.toUpperCase();
//     for (i = 0; i <planets.lenght; i++) {

//     }
    
// }
