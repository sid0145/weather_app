import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-weather-main',
  templateUrl: './weather-main.component.html',
  styleUrls: ['./weather-main.component.css']
})
export class WeatherMainComponent implements OnInit {

  WeatherData:any;
  clicked=false;
  year;
  month;
  day;

  constructor() { }

  ngOnInit() {
  }
  onAdd(form:NgForm){
    const city=form.value.city;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ad7df986d39ba8eb7c9bbc8af0eaa0ad`)
    .then(response=>response.json())
    .then((responseData)=>{
      if(responseData.cod===200){
        console.log(responseData)
      this.setWeatherData(responseData);
      }else{
        alert('city not found!')
        return true;
      }
      this.clicked=true;

      
    })
  }
  setWeatherData(responseData){
 this.WeatherData=responseData;
 localStorage.setItem('WeatherData', this.WeatherData.main);


 let sunsetTime=new Date(this.WeatherData.sys.sunset * 1000);
 this.WeatherData.sunset_time=sunsetTime.toLocaleTimeString();
 let currentDate= new Date();
 this.WeatherData.isDay=(currentDate.getTime()<sunsetTime.getTime());
 this.WeatherData.temp_celcius=(this.WeatherData.main.temp - 273.15).toFixed(0);
 this.WeatherData.temp_min=(this.WeatherData.main.temp_min - 273.15).toFixed(0);
 this.WeatherData.temp_max=(this.WeatherData.main.temp_max - 273.15).toFixed(0);
 this.WeatherData.temp_feels_like=(this.WeatherData.main.feels_like  - 273.15).toFixed(0);

var today = new Date();
 this.day = String(today.getDate()).padStart(2, '0');
this.month = String(today.getMonth() + 1).padStart(2, '0');
 this.year= today.getFullYear();

  }

}
