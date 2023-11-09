import { Component, OnInit, effect, signal } from '@angular/core';
import { BasicApiService } from 'src/app/clients/basic/basic-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  public message = signal('');

  constructor(
    private basicS: BasicApiService
  ) {
    effect(() => console.log(this.message()));
  }

  ngOnInit(): void {
    this.basicS.get().subscribe((res) => this.message.set(res.message))
  }

}
