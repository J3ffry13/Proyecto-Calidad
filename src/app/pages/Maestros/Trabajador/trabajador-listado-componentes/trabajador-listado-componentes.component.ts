import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { TrabajadorModel } from 'src/DataBase/Entities/Maestros/Trabajador.model';
import { TrabajadorService } from 'src/DataBase/Services/Maestros/Trabajador.Service';
//import { TrabajadorRegistroComponentComponent } from '../trabajador-registro-component/trabajador-registro-component.component';

@Component({
  selector: 'app-trabajador-listado-componentes',
  templateUrl: './trabajador-listado-componentes.component.html',
  styleUrls: ['./trabajador-listado-componentes.component.css']
})
export class TrabajadorListadoComponentesComponent implements OnInit {

  dataSource: any[] = []
  listadoTrabajadores: TrabajadorModel[] = []
  displayedColumns: string[] = ['nro', 'codigo', 'funcion', 'usuario', 'actions'];

  constructor(
    private trabajadorService: TrabajadorService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    // this.consultarDatos();

    //TEMPORAL (RLIMINAR UNA VEZ HAYA API)
    this.listadoTrabajadores = [
      {codigo: 1, funcion: 'Trujillo', usuario: 'Lima'},
      {codigo: 2, funcion: 'Trujillo', usuario: 'Lima'},
      {codigo: 3, funcion: 'Trujillo', usuario: 'Lima'},
      {codigo: 4, funcion: 'Trujillo', usuario: 'Lima'},
    ];
    for (let i = 0; i < this.listadoTrabajadores.length; i++){
      this.listadoTrabajadores[i].nro = i + 1;
    }
    this.dataSource = this.listadoTrabajadores;
  }

  /*nuevoReg(element?: TrabajadorModel){
    const dialogRef = this.dialog.open(TrabajadorRegistroComponentComponent, {
      width: '80%',
      data: { data: element },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }*/

  //PARA CUANDO EL API LEVANTE
  // consultarDatos(){
  //   this.trabajadorService.getAll().subscribe(
  //     trabajador => { 
  //       this.listadoTrabajadores = trabajador;
  //       this.dataSource = this.listadoTrabajadores;
  //     }
  //   );
  // }

}
