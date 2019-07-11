import { Component, OnInit } from '@angular/core';
import { EventsService } from './events.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  public page: string = 'initial';
  public events;

  constructor(private eventsService: EventsService){}

  changePage(page: string) {
    this.page = page;
  }

  submitEvent() {
    const name = (<HTMLInputElement>document.getElementById("nome")).value;
    const email = (<HTMLInputElement>document.getElementById("email")).value;
    const local = (<HTMLInputElement>document.getElementById("local")).value;
    const image = (<HTMLInputElement>document.getElementById("imagem")).value;
    const date = (<HTMLInputElement>document.getElementById("data")).value;
    const category = (<HTMLInputElement>document.getElementById("categoria")).value;
    const description = (<HTMLInputElement>document.getElementById("descricao")).value;

    const event = {
      name: name,
      email: email,
      local: local,
      image: image,
      date: date,
      category: category,
      description: description
    }

    this.eventsService.createEvent(event).subscribe(response => {
      this.eventsService.getAllEvents().subscribe(events => {
        this.events = events['data']['events'];
      })
    });

    this.page = 'events';

  }

  ngOnInit(){
    this.eventsService.getAllEvents().subscribe(events => {
      this.events = events['data']['events'];
    });
    
  }

}
