import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public page: string = 'initial';

  changePage(page: string) {
    this.page = page;
  }
}
