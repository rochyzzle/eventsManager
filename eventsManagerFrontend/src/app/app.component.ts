import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { EventsService } from './events.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  public page: string;
  public events: object[];
  public filter: string = 'all';
  public eventToBeEdited: object;

  constructor(private eventsService: EventsService, private cdr: ChangeDetectorRef){}

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

  sumbitEdit(id){
    const name = (<HTMLInputElement>document.getElementById("editNome")).value;
    const email = (<HTMLInputElement>document.getElementById("editEmail")).value;
    const local = (<HTMLInputElement>document.getElementById("editLocal")).value;
    const image = (<HTMLInputElement>document.getElementById("editImagem")).value;
    const date = (<HTMLInputElement>document.getElementById("editData")).value;
    const category = (<HTMLInputElement>document.getElementById("editCategoria")).value;
    const description = (<HTMLInputElement>document.getElementById("editDescricao")).value;

    const event = {
      name: name,
      email: email,
      local: local,
      image: image,
      date: date,
      category: category,
      description: description
    }

    this.eventsService.editEvent(id, event).subscribe(response => {
      this.eventsService.getAllEvents().subscribe(events => {
        this.events = events['data']['events'];
      })
    });

    this.page = 'events';
  }

  deleteEvent(id):void{
    this.eventsService.deleteEvent(id).subscribe(cenas => {
      this.eventsService.getAllEvents().subscribe(events => {
        this.events = events['data']['events'];
      })
    });

    this.page = 'events';
  }

  applyFilter(event){
    this.filter = event;
  }

  editEvent(id) {
    this.eventsService.getEvent(id).subscribe(response => {
      this.eventToBeEdited = response['data']['event'];
      this.page = 'edit';
    });
  }

  ngOnInit(){
    this.eventsService.getAllEvents().subscribe(events => {
      this.events = events['data']['events'];
      this.page = 'initial';
    });
    
  }

}
