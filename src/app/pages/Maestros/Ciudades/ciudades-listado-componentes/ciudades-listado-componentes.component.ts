import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CiudadModel } from 'src/DataBase/Entities/Maestros/Ciudad.model';
import { CiudadService } from 'src/DataBase/Services/Maestros/Ciudade.Service';

@Component({
  selector: 'app-ciudades-listado-componentes',
  templateUrl: './ciudades-listado-componentes.component.html',
  styleUrls: ['./ciudades-listado-componentes.component.css']
})
export class CiudadesListadoComponentesComponent implements OnInit {

  dataSource: any[] = []
  listadoResult: CiudadModel[] = []
  displayedColumns: string[] = ['nro', 'codigo','nombre'];

  constructor(
    private ciudadesService: CiudadService,
    public dialog: MatDialog
  ) { }


  
  ngOnInit(): void {
    
    // this.consultarDatos();

    //TEMPORAL (RLIMINAR UNA VEZ HAYA API)
   this.consultarDatos();
   
  }

  // nuevoReg(element?: RutaModel){
  //   const dialogRef = this.dialog.open(RutasRegistroComponentComponent, {
  //     width: '80%',
  //     data: { data: element },
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //     // this.animal = result;
  //   });
  // }
  consultarDatos(){
    this.ciudadesService.getAll().subscribe(
      result => { 
        this.listadoResult = result;
        for (let i = 0; i < this.listadoResult.length; i++){
          this.listadoResult[i].nro = i + 1;
        }
        this.dataSource = this.listadoResult;
      }
    );
  }

}
