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
    // console.log(planets);
    renderPlanetsToUI();
};

// Rendera ut planeterna i UI
function renderPlanetsToUI(){
    planets.forEach(planet => {
        let planetEl = document.createElement('div');
        planetEl.classList.add('planet', `planet-${planet.id}`);
        planetsContainer.appendChild(planetEl);
        
        // Klick funktion för att öppna overlay
        planetEl.addEventListener('click', () => { 
            body = planet;
            overlayOn();
        });
    });
};
getSolarSystem();

// Skapa innehållet i overlay
function overlayOn() {
    overlayEl.style.display = 'block'; // Så overlay syns
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
            
    // Stäng overlay när stäng-knappen trycks
    document.querySelector('.close-overlay').addEventListener('click', () => { 
        overlayEl.style.display = 'none'; // display går tillbaka till none
    });
      
    // Navigation på overlay-vy
    let planetId = body.id;

    // Föregående planet
    document.querySelector('.previous-planet').addEventListener('click', () => {
        // console.log(body.id - 1);
        planetId = planetId - 1;
        planets.find(planet => {
            if (planet.id === planetId) {
                body = planet;
                overlayOn()
            } else if (planetId === - 1) { 
                // om planetens id är -1 så försvinner overlay
                overlayEl.style.display = 'none';
                // alert('Det finns inga fler himlakroppar i det här solsystemet! 🪐');
            };
        });
    });
    
    // Nästa planet
    document.querySelector('.next-planet').addEventListener('click', () => {
        // console.log(body.id + 1);
        planetId = planetId + 1;
        planets.find(planet => {
            if (planet.id === planetId) {
                body = planet;
                overlayOn()
            } else if (planetId === 9) { 
                // om planetens id är 9 så försvinner overlay
                overlayEl.style.display = 'none';
                // alert('Det finns inga fler himlakroppar i det här solsystemet! 🪐');
            };
        });
    });
};

// Sökfunktion
searchPlanet.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) { // keyCode 13 är enter knappen, när enter trycks så går koden nedan
        // console.log('Ta mig till', event.target.value);
        let planetIndex = planets.findIndex(planet => 
            planet.name.toLowerCase().includes(event.target.value.toLowerCase()));
        // console.log(planetIndex);
        if (planetIndex > -1) {
            // om det som skrivits in matchar namnet på någon himlakropp så går koden nedan
            body = planets[planetIndex];
            overlayOn();
        } else {
            // om det som skrivits in inte matchar namnet på någon himlakropp så går koden nedan
            alert(event.target.value + ' finns inte i det här solsystemet! 🪐');
        };
    };
});


//////////////////
/*
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
      
    // Navigation på overlayvy
    // Föregående planet
    document.querySelector('.previous-planet').addEventListener('click', () => {
        // console.log(body.id - 1);
        let planetId = body.id;
        planetId = planetId - 1;

        planets.find(planet => {
            if (planet.id === planetId) {
                body = planet;
                overlayOn()
            } else if (planetId === - 1) {
                overlayEl.style.display = 'none';
                // alert('Det finns inga fler himlakroppar i det här solsystemet! 🪐');
            };
        });
    });
    
    // Nästa planet
    document.querySelector('.next-planet').addEventListener('click', () => {
        // console.log(body.id + 1);
        let planetId = body.id;
        planetId = planetId + 1;

        planets.find(planet => {
            if (planet.id === planetId) {
                body = planet;
                overlayOn()
            } else if (planetId === 9) {
                overlayEl.style.display = 'none';
                // alert('Det finns inga fler himlakroppar i det här solsystemet! 🪐');
            };
        });
    });
};


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
*/