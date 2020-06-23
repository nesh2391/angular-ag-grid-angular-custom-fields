import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {AgGridModule} from "ag-grid-angular/main";
import {MyGridApplicationComponent} from "./my-grid-application/my-grid-application.component";
import {RedComponentComponent} from "./red-component/red-component.component";

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';




@NgModule({
  imports:      [ BrowserModule, FormsModule, AgGridModule.withComponents(
            [RedComponentComponent]
        ) ],
  declarations: [ AppComponent, HelloComponent,MyGridApplicationComponent, RedComponentComponent ],
  providers: [],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
