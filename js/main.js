/* Prideti Mygtukas */
document.getElementById("prideti").onclick = function(){
    document.getElementById("prideti").style.backgroundColor = 'green';
    document.getElementById("prideti").style.color = 'white';
    document.getElementById("prideti").innerHTML = "ADDED!";
}
/* Paieska ir Mygtukas*/
const button = document.querySelector('.paieska');
const inputValue = document.querySelector('.ieskojimoEilute');

const weather = {};

/* Ikonos pagal oro salygas */

let ikonos= {
    clear: '<i class="fas fa-sun"></i>',
    isolatedClouds: '<i class="fas fa-cloud"></i>',
    scatteredClouds: '<i class="fas fa-cloud-sun"></i>',
    overcast: '<i class="fas fa-cloud"></i>',
    lightRain: '<i class="fas fa-cloud-rain"></i>',
    moderateRain: '<i class="fas fa-cloud-rain"></i>',
    heavyRain: '<i class="fas fa-cloud-showers-heavy"></i>',
    sleet: '<i class="fas fa-cloud-meatball"></i>',
    lightSnow: '<i class="fas fa-snowflake"></i>',
    moderateSnow: '<i class="fas fa-snowflake"></i>',
    heavySnow: '<i class="fas fa-snowflake"></i>',
    fog: '<i class="fas fa-smog"></i>',
    humidityIcon: '<i class="fas fa-tint"></i>'
};

async function ikonosGavimas(conditionCode){
    switch (conditionCode) {
        case ("clear"):
            return ikonos.clear;
        case ("isolated-clouds"):
            return ikonos.isolatedClouds;
        case ("scattered-clouds"):
            return ikonos.scatteredClouds;
        case ("overcast"):
            return ikonos.overcast;
        case ("light-rain"):
            return ikonos.lightRain;
        case ("moderate-rain"):
            return ikonos.moderateRain;
        case ("heavy-rain"):
            return ikonos.heavyRain;
        case ("sleet"):
            return ikonos.sleet;
        case ("light-snow"):
            return ikonos.lightSnow;
        case ("moderate-snow"):
            return ikonos.moderateSnow;
        case ("heavy-snow"):
            return ikonos.heavySnow;
        case ("fog"):
            return ikonos.fog;
    }
}

/* Paieskos funkcija */

button.addEventListener('click',function() {
    let url ='https://api.meteo.lt/v1/places/' + inputValue.value + '/forecasts/long-term';
    fetch(url)
        .then(response => response.json())
        .then(data => {

            for (let i = 0; i < 24; i++) {

                /* Miesto pavadinimas */

                let nameValue = (data['place']['name']);
                let name = document.querySelector('.miestas');
                name.innerHTML = nameValue;
                document.getElementsByClassName("miestas").innerHTML = nameValue;


                /* Sukuriamas valandai atskiras blokas */


                let blokas = document.createElement('div');
                blokas.className = 'blokelis';
                valandu.appendChild(blokas);

                /* Valandos Laikas */

                let valandos = new Date(data['forecastTimestamps'][i]['forecastTimeUtc']);
                let valanda = valandos.getHours() + ":00";
                let valandele = document.createElement('p');
                valandele.textContent = valanda;
                blokas.appendChild(valandele);

                /* Ikonėlė */

               let image = document.createElement('div');
               let imageValue = (data['forecastTimestamps'][i]['conditionCode']);
               image.innerHTML = `<img src="icons/${imageValue}.png"/>`;
               blokas.appendChild(image);

                /* Oro Temperatūra */

                let tempValue = (data['forecastTimestamps'][i]['airTemperature']);
                let temperatura = document.createElement('p');
                temperatura.textContent = tempValue + '°C';
                blokas.appendChild(temperatura);

                /* Krituliai */

                let kritValue = (data['forecastTimestamps'][i]['totalPrecipitation']);
                let krituliai = document.createElement('p');
                krituliai.textContent = kritValue + '%';
                blokas.appendChild(krituliai);

                /* Vėjo greitis */

                let windValue = (data['forecastTimestamps'][i]['windSpeed']);
                let vejas = document.createElement('p');
                vejas.textContent = windValue;
                blokas.appendChild(vejas);

                console.log(data['forecastTimestamps'][i]['conditionCode']);
            }

        })
});
function today(value){
    return value.forecastTimeUtc.includes('2019-12-10')
}
