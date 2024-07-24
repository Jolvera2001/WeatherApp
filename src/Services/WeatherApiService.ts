import { config } from './config'
import { RealTimeModel, RealTimeModelSchema } from '../Models/CurrentModels'
import { ForecastApiModel, ForecastApiSchema } from '@/Models/ForecastModels';

export class WeatherApiService implements IWeatherApiService {
    private ApiBaseUrl: string;
    private ApiBaseUrlForecast: string;
    private WeatherApiKey: string;

    constructor() {
        this.ApiBaseUrl= "http://api.weatherapi.com/v1/current.json";
        this.ApiBaseUrlForecast = "http://api.weatherapi.com/v1/forecast.json";
        this.WeatherApiKey= config.weatherApiKey;
    }

    async forecast(city: string): Promise<ForecastApiModel> {
        try {
            const query = new URLSearchParams({
                key: this.WeatherApiKey,
                q: city,
                day: "5",
                aqi: "no",
                alerts: "no",
            });

            const response = await fetch(`${this.ApiBaseUrlForecast}?${query.toString()}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const jsonData = await response.json();
            const data = ForecastApiSchema.parse(jsonData);
            return data;

        } catch (err) {
            console.error("Error calling forecast", err);
            const data = {} as ForecastApiModel;
            return data;
        }
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
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const jsonData = await response.json();
            const data = RealTimeModelSchema.parse(jsonData);
            return data;

        } catch (err) {
            console.error("Error calling current weather:", err);
            const data = {} as RealTimeModel;
            return data;
        }
    }
}

interface IWeatherApiService {
    currentWeather(city: string): Promise<RealTimeModel>;
    forecast(city: string): Promise<ForecastApiModel>;
}

export class WeatherApiServiceFactory {
    public static createService(): IWeatherApiService {
        return new WeatherApiService();
    }
}
