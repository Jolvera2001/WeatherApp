import { z } from 'zod'

const ConditionModelSchema = z.object({
    text: z.string(),
    icon: z.string(),
    code: z.string(),
});

const LocationModelSchema = z.object({
    name: z.string(),
    region: z.string(),
    country: z.string(),
    lat: z.string(),
    lon: z.string(),
    tz_id: z.string(),
    localtime: z.string(),
});

const CurrentModelSchema = z.object({
    last_updated: z.string(),
    temp_f: z.number(),
    is_day: z.number(),
    condition: ConditionModelSchema.optional(),
    wind_mph: z.number(),
    wind_dir: z.number(),
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
type LocationModel = z.infer<typeof LocationModelSchema>;
type currentModel = z.infer<typeof CurrentModelSchema>;
type ConditionModel = z.infer<typeof ConditionModelSchema>;