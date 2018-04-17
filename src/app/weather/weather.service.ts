import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

@Injectable()
export class WeatherService {

 	appId : any = '78cd473d16d4bbce10b44292e91f61a8';
 	baseUrl : any = 'http://api.openweathermap.org/data/2.5';
  arr : Array<any> = [];
  // offLineRequest : any;
  localUrl : any;

  constructor(private _http : Http) { }

  getWeather(cityName : string) : Observable<any> {
    
    if(!navigator.onLine){
      console.log(this.arr);
     this.arr[this.arr.length] = (this.baseUrl + '/weather?q=' + cityName + '&' + 'appid=' + this.appId + '&units=imperial');
     // this.localUrl = this.baseUrl + '/weather?q=' + cityName + '&' + 'appid=' + this.appId + '&units=imperial';
      localStorage.setItem('URL',  JSON.stringify(this.arr));
    }
  	return this._http.get(this.baseUrl + '/weather?q=' + cityName + '&' + 'appid=' + this.appId + '&units=imperial')
  		.map((response : Response) => <any>response.json())
  		.catch(this.handelError);
  }

  forcastWeather(cityName : string) : Observable<any>{
  	return this._http.get(this.baseUrl + '/forecast?q=' + cityName + '&' + 'appid=' + this.appId + '&units=imperial')
  		.map((response : Response) => <any>response.json())
  		.catch(this.handelError);
  }

  private handelError(error : Response | any ) {
    console.log(error);
  	return Observable.throw(error || 'Server Error');
  }

  getOfflineData(offLineRequest) : Observable<any> {

  // isConnected = true;
    // this.offLineRequest = JSON.parse(localStorage.getItem('URL'));
    console.log(offLineRequest);
    return this._http.get(offLineRequest)
    .map((response : Response) => <any>response.json())
    .catch(this.handelError);
  }

}
