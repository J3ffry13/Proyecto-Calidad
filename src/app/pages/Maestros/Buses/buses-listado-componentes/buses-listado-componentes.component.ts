import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { BusesModel } from 'src/DataBase/Entities/Maestros/Buses.model';
import { BusesService } from 'src/DataBase/Services/Maestros/Buses.Service';

@Component({
  selector: 'app-buses-listado-componentes',
  templateUrl: './buses-listado-componentes.component.html',
  styleUrls: ['./buses-listado-componentes.component.css']
})
export class BusesListadoComponentesComponent implements OnInit {

  dataSource: any[] = []
  listadoBuses: BusesModel[] = []
  displayedColumns: string[] = ['nro', 'codigo', 'placa', 'marca', 'modelo', 'serie','pisos', 'asientos', 'servicio','actions'];

  constructor(
    private busesService: BusesService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    // this.consultarDatos();

    //TEMPORAL (RLIMINAR UNA VEZ HAYA API)
    this.listadoBuses = [
      {codigo: 1, placa: 'ADU-456', marca: 'Toyota', modelo: 'ASIS-2', serie: 'MAXI', pisos: 2, asientos: 40, servicio: 'Bus Cama 180'},
      {codigo: 2, placa: 'ADU-457', marca: 'Toyota', modelo: 'ASIS-3', serie: 'MAXI', pisos: 2, asientos: 40, servicio: 'Bus Cama 160'},
      {codigo: 3, placa: 'ADU-458', marca: 'Toyota', modelo: 'ASIS-3', serie: 'MAXI', pisos: 2, asientos: 40, servicio: 'Bus Cama 140'},
    ];
    for (let i = 0; i < this.listadoBuses.length; i++){
      this.listadoBuses[i].nro = i + 1;
    }
    this.dataSource = this.listadoBuses;
  }

  /*nuevoReg(element?: BusesModel){
    const dialogRef = this.dialog.open(BusesRegistroComponentComponent, {
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
  //   this.busesService.getAll().subscribe(
  //     buses => { 
  //       this.listadoBuses = buses;
  //       this.dataSource = this.listadoBuses;
  //     }
  //   );
  // }

}
