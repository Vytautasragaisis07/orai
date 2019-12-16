/* Prideti Mygtukas */
document.getElementById('prideti').onclick = function() {
    document.getElementById('prideti').style.backgroundColor = 'green';
    document.getElementById('prideti').style.color = 'white';
    document.getElementById('prideti').innerHTML = 'ADDED!';
};
/* Paieska ir Mygtukas*/
const button = document.querySelector('.paieska');
const inputValue = document.querySelector('.ieskojimoEilute');

const weather = {};

/* Default funkcija */

window.onload = function() {
    let url = 'https://api.meteo.lt/v1/places/kaunas/forecasts/long-term';
    fetch(url)
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < 24; i++) {
                /* Miesto pavadinimas */

                let nameValue = data['place']['name'];
                let name = document.querySelector('.miestas');
                name.innerHTML = nameValue;
                document.getElementsByClassName('miestas').innerHTML = nameValue;

                /* Sukuriamas valandai atskiras blokas */

                let blokas = document.createElement('div');
                blokas.className = 'blokelis';
                valandu.appendChild(blokas);

                /* Valandos Laikas */

                let valandos = new Date(data['forecastTimestamps'][i]['forecastTimeUtc']);
                let valanda = valandos.getHours() + ':00';
                let valandele = document.createElement('p');
                valandele.textContent = valanda;
                blokas.appendChild(valandele);

                /* Ikonėlė */

                let image = document.createElement('div');
                let imageValue = data['forecastTimestamps'][i]['conditionCode'];
                image.innerHTML = `<img src="icons/${imageValue}.png"/>`;
                blokas.appendChild(image);

                /* Oro Temperatūra */

                let tempValue = data['forecastTimestamps'][i]['airTemperature'];
                let temperatura = document.createElement('p');
                temperatura.textContent = tempValue + '°C';
                blokas.appendChild(temperatura);

                /* Krituliai */

                let kritValue = data['forecastTimestamps'][i]['totalPrecipitation'];
                let krituliai = document.createElement('p');
                krituliai.textContent = kritValue + '%';
                blokas.appendChild(krituliai);

                /* Vėjo greitis */

                let windValue = data['forecastTimestamps'][i]['windSpeed'];
                let vejas = document.createElement('p');
                vejas.textContent = windValue;
                blokas.appendChild(vejas);

                console.log(data['forecastTimestamps'][i]['conditionCode']);
            }
        });
};

/* Paieskos funkcija */

button.addEventListener('click', function() {
    let url = 'https://api.meteo.lt/v1/places/' + inputValue.value + '/forecasts/long-term';
    fetch(url)
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < 24; i++) {
                /* Miesto pavadinimas */

                let nameValue = data['place']['name'];
                let name = document.querySelector('.miestas');
                name.innerHTML = nameValue;
                document.getElementsByClassName('miestas').innerHTML = nameValue;

                /* Sukuriamas valandai atskiras blokas */

                let blokas = document.createElement('div');
                blokas.className = 'blokelis';
                valandu.appendChild(blokas);

                /* Valandos Laikas */

                let valandos = new Date(data['forecastTimestamps'][i]['forecastTimeUtc']);
                let valanda = valandos.getHours() + ':00';
                let valandele = document.createElement('p');
                valandele.textContent = valanda;
                blokas.appendChild(valandele);

                /* Ikonėlė */

                let image = document.createElement('div');
                let imageValue = data['forecastTimestamps'][i]['conditionCode'];
                image.innerHTML = `<img src="icons/${imageValue}.png"/>`;
                blokas.appendChild(image);

                /* Oro Temperatūra */

                let tempValue = data['forecastTimestamps'][i]['airTemperature'];
                let temperatura = document.createElement('p');
                temperatura.textContent = tempValue + '°C';
                blokas.appendChild(temperatura);

                /* Krituliai */

                let kritValue = data['forecastTimestamps'][i]['totalPrecipitation'];
                let krituliai = document.createElement('p');
                krituliai.textContent = kritValue + '%';
                blokas.appendChild(krituliai);

                /* Vėjo greitis */

                let windValue = data['forecastTimestamps'][i]['windSpeed'];
                let vejas = document.createElement('p');
                vejas.textContent = windValue;
                blokas.appendChild(vejas);

                console.log(data['forecastTimestamps'][i]['conditionCode']);
            }
        });
});
