import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { RutaModel } from 'src/DataBase/Entities/Maestros/Ruta.model';
import { RutaService } from 'src/DataBase/Services/Maestros/Ruta.Service';
import { RutasRegistroComponentComponent } from '../rutas-registro-component/rutas-registro-component.component';

@Component({
  selector: 'app-rutas-component',
  templateUrl: './rutas-component.component.html',
  styleUrls: ['./rutas-component.component.css']
})
export class RutasComponentComponent implements OnInit {
  
  dataSource: any[] = []
  listadoRutas: RutaModel[] = []
  displayedColumns: string[] = ['nro', 'codigo', 'nombreOrigen', 'nombreDestino', 'actions'];

  constructor(
    private rutasService: RutaService,
    public dialog: MatDialog
  ) { }


  
  ngOnInit(): void {
    
    // this.consultarDatos();

    //TEMPORAL (RLIMINAR UNA VEZ HAYA API)
    this.listadoRutas = [
      {codigo: 1, nombreOrigen: 'Trujillo', nombreDestino: 'Lima'},
      {codigo: 2, nombreOrigen: 'Trujillo', nombreDestino: 'Chimbote'},
      {codigo: 3, nombreOrigen: 'Lima', nombreDestino: 'Chimbote'},
      {codigo: 4, nombreOrigen: 'Chimbote', nombreDestino: 'Lima'},
    ];
    for (let i = 0; i < this.listadoRutas.length; i++){
      this.listadoRutas[i].nro = i + 1;
    }
    this.dataSource = this.listadoRutas;
  }

  nuevoReg(element?: RutaModel){
    const dialogRef = this.dialog.open(RutasRegistroComponentComponent, {
      width: '80%',
      data: { data: element },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }
  //PARA CUANDO EL API LEVANTE
  // consultarDatos(){
  //   this.rutasService.getAll().subscribe(
  //     rutas => { 
  //       this.listadoRutas = rutas;
  //       this.dataSource = this.listadoRutas;
  //     }
  //   );
  // }

}
