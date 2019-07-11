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
    return this.http.post('http://localhost:3000/event', event, this.httpOptions);
  }

  public getAllEvents() {
    return this.http.get('http://localhost:3000/event', this.httpOptions);
  }

  public deleteEvent(id){
    return this.http.delete('http://localhost:3000/event/' + id, this.httpOptions);
  }

  public getEvent(id){
    return this.http.get('http://localhost:3000/event/' + id, this.httpOptions);
  }

  public editEvent(id, event){
    return this.http.put('http://localhost:3000/event/' + id, event, this.httpOptions);
  }

}