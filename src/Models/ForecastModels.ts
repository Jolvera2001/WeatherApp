import { z } from 'zod'
import { 
    ConditionModelSchema, 
    CurrentModelSchema, 
    LocationModelSchema 
} from './CurrentModels';

const DaySchema = z.object({
    maxtemp_f: z.number(),
    mintemp_f: z.number(),
    avgtemp_f: z.number(),
    maxwind_mph: z.number(),
    totalprecip_in: z.number(),
    avghumidity: z.number(),
    daily_will_it_rain: z.number(),
    daily_chance_of_rain: z.number(),
    daily_will_it_snow: z.number(),
    daily_chance_of_snow: z.number(),
    condition: ConditionModelSchema.optional(),
    uv: z.number(),
});

const AstroSchema = z.object({
    sunrise: z.string(),
    sunset: z.string(),
    moonrise: z.string(),
    moonset: z.string(),
    moon_phase: z.string(),
    moon_illumination: z.number(),
});

const HourSchema = z.object({
    time: z.string(),
    temp_f: z.number(),
    is_day: z.number(),
    condition: ConditionModelSchema.optional(),
    wind_mph: z.number(),
    wind_dir: z.string(),
    precip_in: z.number(),
    humidity: z.number(),
    cloud: z.number(),
    feelslike_f: z.number(),
    windchill_f: z.number(),
    heatindex_f: z.number(),
    dewpoint_f: z.number(),
    will_it_rain: z.number(),
    chance_of_rain: z.number(),
    will_it_snow: z.number(),
    chance_of_snow: z.number(),
    vis_miles: z.number(),
    gust_mph: z.number(),
    uv: z.number(),
});

const ForecastDaySchema = z.object({
    day: DaySchema.optional(),
    date: z.string(),
    astro: AstroSchema.optional(),
    hour: HourSchema.array().optional(),
});

const ForecastSchema = z.object({
    forecastday: ForecastDaySchema.array().optional(),
})

export const ForecastApiSchema = z.object({
    location: LocationModelSchema.optional(),
    current: CurrentModelSchema.optional(), 
    forecast: ForecastSchema.optional(),
})

export type ForecastApiModel  = z.infer<typeof ForecastApiSchema>;