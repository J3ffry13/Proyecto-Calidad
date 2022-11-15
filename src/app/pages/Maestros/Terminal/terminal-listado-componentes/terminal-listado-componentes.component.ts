import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { TerminalModel } from 'src/DataBase/Entities/Maestros/Terminal.model';
import { TerminalService } from 'src/DataBase/Services/Maestros/Terminal.Service';

@Component({
  selector: 'app-terminal-listado-componentes',
  templateUrl: './terminal-listado-componentes.component.html',
  styleUrls: ['./terminal-listado-componentes.component.css']
})
export class TerminalListadoComponentesComponent implements OnInit {

  dataSource: any[] = []
  listadoTerminales: TerminalModel[] = []
  displayedColumns: string[] = ['nro', 'codigo', 'nombre', 'telefono', 'ciudad', 'direccion','actions'];

  constructor(
    private terminalService: TerminalService,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
    // this.consultarDatos();

    //TEMPORAL (RLIMINAR UNA VEZ HAYA API)
    this.listadoTerminales = [
      {codigo: 1, nombre: 'Trujillo', telefono: '4563432', ciudad: 'Lima', direccion:'Av. Perú 3680'},
      {codigo: 2, nombre: 'Trujillo', telefono: '284667', ciudad: 'Trujillo', direccion:'Av. America Sur 1040'},
      {codigo: 3, nombre: 'Trujillo', telefono: '3453421', ciudad: 'Chimbote', direccion:'Av. La Grande 321'},
    ];
    for (let i = 0; i < this.listadoTerminales.length; i++){
      this.listadoTerminales[i].nro = i + 1;
    }
    this.dataSource = this.listadoTerminales;
  }

  /*nuevoReg(element?: TerminalModel){
    const dialogRef = this.dialog.open(TerminalRegistroComponentComponent, {
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
  //   this.terminalService.getAll().subscribe(
  //     terminal => { 
  //       this.listadoTerminales = terminal;
  //       this.dataSource = this.listadoTerminales;
  //     }
  //   );
  // }

}
