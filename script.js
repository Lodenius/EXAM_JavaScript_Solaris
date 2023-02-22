const solisURL = 'https://majazocom.github.io/Data/solaris.json';
const planetsContainer = document.querySelector('.space-container');
const overlayEl = document.querySelector('.space-overlay');
const searchPlanet = document.querySelector('#input-search');

let planets = [];
let body = [];

async function getSolarSystem() {
    let solarSystem = await fetch(solisURL);
    planets = await solarSystem.json();
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
            console.log(planet);
            body = planet;
            overlayOn();
        });
    });
};
getSolarSystem();

function overlayOn() {
    overlayEl.style.display = 'block';
    overlayEl.innerHTML = `
    <section class="overlay-container">
    <section class="planet-card">
        <button class="close-overlay">Tillbaka ut i rymden 🚀</button>
            <h3>${body.name}</h3>
            <h2>${body.latinName}</h2>
            <p class="desc">${body.desc}</p>

            <div class="divider"></div>

            <section class="planet-card__info">
                <section>
                    <p class="bold">OMKRETS</p>
                    <p>${body.circumference} km</p>
                </section>

                <section>
                    <p class="bold">KM FRÅN SOLEN</p>
                    <p>${body.distance} km</p>
                </section>

                <section>
                    <p class="bold">MAX TEMPERATUR</p>
                    <p>${body.temp.day} °C </p>
                </section>

                <section>
                    <p class="bold">MIN TEMPERATUR</p>
                    <p>${body.temp.night}°C </p>
                </section>
            </section>

            <div class="divider"></div>

            <section>
                <p class="bold">MÅNAR</p>
                <p>${body.moons.map((moon) => `${moon}`).join("  |  ")}</p>
            </section>
        </section>
    </section>
    `;

    document.querySelector('.close-overlay').addEventListener('click', () => {
        overlayEl.style.display = 'none';
    });
};

searchPlanet.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        // console.log('Ta mig till', event.target.value);
        let planetIndex = planets.findIndex(planet => planet.name.toLowerCase().includes(event.target.value.toLowerCase()));
        // console.log(planetIndex);
        if (planetIndex > -1) {
            body = planets[planetIndex];
            overlayOn();
        } else {
            alert('Jag finns inte i det här solsystemet! 🪐');
        }
    }
});


// const solisURL = 'https://majazocom.github.io/Data/solaris.json';
// const planetsContainer = document.querySelector('.space-container');
// const overlayEl = document.querySelector('.space-overlay');
// const searchPlanet = document.querySelector('#input-search');

// let planets = [];

// async function getSolarSystem() {
//     let resp = await fetch(solisURL);
//     planets = await resp.json();
//     console.log(planets);
//     renderPlanetsToUI();
// };

// function renderPlanetsToUI(){
//     planets.forEach(planet => {
//         let planetEl = document.createElement('div');
//         planetEl.classList.add('planet', `planet-${planet.id}`);
//         planetEl.setAttribute('id', planet.id);
//         planetEl.innerHTML = `<p>${planet.name}</p>`;
        
//         planetsContainer.appendChild(planetEl);
        
//         planetEl.addEventListener('click', () => {
//             console.log(planet);
//             overlayOn(planet);
//         });
//     });
// };
// getSolarSystem();

// function overlayOn(planet) {
//     overlayEl.style.display = 'block';
//     overlayEl.innerHTML = `
//     <section class="overlay-container">
//     <section class="planet-card">
//         <button class="close-overlay">Tillbaka ut i rymden 🚀</button>
//             <h3>${planet.name}</h3>
//             <h2>${planet.latinName}</h2>
//             <p class="desc">${planet.desc}</p>

//             <div class="divider"></div>

//             <section class="planet-card__info">
//                 <section>
//                     <p class="bold">OMKRETS</p>
//                     <p>${planet.circumference} km</p>
//                 </section>

//                 <section>
//                     <p class="bold">KM FRÅN SOLEN</p>
//                     <p>${planet.distance} km</p>
//                 </section>

//                 <section>
//                     <p class="bold">MAX TEMPERATUR</p>
//                     <p>${planet.temp.day} °C </p>
//                 </section>

//                 <section>
//                     <p class="bold">MIN TEMPERATUR</p>
//                     <p>${planet.temp.night}°C </p>
//                 </section>
//             </section>

//             <div class="divider"></div>

//             <section>
//                 <p class="bold">MÅNAR</p>
//                 <p>${planet.moons.map((moon) => `${moon}`).join("  |  ")}</p>
//             </section>
//         </section>
//     </section>
//     `;

//     document.querySelector('.close-overlay').addEventListener('click', () => {
//         overlayEl.style.display = 'none';
//     });
// };

// searchPlanet.addEventListener("keyup", function(event) {
//     event.preventDefault();
//     if (event.keyCode === 13) {
//         console.log('Ta mig till', event.target.value);
//         let planetIndex = planets.findIndex(planet => planet.name.toLowerCase().includes(event.target.value.toLowerCase()));
//         console.log(planetIndex);
//         if (planetIndex > -1) {
//             planet = planets[planetIndex];
//             overlayOn();
//         } else {
//             alert('Jag finns inte i det här solsystemet!');
//         }
//     }
// });