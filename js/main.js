/* Prideti Mygtukas */
document.getElementById("prideti").onclick = function(){
    document.getElementById("prideti").style.backgroundColor = 'green';
    document.getElementById("prideti").style.color = 'white';
    document.getElementById("prideti").innerHTML = "ADDED!";
}
/* Paieska ir Mygtukas*/
const button = document.querySelector('.paieska');
const inputValue = document.querySelector('.ieskojimoEilute');

/* Ikonos pagal oro salygas */

let weatherIcons = {
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

async function getWeatherIcon(conditionCode){
    switch (conditionCode) {
        case ("clear"):
            return weatherIcons.clear;
        case ("isolated-clouds"):
            return weatherIcons.isolatedClouds;
        case ("scattered-clouds"):
            return weatherIcons.scatteredClouds;
        case ("overcast"):
            return weatherIcons.overcast;
        case ("light-rain"):
            return weatherIcons.lightRain;
        case ("moderate-rain"):
            return weatherIcons.moderateRain;
        case ("heavy-rain"):
            return weatherIcons.heavyRain;
        case ("sleet"):
            return weatherIcons.sleet;
        case ("light-snow"):
            return weatherIcons.lightSnow;
        case ("moderate-snow"):
            return weatherIcons.moderateSnow;
        case ("heavy-snow"):
            return weatherIcons.heavySnow;
        case ("fog"):
            return weatherIcons.fog;
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

                /* Laikas */

                let valandos = new Date(data['forecastTimestamps'][i]['forecastTimeUtc']);
                let valanda = valandos.getHours() + ":00";
                let laikas = document.querySelector('.laikas'+[i]);
                laikas.innerHTML = valanda;

                /* Nuotrauka */
/*
                let weatherIcon = document.createElement('div');
                let image = document.querySelector('img');
                image.innerHTML = getWeatherIcon(weatherIcons[i]['conditionCode']);
                weatherIcon.classList.add("weather-icon");
                weatherByHours.appendChild(weatherIcon);
*/

                /* Oro temperatura */

                let tempValue = (data['forecastTimestamps'][i]['airTemperature']);
                let temp = document.querySelector('.temp'+[i]);
                temp.innerHTML = tempValue + '°C';

                /* Krituliai */

                let kritValue = (data['forecastTimestamps'][i]['totalPrecipitation']);
                let krit = document.querySelector('.name'+[i]);
                krit.innerHTML = kritValue + '%';

                /* Vejo greitis */

                let windValue = (data['forecastTimestamps'][i]['windSpeed']);
                let wind = document.querySelector('.desc'+[i]);
                wind.innerHTML = windValue;

                console.log(data['forecastTimestamps'][i]['conditionCode']);

            }

        })
});
function today(value){
    return value.forecastTimeUtc.includes('2019-12-10')
}
