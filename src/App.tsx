import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './components/ui/card'
import { cn } from "@/lib/utils"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { RealTimeModel } from './Models/CurrentModels'
import { WeatherApiServiceFactory } from './Services/WeatherApiService'
import { Label } from '@/components/ui/label'

function App() {
  const [isBusy, setIsBusy] = useState<boolean>(false);
  const [city, setCity] = useState<string>("");
  const [currentData, setCurrentData] = useState<RealTimeModel | null>(null);

  const fetchWeather = async () => {
    setIsBusy(true);

    const weatherService = WeatherApiServiceFactory.createService();
    try {
      const data = await weatherService.currentWeather(city);
      setCurrentData(data);
    } catch (err) {
      console.log("Failed to get current weather")
    }

    setIsBusy(false);
  }

  return (
    <>
      <div className='container mx-auto'>
        <div className='flex flex-row justify-center container mx-auto my-6'>
          <div className='flex-1 justify-center mx-2'>
            <Input onChange={e => setCity(e.target.value)} />
          </div>
          <div className='flex-2 mx-2'>
            <Button onClick={fetchWeather}>Refresh</Button>
          </div>
        </div>
        <Separator className='mx-auto my-6 w-5/6'/>
        <div className='flex flex-col items-center justify-center'>
          <div className='text-center mb-4'>
            <h1 className='font-semibold text-4xl'>Current Weather</h1>
          </div>
          <div className='flex-2 mx-4 text-lg'>
            {currentData ? (
              <Card className={cn("w-[260px]")}>
                <CardHeader>
                  <CardTitle>{currentData.location?.name}, {currentData.location?.region}</CardTitle>
                  <CardDescription>Current weather</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Temperature: {currentData.current?.temp_f}&deg;F</p>
                  <p>Feels like: {currentData.current?.feelslike_f}&deg;F</p>
                </CardContent>
                <CardFooter>
                  <p>{currentData.current?.condition?.text}</p>
                </CardFooter>
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
          <div className='flex-1 m-2'>
            <h1 className='font-semibold text-4xl'>Forecast</h1>
          </div>
          <div className='flex-2 flex-row m-2 items-center justify-evenly'>

          </div>
        </div>
      </div>
    </>
  )
}

export default App