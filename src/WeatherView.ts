import {Weather} from './Weather.js';

export class WeatherView{
    weatherAppInstance: Weather;
    cityArr: string[];
    root : HTMLDivElement;

    constructor(){
        this.startView();
    }

    startView() : void{
        this.weatherAppInstance = new Weather();
        this.addEventsListeners();
        this.root = document.querySelector(".WeatherRoot");
        this.readLocalStorage();
    }

    addEventsListeners() : void{
        document.querySelector('.AddBtn').addEventListener('click', () => this.addWeatherBlockFromInput());
        document.querySelector('body').addEventListener("keydown", (ev: KeyboardEvent) => this.keyPressed(ev));
    }

    keyPressed(ev : KeyboardEvent):void{
        if (ev.key == "Enter") {
            ev.preventDefault();
            this.addWeatherBlockFromInput();
        }
    }

    readLocalStorage() : void{
        this.cityArr = JSON.parse(localStorage.getItem("weatherCities"));
        if(this.cityArr){
            this.cityArr.forEach(cityToAdd => this.getWeatherBlockFromAPI(cityToAdd))
        }
        else{
            this.cityArr = new Array();
        }
    }

    addWeatherBlockFromInput(){
        let cityToAdd = (document.querySelector('.CityInput') as HTMLInputElement).value;
        if(cityToAdd){
            this.cityArr.push(cityToAdd);
            localStorage.setItem("weatherCities", JSON.stringify(this.cityArr));
            this.getWeatherBlockFromAPI(cityToAdd);
        }
    }

    async getWeatherBlockFromAPI(cityToAdd : string){
        let cityData = await this.weatherAppInstance.getCityInfo(cityToAdd);
        let weatherBlock = this.getWeatherBlock(cityData);
        this.root.appendChild(weatherBlock);
    }

    getWeatherBlock(data : any) : HTMLDivElement{

        let WeatherBlock = document.createElement("div");
        WeatherBlock.setAttribute("class", "WeatherBlock");


        let BlockHeader = document.createElement("div");
        BlockHeader.setAttribute("class", "BlockHeader");

        let WeatherIcn  = document.createElement("div");
        WeatherIcn.setAttribute("class", "WeatherIcn");

        let img = document.createElement("img");
        img.setAttribute("src",`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
        WeatherIcn.appendChild(img);
        BlockHeader.appendChild(WeatherIcn);

        let Locality = document.createElement("div");
        Locality.setAttribute("class", "Locality");
        let spanName = document.createElement("span");
        spanName.setAttribute("class", "spanName");
        spanName.innerText = data.name;
        Locality.appendChild(spanName);
        let spanWeatherState = document.createElement("span");
        spanWeatherState.innerText = data.weather[0].main;
        Locality.appendChild(spanWeatherState);
        BlockHeader.appendChild(Locality);
        WeatherBlock.appendChild(BlockHeader);


        let WeatherData = document.createElement("div");
        WeatherData.setAttribute("class", "WeatherData");

        let LeftData  = document.createElement("div");
        LeftData.setAttribute("class", "LeftData");


        let cloudTxt = document.createElement("span");
        cloudTxt.innerText = "Clouds:"
        LeftData.appendChild(cloudTxt);

        let cloudSpeed = document.createElement("span");
        cloudSpeed.innerText = data.clouds.all + "%";
        LeftData.appendChild(cloudSpeed);

        let windTxt = document.createElement("span");
        windTxt.innerText = "Wind:"
        LeftData.appendChild(windTxt);

        let windSpeed = document.createElement("span");
        windSpeed.innerText = data.wind.speed + " km/h";
        LeftData.appendChild(windSpeed);

        WeatherData.appendChild(LeftData);

        let RightData  = document.createElement("div");
        RightData.setAttribute("class", "RightData");

        let pressure = document.createElement("span");
        pressure.innerText = data.main.pressure + " hPa"
        RightData.appendChild(pressure);

        let humidity = document.createElement("span");
        humidity.innerText = data.main.humidity + "%";
        RightData.appendChild(humidity);

        let Temp = document.createElement("span");
        Temp.setAttribute("class", "Temp");
        Temp.innerText = Math.round(data.main.temp) + "°C";
        RightData.appendChild(Temp);
        WeatherData.appendChild(RightData);
        WeatherBlock.appendChild(WeatherData);

        return WeatherBlock;
    }
}