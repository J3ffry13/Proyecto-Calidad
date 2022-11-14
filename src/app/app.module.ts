import { NgModule, Component, Inject } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { RouterModule,Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


import { InicioComponent } from './pages/index/inicio.component';
import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footer/footer.component';
import { ProgramacionViajesListadoComponent } from './pages/Procesos/ProgramacionViajes/programacion-viajes-listado/programacion-viajes-listado.component';
import { ProgramacionViajesRegistroComponent } from './pages/Procesos/ProgramacionViajes/programacion-viajes-registro/programacion-viajes-registro.component';
import { RutasComponentComponent } from './pages/Maestros/Rutas/rutas-Listado-component/rutas-component.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RutasRegistroComponentComponent } from './pages/Maestros/Rutas/rutas-registro-component/rutas-registro-component.component';
import { CiudadesListadoComponentesComponent } from './pages/Maestros/Ciudades/ciudades-listado-componentes/ciudades-listado-componentes.component'


const routes: Routes = [
  {path: '', component: InicioComponent },
  //MAESTROS  
  {path: 'maestros/rutas', component: RutasComponentComponent },
  {path: 'maestros/ciudades', component: CiudadesListadoComponentesComponent },
  {path: 'maestros/rutas/save', component: RutasRegistroComponentComponent },
  //PROCESOS
  {path: 'procesos/programacion', component: ProgramacionViajesListadoComponent },
]

@NgModule({
  declarations: [
    InicioComponent,
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProgramacionViajesListadoComponent,
    ProgramacionViajesRegistroComponent,
    RutasComponentComponent,
    RutasRegistroComponentComponent,
    CiudadesListadoComponentesComponent,
  ],
  entryComponents: [
    RutasRegistroComponentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatTableModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
