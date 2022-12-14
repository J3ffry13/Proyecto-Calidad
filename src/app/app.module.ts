import { NgModule, Component, Inject } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatPaginatorModule} from '@angular/material/paginator';

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
import { CiudadesListadoComponentesComponent } from './pages/Maestros/Ciudades/ciudades-listado-componentes/ciudades-listado-componentes.component';
import { TrabajadorListadoComponentesComponent } from './pages/Maestros/Trabajador/trabajador-listado-componentes/trabajador-listado-componentes.component';
import { TerminalListadoComponentesComponent } from './pages/Maestros/Terminal/terminal-listado-componentes/terminal-listado-componentes.component';
import { VentaBoletosListadoComponent } from './pages/Procesos/VentaBoletos/VentaBoletos-Listado/VentaBoletos-Listado.component';
import { VentaBoletosRegistroComponent } from './pages/Procesos/VentaBoletos/VentaBoletos-Registro/VentaBoletos-Registro.component';



const routes: Routes = [
  {path: '', component: InicioComponent },
  //MAESTROS  
  {path: 'maestros/rutas', component: RutasComponentComponent },
  {path: 'maestros/ciudades', component: CiudadesListadoComponentesComponent },
  {path: 'maestros/terminales', component: TerminalListadoComponentesComponent },
  {path: 'maestros/rutas/save', component: RutasRegistroComponentComponent },
  //PROCESOS
  {path: 'procesos/programacion', component: ProgramacionViajesListadoComponent },
  {path: 'procesos/ventaBoletos', component: VentaBoletosListadoComponent },
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
    TrabajadorListadoComponentesComponent,
    TerminalListadoComponentesComponent,
    VentaBoletosListadoComponent,
    VentaBoletosRegistroComponent,
  ],
  entryComponents: [
    RutasRegistroComponentComponent,
    ProgramacionViajesRegistroComponent,
    VentaBoletosRegistroComponent,
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
    MatPaginatorModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
