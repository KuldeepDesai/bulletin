import { Component } from '@angular/core';
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'mhv-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private auth:AuthService){

  }
  title = 'app';
}
