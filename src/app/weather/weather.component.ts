import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';
import * as connectivity from 'connectivity';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

	city : string;
	showWeather : any = [];
	errorCode : any;
	showForcast : any = [];
	forecastList : any;
  isConnected : true;
  offLineRequest : any;
  count : any = 0;
  constructor(private _weatherService : WeatherService) { };

  ngOnInit() {
    localStorage.clear();
    // if(!this.isConnected) {
      setInterval(() => {
        // this.isConnected = false;
        if(!navigator.onLine){
          this.count = 1;
        } else {
          if(this.count == 1){
            this.battleInit();
            this.count = 0;
            localStorage.clear();
          }
        }
        
      }, 5000);
    // }
  }

  battleInit(){
      this.offLineRequest = JSON.parse(localStorage.getItem('URL'));
      if(this.offLineRequest){
        for(let i=0;i<this.offLineRequest.length;i++){
          this._weatherService.getOfflineData(this.offLineRequest[i])
          .subscribe(response => {
            this.showWeather.push(response);
            this.errorCode = false;
            this.isConnected = true;
          },
          error => {
            //this.errorCode = error;
            //this.showWeather = undefined;
          });
        }
      }
    console.log(navigator.onLine);
  }

  getWeather(){
    console.log(this.city);
  	this._weatherService.getWeather(this.city)
  		.subscribe(response => 	{
  			this.showWeather.push(response);
  			this.errorCode = false;
  		},
  		error => {
        console.log(error);
        if(error.statusText == ""){
          this.errorCode = 'There is no Internet connection, your query has been saved';
        } else{
          this.errorCode = error.statusText;
        }
  			// this.showWeather = undefined;
  		});
  }

  forcast() {
  	this._weatherService.forcastWeather(this.city)
  		.subscribe(response => {
  			this.showForcast.push(response);
  			this.forecastList = response.list;
  			this.errorCode = false;
  		},
  		error => {
  			//this.showForcast = undefined;
  			//this.errorCode = error;
  		})
  }

}
