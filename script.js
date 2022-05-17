
/*SUBSCRIBE HERE FOR API KEY: https://home.openweathermap.org/users/sign_up*/
const apiKey = "9534500b6d692527c7b3f475ffc1de7f";

let weather = {
    apiKey: "9534500b6d692527c7b3f475ffc1de7f",

    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" +
            city +
            "&units=metric&appid=" +
            this.apiKey

        )
            .then((reponse) => {
                if (!reponse.ok) {
                    console.log('No weather Found.')

                }
                return reponse.json()
            })
            .then((data) => this.displayWeather(data))

        let array = []

        let todo = localStorage.getItem('city')
        array = JSON.parse(todo)
        array.push(`${city.value}`)
        city.value = ""
        localStorage.setItem('city', JSON.stringify(array))
    },
    displayWeather: function (data) {

        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector('.city').innerHTML = 'Weather in ' + name;
        document.querySelector('.icon').src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector('.description').innerHTML = description;
        document.querySelector('.temp').innerHTML = temp + "° C";
        document.querySelector('.humidity').innerHTML = 'Humidity: ' + humidity + "%";
        document.querySelector('.wind').innerHTML = 'Wind speed: ' + speed + " km/h";
        document.querySelector('.weather').classList.remove('loading');
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')";

    },
    search: function () {
        this.fetchWeather(document.querySelector('.search-bar').value);
    },

};


document.querySelector('.search button').addEventListener('click', function () {
    weather.search();
});

document.querySelector('.search-bar').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        weather.search();
    }

})


//horloge
clock2();

function clock2() {
    const date = new Date();
    const hours = ((date.getHours() + 11) % 12 + 1);
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const hour = hours * 30;
    const minute = minutes * 6;
    const second = seconds * 6;

    document.querySelector('.heure').style.transform = `rotate(${hour}deg)`;

    document.querySelector('.minute').style.transform = `rotate(${minute}deg)`;

    document.querySelector('.seconde').style.transform = `rotate(${second}deg)`;
}

setInterval(clock2, 1000);








