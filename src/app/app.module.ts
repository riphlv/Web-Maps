import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule }    from '@angular/common/http';
//
import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PanelComponent } from './components/panel/panel.component';
import { AboutComponent } from './components/about/about.component';
import { CommonService } from './services/common.service';
import { DataFormComponent } from './components/data-form/data-form.component';
import { GetMapDataComponent } from './components/get-map-data/get-map-data.component';
import { EditMapDataComponent } from './components/edit-map-data/edit-map-data.component';
import { DataSearchComponent } from './components/data-search/data-search.component';

// Izveidojam routes
const appRoutes: Routes = [ 
  { path: '', component: MapComponent },
  { path: 'about', component: AboutComponent },
  { path: 'add', component: DataFormComponent },
  { path: 'edit/:id', component:EditMapDataComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    NavbarComponent,
    PanelComponent,
    AboutComponent,
    DataFormComponent,
    GetMapDataComponent,
    EditMapDataComponent,
    DataSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LeafletModule.forRoot(), // Pievieno Leaflet kartes aplikacijai
    RouterModule.forRoot(appRoutes), // Pievienojam routes aplikacijai
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
