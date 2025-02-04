import { z } from 'zod'

export const ConditionModelSchema = z.object({
    text: z.string(),
    icon: z.string(),
    code: z.number(),
});

export const LocationModelSchema = z.object({
    name: z.string(),
    region: z.string(),
    country: z.string(),
    lat: z.number(),
    lon: z.number(),
    tz_id: z.string(),
    localtime: z.string(),
});

export const CurrentModelSchema = z.object({
    last_updated: z.string(),
    temp_f: z.number(),
    is_day: z.number(),
    condition: ConditionModelSchema.optional(),
    wind_mph: z.number(),
    wind_dir: z.string(),
    humidity: z.number(),
    cloud: z.number(),
    feelslike_f: z.number(),
    uv: z.number(),
});


export const RealTimeModelSchema = z.object({
    location: LocationModelSchema.optional(),
    current: CurrentModelSchema.optional(), 
});

// types
export type RealTimeModel = z.infer<typeof RealTimeModelSchema>;