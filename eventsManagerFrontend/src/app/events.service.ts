import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  httpOptions = {
    headers: new HttpHeaders({ 
      'Access-Control-Allow-Origin':'*',
      'Content-Type': 'application/json',
    })
  };

  constructor(private http: HttpClient) { }

  createEvent(event){
    console.log('entrou no create: ', event);
    return this.http.post('http://localhost:3000/event', event, this.httpOptions);
  }

  public getAllEvents() {
    return this.http.get('http://localhost:3000/event', this.httpOptions);
  }

}