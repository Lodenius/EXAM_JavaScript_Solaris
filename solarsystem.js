// vad ska göras
// startsida som visar alla planeter
// en sökfunktion som tar dig till planeten du söker på - en alert om det är fel i sök
// en infosida för varje planet där info finns
// indosidan ska kommas åt från både start och sök



const solisURL = 'https://majazocom.github.io/Data/solaris.json';
const planetsContainer = document.querySelector('.planets-container');

async function getSolarSystem() {
    let solarSystem = await fetch(solisURL);
    let data = await solarSystem.json();
    // console.log(data);
    return data;

};
getSolarSystem();

async function getPlanets() {
    let solarSystem = await getSolarSystem();

    solarSystem.forEach(planet => {
        console.log(planet);
        let planetEl = document.createElement('div');
        planetEl.classList.add('planet', `planet-${planet.id}`);

        planetEl.addEventListener('click', () => {
            console.log(`${planet.name}`);
        });

        planetsContainer.appendChild(planetEl)
    });


    
};

getPlanets();



// popBuy = document.querySelectorAll('button').forEach(popBuy => {
//     popBuy.addEventListener('click', (e) => {
//         // console.log(e.target.id);
//         let serialNumber = e.target.id;
//         let index = popcorn.findIndex(x => x.SerialNumber === serialNumber);
//         // console.log(popcorn[index]);
//         cart.push(popcorn[index])
//         console.log(cart);
//     });
// });



/* <section class="planet-card">
<h1>${planet.name}</h1>
<h3>${planet.latinName}</h3>
<p>${planet.desc}</p>
<div></div>
<section class="planet-card__info">
    <article>
        <p class="bold">OMKRETS</p>
        <p>${planet.circumference}</p>
    </article>
    <article>
        <p class="bold">KM FRÅN SOLEN</p>
        <p>${planet.distance}</p>
    </article>
    <article>
        <p class="bold">MAX TEMPERATUR</p>
        <p>${planet.temp.day}</p>
    </article>
    <article>
        <p class="bold">MIN TEMPERATUR</p>
        <p>${planet.temp.night}</p>
    </article>
</section>
<div></div>
<article>
    <p class="bold">MÅNAR</p>
    <p>${planet.moons}</p>
</article>
</section> */