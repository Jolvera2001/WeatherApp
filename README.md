# Weather App
## Description
I was wanting to get into typescript and thought that I should finally make an obligatory weather app since I didn't already have one. My plan is to have this hosted on a website using Azure or AWS and have people be able to come to this repo and clone the code themselved with instructions on how to use it for whatever they want

## Personal Use
If you're planning to clone and use this for whatever you want, there's only a few steps in getting things working locally:
1. Create an account on [WeatherApi](https://www.weatherapi.com) (should be free with a monthly limit)
2. Copy the API key provided
3. create a .env file in the root of the project and create a variable named "VITE_WEATHER_API". It should look something like:
     `VITE_WEATHER_API=...`
4. The app calls that api already, so at this point you should be done! type in the console `npm run dev` and open the link to look at your webpage. Type in whatever city you want and enjoy!

## Outcomes
This small project made me realize how great typescript is compared to javascript. Things like inheritance and creating classes are much easier, and coming from a C# environment it just makes much more sense to use. I also ended up usign Shadcn and I liked it, but I am by no means a UX expert or artist, so it helped me get something basic up and going pretty quickly along with tailwind css. I also just needed something small to work on and finish to get my mind going on what to learn as I start to dedicate more time on bigger and more complex projects.
