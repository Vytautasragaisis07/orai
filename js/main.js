/* Pridėti Mygtukas */
document.getElementById('prideti').onclick = function() {
    document.getElementById('prideti').style.backgroundColor = 'green';
    document.getElementById('prideti').style.color = 'white';
    document.getElementById('prideti').innerHTML = 'ADDED!';
};
/* Paieška ir Mygtukas*/
const button = document.querySelector('.paieska');
const inputValue = document.querySelector('.ieskojimoEilute');

const weather = {};

/* Default funkcija */

window.onload = function() {
    let url = 'https://api.meteo.lt/v1/places/kaunas/forecasts/long-term';
    fetch(url)
        .then(response => response.json())
        .then(data => {
            Alldata = data ['forecastTimestamps'];
            for (let i = 0; i < 7; i++) {

                let todaydata = Alldata.filter(function (item) {
                    let currentDate = new Date();
                    let day = currentDate.getDate() + i;
                    let month = currentDate.getMonth() + 1;
                    let year = currentDate.getFullYear();
                    let formatd = year + "-" + month + "-" + day;
                    console.log(day)
                    return item.forecastTimeUtc.includes(formatd)
                });

                /* Didžiausia ir mažiausia temperatūra */

                const maxtemp = Math.max(...todaydata.map(o => o.airTemperature));
                const mintemp = Math.min(...todaydata.map(o => o.airTemperature));

                /* Sukuriamas blokas */

                const savaite = document.querySelector(".virsutine")
                let diena = document.createElement("div")
                diena.className = 'display';
                savaite.appendChild(diena)

                /* Dienos data */

                let dienosData = document.createElement('p')
                dienosData.className = 'datap'+[i];
                let currentDate = new Date();
                let day = currentDate.getDate() + i;
                diena.appendChild(dienosData)
                dienosData.innerText = ' Diena: ' + day;

                /* Įrašoma temperatūra */

                let dienosTemp = document.createElement('p')
                dienosTemp.className = 'dienosp'+[i];
                diena.appendChild(dienosTemp)
                dienosTemp.innerText = ' Min: ' + mintemp + ' Max: ' + maxtemp;

                /* Ikonėlė */

                let image = document.createElement('div');
                image.className = 'ikona'+[i];
                let imageValue = data['forecastTimestamps'][i]['conditionCode'];
                image.innerHTML = `<img id="icon" src="icons/${imageValue}.png" width="100px", height="100px"/>`;
                diena.appendChild(image);

            }
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
                valandele.className = 'valandosp'+[i];
                valandele.textContent = valanda;
                blokas.appendChild(valandele);

                /* Ikonėlė */

                let image = document.createElement('div');
                image.className = 'ikonele'+[i];
                let imageValue = data['forecastTimestamps'][i]['conditionCode'];
                image.innerHTML = `<img id="icon" src="icons/${imageValue}.png"/>`;
                blokas.appendChild(image);

                /* Oro Temperatūra */

                let tempValue = data['forecastTimestamps'][i]['airTemperature'];
                let temperatura = document.createElement('p');
                temperatura.className = 'temperaturap'+[i];
                temperatura.textContent = tempValue + '°C';
                blokas.appendChild(temperatura);

                /* Krituliai */

                let kritValue = data['forecastTimestamps'][i]['totalPrecipitation'];
                let krituliai = document.createElement('p');
                krituliai.className = 'krituliaip'+[i];
                krituliai.textContent = kritValue + '%';
                blokas.appendChild(krituliai);

                /* Vėjo greitis */

                let windValue = data['forecastTimestamps'][i]['windSpeed'];
                let vejas = document.createElement('p');
                vejas.className = 'vejop'+[i];
                vejas.textContent = windValue;
                blokas.appendChild(vejas);
            }
        });
};

/* Paieskos funkcija */

button.addEventListener('click', function() {
    let url = 'https://api.meteo.lt/v1/places/' + inputValue.value + '/forecasts/long-term';
    fetch(url)
        .then(response => response.json())
        .then(data => {
            Alldata = data ['forecastTimestamps'];
            for (let i = 0; i < 7; i++) {

                let todaydata = Alldata.filter(function (item) {
                    let currentDate = new Date();
                    let day = currentDate.getDate() + i;
                    let month = currentDate.getMonth() + 1;
                    let year = currentDate.getFullYear();
                    let formatd = year + "-" + month + "-" + day;
                    console.log(day)
                    return item.forecastTimeUtc.includes(formatd)
                });

                /* Didžiausia ir mažiausia temperatūra */

                const maxtemp = Math.max(...todaydata.map(o => o.airTemperature));
                const mintemp = Math.min(...todaydata.map(o => o.airTemperature));

                /* Dienos data */

                let dienosData = document.querySelector('.datap'+[i])
                let currentDate = new Date();
                let day = currentDate.getDate() + i;
                dienosData.innerHTML = ' Diena: ' + day;

                /* Įrašoma temperatūra */

                let dienosTemp = document.querySelector('.dienosp'+[i])
                dienosTemp.innerHTML = ' Min: ' + mintemp + ' Max: ' + maxtemp;

            }
            for (let i = 0; i < 24; i++) {
                /* Miesto pavadinimas */

                let nameValue = data['place']['name'];
                let name = document.querySelector('.miestas');
                name.innerHTML = nameValue;

                /* Valandos Laikas */

                let valandos = new Date(data['forecastTimestamps'][i]['forecastTimeUtc']);
                let valanda = valandos.getHours() + ':00';
                let valandele = document.querySelector('.valandosp'+[i]);
                console.log(valanda);
                valandele.textContent = valanda;

                /* Ikonėlė */

                let image = document.querySelector('.ikonele'+[i]);
                let imageValue = data['forecastTimestamps'][i]['conditionCode'];
                image.innerHTML = `<img id="icon" src="icons/${imageValue}.png"/>`;

                /* Oro Temperatūra */

                let tempValue = data['forecastTimestamps'][i]['airTemperature'];
                let temperatura = document.querySelector('.temperaturap'+[i]);
                temperatura.innerHTML= tempValue + '°C';

                /* Krituliai */

                let kritValue = data['forecastTimestamps'][i]['totalPrecipitation'];
                let krituliai = document.querySelector('.krituliaip'+[i]);
                krituliai.innerHTML = kritValue + '%';

                /* Vėjo greitis */

                let windValue = data['forecastTimestamps'][i]['windSpeed'];
                let vejas = document.querySelector('.vejop'+[i]);
                vejas.innerHTML = windValue;


                console.log(data['forecastTimestamps'][i]['forecastTimeUtc']);
            }
        });
});
