import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { filter } from 'rxjs';
import { CiudadModel } from 'src/DataBase/Entities/Maestros/Ciudad.model';
import { RutaModel } from 'src/DataBase/Entities/Maestros/Ruta.model';
import { CiudadService } from 'src/DataBase/Services/Maestros/Ciudade.Service';
import { RutaService } from 'src/DataBase/Services/Maestros/Ruta.Service';
import { RutasRegistroComponentComponent } from '../rutas-registro-component/rutas-registro-component.component';

@Component({
  selector: 'app-rutas-component',
  templateUrl: './rutas-component.component.html',
  styleUrls: ['./rutas-component.component.css']
})
export class RutasComponentComponent implements OnInit {
  
  dataSource: any[] = []
  listadoResult: CiudadModel[] = []
  listadoRutas: RutaModel[] = []
  displayedColumns: string[] = ['nro', 'codigo', 'nombreOrigenN', 'nombreDestinoN'];

  constructor(
    private rutasService: RutaService,
    private ciudadesService: CiudadService,
    public dialog: MatDialog
  ) { }


  
  ngOnInit(): void {
    this.consultarDatos();

  }

  consultarDatos(){
    this.ciudadesService.getAll().subscribe(
      result => { 
        this.listadoResult = result;
        for (let i = 0; i < this.listadoResult.length; i++){
          this.listadoResult[i].nro = i + 1;
        }
      }
    );
    this.rutasService.getAll().subscribe(
      rutas => { 
        this.listadoRutas = rutas;
        for (let i = 0; i < this.listadoRutas.length; i++){
          this.listadoRutas[i].nro = i + 1;
          const origenN = this.listadoResult.find(({codigo})=> codigo == this.listadoRutas[i].nombreOrigen)?.nombre 
          this.listadoRutas[i].nombreOrigenN = origenN == undefined ? '' : origenN
          const destinoN = this.listadoResult.find(({codigo})=> codigo == this.listadoRutas[i].nombreDestino)?.nombre 
          this.listadoRutas[i].nombreDestinoN = destinoN == undefined ? '' : destinoN      
        }
        this.dataSource = this.listadoRutas;
    }
    );
  }

}
