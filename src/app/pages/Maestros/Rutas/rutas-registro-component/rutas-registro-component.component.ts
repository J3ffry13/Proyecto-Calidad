import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { RutaModel } from 'src/DataBase/Entities/Maestros/Ruta.model';


@Component({
  selector: 'app-rutas-registro-component',
  templateUrl: './rutas-registro-component.component.html',
  styleUrls: ['./rutas-registro-component.component.css']
})
export class RutasRegistroComponentComponent implements OnInit {

  ruta: FormGroup;
  titulo: string = '';
  rutaR: RutaModel

  constructor(
    public dialogRef: MatDialogRef<RutasRegistroComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void { 
    this.rutaR = this.data.data
    console.log(this.rutaR);
    this.obtenerTitulo()
    this.createFrom()
  }

  createFrom(){
    this.ruta = new FormGroup({
      codigo: new FormControl('', [Validators.required, Validators.minLength(2)]),
      nombreOrigen: new FormControl('', [Validators.required]),
      nombreDestino: new FormControl('', [Validators.required])
    });
    if(this.rutaR != undefined){
      this.ruta.setValue(
        {
          codigo: this.rutaR.codigo,
          nombreOrigen: this.rutaR.nombreOrigen,
          nombreDestino: this.rutaR.nombreDestino
        }
      )
    }
    
  }
  obtenerTitulo(){
    if(this.rutaR != undefined ){
      this.titulo = 'Editar Ruta' + this.rutaR.codigo
    }else {
      this.titulo = 'Nueva Ruta'
    }
  }

  cancelar(){
    this.dialogRef.close();
  }

  guardar(){
    // this.rutaR. 
    //OBTENEMOS DATOS :c
    this.rutaR = this.ruta.getRawValue();
    console.log(this.rutaR);
    //ENVIAR DATOS AL SERVER :c
    this.dialogRef.close();
  }

}
