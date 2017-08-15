import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

import { CurrentWeather } from './current-weather';
import { Forecast } from './forecast';

@Injectable()
export class WeatherService {
  myWeather: CurrentWeather;
  location;

  constructor(private http:Http) { }
  
  localWeather() {
    return new Promise((res, rej) => {
      navigator.geolocation.getCurrentPosition((pos) => {
        this.location = pos.coords;
        const lat = this.location.latitude;
        const lon = this.location.longitude;
        return this.http.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=dd43b0032d87b7d68329ce3de5d497f0&units=metric`).map(
          (response:Response) => response.json()
        ).toPromise().then(
          (data) => {
            this.myWeather = new CurrentWeather(data.name,
                                                data.sys.country,
                                                data.main.temp,
                                                data.weather[0].icon,
                                                data.weather[0].description,
                                                data.main.temp_max,
                                                data.main.temp_min);
                
            res(this.myWeather);
          }
        );
      });   
    });
      
  }

  anotherCityWeather(city: string) {
    return this.http.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=dd43b0032d87b7d68329ce3de5d497f0&units=metric`).map(
      (response:Response) => response.json()
    );
  }

  fiveDayForecast(city: string) {
    return this.http.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=dd43b0032d87b7d68329ce3de5d497f0&units=metric`).map(
      (response:Response) => response.json()
    );
  }

}
