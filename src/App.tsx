import { useState } from 'react'
import { Card, CardHeader } from './components/ui/card'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { RealTimeModel } from './Models/CurrentModels'
import { WeatherApiServiceFactory } from './Services/WeatherApiService'

function App() {
  const [city, setCity] = useState<string>("");
  const [currentData, setCurrentData] = useState<RealTimeModel | null>(null);

  const fetchWeather = async () => {
    const weatherService = WeatherApiServiceFactory.createService();
    try {
      const data = await weatherService.currentWeather(city);
      setCurrentData(data);
    } catch (err) {
      console.log("Failed to get current weather")
    }
  }

  return (
    <>
      <div className='container mx-auto'>
        <div className='flex flex-row justify-center container mx-auto my-4'>
          <div className='mx-2'>
            <Input />
          </div>
          <div className='mx-2'>
            <Button>Refresh</Button>
          </div>
        </div>
        <Separator className='mx-auto my-4'/>
        <div className='flex flex-row container justify-center'>
          <div>
            <Card className={cn("w-[225px]")}>
              <CardHeader> Test </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
