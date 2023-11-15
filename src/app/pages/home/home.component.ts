import { Component, OnInit, Signal, WritableSignal, effect, signal } from '@angular/core';
import { map } from 'rxjs';
import { BasicApiService } from 'src/app/clients/basic/basic-api.service';
import { CityApiService } from 'src/app/clients/city/city-api.service';
import { City } from 'src/app/clients/city/models/city';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  public message: WritableSignal<string> = signal('');
  public cities: WritableSignal<City[]> = signal([]);
  public show: WritableSignal<boolean> = signal(true);

  constructor(
    private basicApiService: BasicApiService,
    private cityApiService: CityApiService
  ) { }

  ngOnInit(): void {
    this.basicApiService.get().subscribe((res) => this.message.set(res.message))
    this.cityApiService.get().pipe(map((res) => this.shuffleArray(res).splice(0, 1500))).subscribe((res) => this.cities.set(res))
  }

  toggleCities() {
    // this.show.set(!this.show())
  }

  goToCity(city: string) {
    window.open(`https://google.com/search?q=${city.replace(' ', '+')}`, "_blank")
  }

  shuffleArray(array: any[]) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }

    return array
  }
}
