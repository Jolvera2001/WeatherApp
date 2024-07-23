import { config } from './config'
import { RealTimeModel, RealTimeModelSchema } from '../Models/CurrentModels'

export class WeatherApiService implements IWeatherApiService {
    private ApiBaseUrl: string;
    private WeatherApiKey: string;

    constructor() {
        this.ApiBaseUrl= "http://api.weatherapi.com/v1/current.json";
        this.WeatherApiKey= config.weatherApiKey;
    }

    async currentWeather(city: string): Promise<RealTimeModel> {
        try {
            const query = new URLSearchParams({
                key: this.WeatherApiKey,
                q: city,
                aqi: 'no',
            });

            const response = await fetch(`${this.ApiBaseUrl}?${query.toString()}`);

            if (!response.ok) {
                throw new Error(`HTTP error! sttaus: ${response.status}`)
            }

            const jsonData = await response.json();

            // maps here
            const data = RealTimeModelSchema.parse(jsonData);

            return data;

        } catch (error) {
            console.error("Error calling current weather:", error);
            
            // empty == null???
            const data = {} as RealTimeModel;
            return data;
        }
    }
}

interface IWeatherApiService {
    currentWeather(city: string): Promise<RealTimeModel>;
}

export class WeatherApiServiceFactory {
    public static createService(): IWeatherApiService {
        return new WeatherApiService();
    }
}
