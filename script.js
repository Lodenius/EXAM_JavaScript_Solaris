async function getSolarSystem() {
    let resp = await fetch('https://solaris.zocom.workers.dev/', {
        method: 'GET', // vi ska ta/få data
        mode: 'no-cors', // 
        headers: {'x-zocom': '<solaris-key-here>'}
    });
    let data = await resp.json();
    console.log(data);
};
getSolarSystem();