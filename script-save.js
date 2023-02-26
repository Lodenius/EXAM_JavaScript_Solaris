/////////////////////////////// SÖK FUNGERAR MEN EJ NAV
const solisURL = 'https://majazocom.github.io/Data/solaris.json';
const planetsContainer = document.querySelector('.space-container');
const overlayEl = document.querySelector('.space-overlay');
const searchPlanet = document.querySelector('#input-search');

let planets = [];
let body = [];
let planetId;

// Fetcha solsystemet
async function getSolarSystem() {
    let solarSystem = await fetch(solisURL);
    planets = await solarSystem.json();
    console.log(planets);
    renderPlanetsToUI();
};

// Rendera ut planeterna i UI
function renderPlanetsToUI(){
    planets.forEach(planet => {
        let planetEl = document.createElement('div');
        planetEl.classList.add('planet', `planet-${planet.id}`);
        planetEl.setAttribute('id', planet.id);
        
        planetsContainer.appendChild(planetEl);
        
        planetEl.addEventListener('click', () => { // Klick funktion för att öppna overlay
            // console.log(planet);
            body = planet;
            overlayOn();
        });
    });
};
getSolarSystem();

// Skapa innehållet i overlay
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
            
            <div class="divider"></div>
            
            <section class="navigate-planets">
                <button class="previous-planet navigate-btn"> ⇠ </button>
                <button class="next-planet navigate-btn"> ⇢ </button>
            </section>
            
            </section>
        </section>
            `;
            
    // Stäng overlay när knappen trycks
    document.querySelector('.close-overlay').addEventListener('click', () => { 
        overlayEl.style.display = 'none';
    });
      
    // // Navigation
    planetId = planets.findIndex(p => p.id === body.id);

};

// Föregående planet
document.querySelector('.previous-planet').addEventListener('click', () => {
    console.log(planetId - 1);
    if (planetId - 1 > -1) {
        overlayOn(planets[planetId - 1]);
    } else {
        alert('Det finns inga fler himlakroppar i det här solsystemet! 🪐');
        overlayEl.style.display = 'none';
    };
});

// // Nästa planet
document.querySelector('.next-planet').addEventListener('click', () => {
    console.log(planetId + 1);
    if (planetId + 1 < 9) {
        overlayOn(planets[planetId + 1]);
    } else {
        alert('Det finns inga fler himlakroppar i det här solsystemet! 🪐');
        overlayEl.style.display = 'none';
    };
});

// Sökfunktion
searchPlanet.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        // console.log('Ta mig till', event.target.value);
        let planetIndex = planets.findIndex(planet => planet.name.toLowerCase().includes(event.target.value.toLowerCase()));
        // console.log(planetIndex);
        if (planetIndex > -1) {
            body = planets[planetIndex];
            overlayOn();
        } else {
            alert(event.target.value + ' finns inte i det här solsystemet! 🪐');
        }
    }
});














/////////////////////////////// NAV FUNGERAR MEN EJ SÖK

// const solisURL = 'https://majazocom.github.io/Data/solaris.json';
// const planetsContainer = document.querySelector('.space-container');
// const overlayEl = document.querySelector('.space-overlay');
// const searchPlanet = document.querySelector('#input-search');

// let planets = [];
// let body = [];
// let planetId;

// // Fetcha solsystemet
// async function getSolarSystem() {
//     let solarSystem = await fetch(solisURL);
//     planets = await solarSystem.json();
//     console.log(planets);
//     renderPlanetsToUI();
// };

// // Rendera ut planeterna i UI
// function renderPlanetsToUI(){
//     planets.forEach(planet => {
//         let planetEl = document.createElement('div');
//         planetEl.classList.add('planet', `planet-${planet.id}`);
//         planetEl.setAttribute('id', planet.id);
//         planetsContainer.appendChild(planetEl);
        
//         planetEl.addEventListener('click', () => { // Klick funktion för att öppna overlay
//             // console.log(planet);
//             body = planet;
//             overlayOn(body);
//         });
//     });
// };
// getSolarSystem();

// // Skapa innehållet i overlay
// function overlayOn(body) {
    
//     overlayEl.style.display = 'block';
//     overlayEl.innerHTML = `
//         <section class="overlay-container">
//             <section class="planet-card">
//                 <button class="close-overlay">Tillbaka ut i rymden 🚀</button>
//                 <h3>${body.name}</h3>
//                 <h2>${body.latinName}</h2>
//                 <p class="desc">${body.desc}</p>
        
//             <div class="divider"></div>

//             <section class="planet-card__info">
//                 <section>
//                     <p class="bold">OMKRETS</p>
//                     <p>${body.circumference} km</p>
//                 </section>
        
//                 <section>
//                     <p class="bold">KM FRÅN SOLEN</p>
//                     <p>${body.distance} km</p>
//                 </section>
        
//                 <section>
//                     <p class="bold">MAX TEMPERATUR</p>
//                     <p>${body.temp.day} °C </p>
//                 </section>
        
//                 <section>
//                     <p class="bold">MIN TEMPERATUR</p>
//                     <p>${body.temp.night}°C </p>
//                 </section>
//             </section>
        
//             <div class="divider"></div>
            
//             <section>
//                 <p class="bold">MÅNAR</p>
//                 <p>${body.moons.map((moon) => `${moon}`).join("  |  ")}</p>
//             </section>
            
//             <div class="divider"></div>
            
//             <section class="navigate-planets">
//                 <button class="previous-planet navigate-btn"> ⇠ </button>
//                 <button class="next-planet navigate-btn"> ⇢ </button>
//             </section>
            
//             </section>
//         </section>
//             `;
            
//     // Stäng overlay när knappen trycks
//     document.querySelector('.close-overlay').addEventListener('click', () => { 
//         overlayEl.style.display = 'none';
//     });
      
//     // Navigation
//     planetId = planets.findIndex(p => p.id === body.id);

//     // Föregående planet
//     document.querySelector('.previous-planet').addEventListener('click', () => {
//         console.log(planetId - 1);
//         if (planetId - 1 > -1) {
//             overlayOn(planets[planetId - 1]);
//         } else {
//             alert('Det finns inga fler himlakroppar i det här solsystemet! 🪐');
//             overlayEl.style.display = 'none';
//         };
//     });
    
//     // Nästa planet
//     document.querySelector('.next-planet').addEventListener('click', () => {
//         console.log(planetId + 1);
//         if (planetId + 1 < 9) {
//             overlayOn(planets[planetId + 1]);
//         } else {
//             alert('Det finns inga fler himlakroppar i det här solsystemet! 🪐');
//             overlayEl.style.display = 'none';
//         };
//     });
// };

// // Sökfunktion
// searchPlanet.addEventListener("keyup", function(event) {
//     if (event.keyCode === 13) {
//         // console.log('Ta mig till', event.target.value);
//         let planetIndex = planets.findIndex(planet => planet.name.toLowerCase().includes(event.target.value.toLowerCase()));
//         // console.log(planetIndex);
//         if (planetIndex > -1) {
//             body = planets[planetIndex];
//             overlayOn();
//         } else {
//             alert(event.target.value + ' finns inte i det här solsystemet! 🪐');
//         }
//     }
// });
