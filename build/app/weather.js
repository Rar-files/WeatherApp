var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class Weather {
    constructor() {
        this.opwApiKey = "4aa22253676913da0265dca40bf37854";
        this.getCityInfo("myślenice");
    }
    getCityInfo(city) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getWeather(city);
        });
    }
    getWeather(city) {
        return __awaiter(this, void 0, void 0, function* () {
            let weatherData;
            yield fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.opwApiKey}`)
                .then(res => res.json())
                .then(data => weatherData = data)
                .catch();
            console.log(weatherData);
            return weatherData;
        });
    }
}
