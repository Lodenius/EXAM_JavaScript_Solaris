const solisURL = 'https://majazocom.github.io/Data/solaris.json';
const planetsContainer = document.querySelector('.space-container');
const overlayEl = document.querySelector('.space-overlay');
const searchPlanet = document.querySelector('#input-search');

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
        planetEl.innerHTML = `<p>${planet.name}</p>`;
        
        planetsContainer.appendChild(planetEl);

        planetEl.addEventListener('click', () => {
            overlayOn(planet);
        });

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


searchPlanet.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        console.log('Ta mig till', event.target.value);
        let planetIndex = planets.findIndex(planet => planet.name.toLowerCase().includes(event.target.value.toLowerCase()));
        console.log(planetIndex);
        if (planetIndex > -1) {
            planets = planets[planetIndex];
            overlayOn();
        } else {
            alert('Jag finns inte i det här solsystemet!');
        }
    }
});



// searchPlanet.addEventListener('keyup', e => {
//     let search = e.target.value.toLowerCase();
//     // let filteredPlanet = planets.filter(planet => {
//     //     return planet.name.toLowerCase().includes(search);
//     // });
//     let filteredPlanet = planets.findIndex(planet => planet.name.toLowerCase().includes(e.target.value.toLowerCase()));
//     if (e.keyCode === 13) {
//         console.log('Ta mig till', e.target.value);
//         console.log(filteredPlanet);
//         if (filteredPlanet === search) {
//             planets = planets[filteredPlanet];
//             overlayOn();
//         } 
//         // else {
//         //     alert('Jag finns inte i det här solsystemet!');
//         // };
//     };
// });


// searchPlanet.addEventListener('keyup', function(input){
//     let indexOfPlanet = planets.findIndex(planet => planet.name.toLowerCase().includes(input.target.value.toLowerCase()));
//     if (input.keyCode === 13) {
//         console.log('Ta mig till', input.target.value);
//         console.log(indexOfPlanet);
//         // if (indexOfPlanet > -1) {
//         //     chosenPlanet = planets[indexOfPlanet];
//         //     overlayOn();
//         // } else {
//         //     alert('Jag finns inte i det här solsystemet!');
//         // };
//     };
// });

// searchPlanet.addEventListener('input', e => {
//     let value = e.target.value.toLowerCase();
//     planets.forEach(planet => {
//         let isVisible = planet.name.includes(value);
//         planet.element.classList.toggle('hide', !isVisible)
//     })

//     // console.log(planets);

// })

// searchPlanet.addEventListener('keyup', (e) => {
//     let search = e.target.value.toLowerCase();
//     let filteredPlanet = planets.filter(planet => {
//         return planet.name.toLowerCase().includes(search);
//     });
//     console.log(filteredPlanet);
// });


// searchPlanet.addEventListener('input', e => {
//     let value = e.target.value.toLowerCase()
//     let filteredPlanet = planets;
//     console.log(value);
//     filteredPlanet.forEach(planet => {
//         console.log(planet)
//         const isVisible = planet.element.classList.includes(value);
//         console.log(isVisible)
//         planet.classList.toggle("hide", !isVisible);

//     })
// })
