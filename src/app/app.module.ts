import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { GridComponent } from './grid/grid.component';
import { FrameComponent } from './frame/frame.component';
import { BigBoxComponent } from './components/big-box/big-box.component';
import { BarComponent } from './components/bar/bar.component';
import { SmallBoxComponent } from './components/small-box/small-box.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GridComponent,
    BigBoxComponent,
    SmallBoxComponent,
    BarComponent,
    FrameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
