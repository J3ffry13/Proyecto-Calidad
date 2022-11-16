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
  displayedColumns: string[] = ['nro', 'codigo', 'nombre', 'telefono', 'ciudad', 'direccion'];

  constructor(
    private terminalService: TerminalService,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.consultarDatos();

    //TEMPORAL (RLIMINAR UNA VEZ HAYA API)
    
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
  consultarDatos(){
    this.terminalService.getAll().subscribe(
      terminal => { 
        this.listadoTerminales = terminal;
        for (let i = 0; i < this.listadoTerminales.length; i++){
          this.listadoTerminales[i].nro = i + 1;
        }
        console.log(this.listadoTerminales);
        this.dataSource = this.listadoTerminales;
      }
    );
  }

}
