import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card'
import { cn } from "@/lib/utils"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { RealTimeModel } from './Models/CurrentModels'
import { WeatherApiServiceFactory } from './Services/WeatherApiService'
import { ForecastApiModel } from './Models/ForecastModels'
import { Skeleton } from './components/ui/skeleton'

function App() {
  const [isBusy, setIsBusy] = useState<boolean>(false);
  const [city, setCity] = useState<string>("");
  const [currentData, setCurrentData] = useState<RealTimeModel | null>(null);
  const [forecast, setForecast] = useState<ForecastApiModel | null>(null);

  const fetchWeather = async () => {
    const weatherService = WeatherApiServiceFactory.createService();
    try {
      const data = await weatherService.currentWeather(city);
      setCurrentData(data);
    } catch (err) {
      console.log("Failed to get current weather")
    }
  }

  const fetchForecast = async () => {
    const weatherService = WeatherApiServiceFactory.createService();
    try {
      const data = await weatherService.forecast(city);
      setForecast(data);
    } catch (err) {
      console.log("Failed to get forecast")
    }
  }

  const getDay = (num: number) => {
    const weatherService = WeatherApiServiceFactory.createService();
    const day = weatherService.dayMapper(num);
    return day;
  }

  const bigData = async () => {
    setIsBusy(true);

    await fetchWeather();
    await fetchForecast();

    setIsBusy(false);
  }

    return (
    <>
      <div className='container mx-auto'>
        <div className='flex flex-row justify-center container mx-auto my-6'>
          <div className='justify-center mx-2'>
            <Input onChange={e => setCity(e.target.value)} />
          </div>
          <div className='mx-2'>
            <Button onClick={bigData}>Refresh</Button>
          </div>
          <div>
            <HoverCard>
                <HoverCardTrigger asChild>
                  <Button>@info</Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className='flex text-center'>
                    <p>Weather information provided by <a href="https://www.weatherapi.com" target='_blank' rel="noopener noreferrer" className='underline'>
                        weatherapi
                      </a>.
                      See README for in this <a href="https://github.com/Jolvera2001/WeatherApp?tab=readme-ov-file" target='_blank' rel="noopener noreferrer" className='underline'>repo</a> copying the codebase and setting it up with your own API key</p>
                  </div>
                </HoverCardContent>
            </HoverCard>
          </div>
        </div>
        <Separator className='mx-auto my-6 w-5/6'/>
        <div className='flex flex-col items-center justify-center'>
          <div className='flex-2 mx-4 text-lg'>
            {currentData ? (
              <Card className={cn("w-[250px]")}>
                { isBusy ? (
                <>
                  <CardHeader>
                    <Skeleton className='w-[215px] h-[25px]'/>
                    <Skeleton className='w-[100px] h-[25px] mb-6'/>
                      <div className='flex flex-col items-center justify-center p-2'>
                        <div className='flex m-4'>
                          <Skeleton className='w-12 h-12 rounded-full mt-2' />  
                        </div>
                        <div className='flex'>
                          <Skeleton className='w-[100px] h-[25px]' />
                        </div>
                      </div>
                  </CardHeader>
                  <CardContent>
                    <Skeleton className='w-[185px] h-[20px] mb-2'/>
                    <Skeleton className='w-[185px] h-[20px]'/>
                  </CardContent>
                </>
                ) : (
                <>
                  <CardHeader>
                    <CardTitle>{currentData.location?.name}, {currentData.location?.region}</CardTitle>
                    <CardDescription>Current weather</CardDescription>
                    <div className='flex flex-col items-center justify-center p-2'>
                      <div className='flex'>
                        <img src={currentData.current?.condition?.icon} alt='weather image'/>
                      </div>
                      <div className='flex text-lg'>
                        <p>{currentData.current?.condition?.text}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p>Temp: {currentData.current?.temp_f}&deg;F</p>
                    <p>Feels like: {currentData.current?.feelslike_f}&deg;F</p>
                  </CardContent>
                </>
                )}
              </Card>
            ) : (
              <Card className={cn("w-[215px]")}>
                <CardHeader>
                  <CardTitle>No Data available</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Please type in a city and press refresh</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
        <Separator className='mx-auto my-6 w-5/6'/>
        <div className='flex flex-col items-center justify-center'>
          <div className='flex flex-row flex-wrap m-4 items-center justify-evenly w-full'>
            {forecast ? (
              <>
                {forecast.forecast?.forecastday?.map((item,index) => (
                  <Card key={index} className={cn("w-[215px] m-2")}>
                    <CardHeader>
                      <CardTitle>{getDay(index)}</CardTitle>
                      <CardDescription>{item.day?.condition?.text}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className='flex flex-row justify-evenly'>
                        <div className='flex flex-col text-xs items-center'>
                          <img className='w-8' src={item.hour?.[7].condition?.icon} alt='weather image' />
                          <p>7 AM</p>
                        </div>
                        <div className='flex flex-col text-xs'>
                          <img className='w-8' src={item.hour?.[12].condition?.icon} alt='weather image' />
                          <p>12 PM</p>
                        </div>
                        <div className='flex flex-col text-xs'>
                          <img className='w-8' src={item.hour?.[17].condition?.icon} alt='weather image' />
                          <p>5 PM</p>
                        </div>
                        <div className='flex flex-col text-xs'>
                          <img className='w-8' src={item.hour?.[22].condition?.icon} alt='weather image' />
                          <p>10 PM</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </>
            ) : (
              <>
                No Forecast Available
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default App