import { Component, OnInit, Inject } from '@angular/core';
import { forkJoin, of, throwError } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BusesModel } from 'src/DataBase/Entities/Maestros/Buses.model';
import { CiudadModel } from 'src/DataBase/Entities/Maestros/Ciudad.model';
import { RutaModel } from 'src/DataBase/Entities/Maestros/Ruta.model';
import { TrabajadorModel } from 'src/DataBase/Entities/Maestros/Trabajador.model';
import { UsuarioModel } from 'src/DataBase/Entities/Maestros/Usuario';
import { ProgViajeModel } from 'src/DataBase/Entities/Procesos/ProgViaje.model';
import { BusesService } from 'src/DataBase/Services/Maestros/Buses.Service';
import { CiudadService } from 'src/DataBase/Services/Maestros/Ciudade.Service';
import { RutaService } from 'src/DataBase/Services/Maestros/Ruta.Service';
import { TrabajadorService } from 'src/DataBase/Services/Maestros/Trabajador.Service';
import { UsuarioService } from 'src/DataBase/Services/Maestros/Usuario.Service';

@Component({
  selector: 'app-VentaBoletos-registro',
  templateUrl: './VentaBoletos-Registro.component.html',
  styleUrls: ['./VentaBoletos-Registro.component.css']
})
export class VentaBoletosRegistroComponent implements OnInit {

  prog: FormGroup;
  titulo: string = '';
  programacion: ProgViajeModel

  listadoResult: ProgViajeModel[] = [];
  listadoResultf: ProgViajeModel[] = [];
  listadoCiudades: CiudadModel[] = [];
  listadoRutas: RutaModel[] = [];
  listadoUsuarios: UsuarioModel[] = [];
  listadoTrab: TrabajadorModel[] = [];
  listadoBus: BusesModel[] = [];

  constructor(
    public dialogRef: MatDialogRef<VentaBoletosRegistroComponent>,
    private rutasService: RutaService,
    private busesService: BusesService,
    private ciudadesService: CiudadService,
    private trabajadorService: TrabajadorService,
    private usuarioService: UsuarioService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void { 
    this.programacion = this.data.data
    console.log(this.programacion);
    this.consultarInfo();
    this.createFrom();
    this.obtenerTitulo();
  }

  createFrom(){
    this.prog = new FormGroup({
      codigo: new FormControl('', [Validators.required, Validators.minLength(2)]),
      piloto: new FormControl('', [Validators.required]),
      copiloto: new FormControl('', [Validators.required]),
      terramoza: new FormControl('', [Validators.required]),
      ruta: new FormControl('', [Validators.required]),
      bus: new FormControl('', [Validators.required]),
      // estado: new FormControl('', [Validators.required]),
    });
    if(this.programacion != undefined){
      this.prog.setValue(
        {
          codigo: this.programacion.codigo,
          // estado: this.programacion.estado,
          piloto: this.programacion.piloto,
          copiloto: this.programacion.copiloto,
          terramoza: this.programacion.terramoza,
          ruta: this.programacion.ruta,
          bus: this.programacion.bus,
        }
      )
    }
    
  }
  obtenerTitulo(){
    if(this.programacion != undefined ){
      this.titulo = 'Editar Programacion ' + this.programacion.codigo
      this.prog.controls['codigo'].disable();
    }else {
      this.titulo = 'Nueva Programacion'
    }
  }

  cancelar(){
    this.dialogRef.close();
  }

  guardar(){
    
    //OBTENEMOS DATOS :c
    this.programacion = this.prog.getRawValue();
    console.log(this.programacion);
    //ENVIAR DATOS AL SERVER :c

    this.dialogRef.close();
  }

  consultarInfo() {
    forkJoin({
      requestOne: this.ciudadesService.getAll(),
      requestTwo: this.rutasService.getAll(),
      requestThree: this.usuarioService.getAll(),
      requestFour: this.trabajadorService.getAll(),
      requestFive: this.busesService.getAll(),
    }).subscribe(
      ({
        requestOne,
        requestTwo,
        requestThree,
        requestFour,
        requestFive
      }) => {
        (this.listadoCiudades = requestOne), (this.listadoRutas = requestTwo);
        for (let i = 0; i < this.listadoRutas.length; i++) {
          const origenN = this.listadoCiudades.find(
            ({ codigo }) => codigo == this.listadoRutas[i].nombreOrigen
          )?.nombre;
          this.listadoRutas[i].nombreOrigenN =
            origenN == undefined ? '' : origenN;
          const destinoN = this.listadoCiudades.find(
            ({ codigo }) => codigo == this.listadoRutas[i].nombreDestino
          )?.nombre;
          this.listadoRutas[i].nombreDestinoN =
            destinoN == undefined ? '' : destinoN;
        }
        this.listadoUsuarios = requestThree;
        this.listadoTrab = requestFour;
        for (let i = 0; i < this.listadoTrab.length; i++) {
          const usuarioN = this.listadoUsuarios.find(
            ({ codigo }) => codigo == this.listadoTrab[i].usuario
          )?.nombre;
          this.listadoTrab[i].nombre = usuarioN == undefined ? '' : usuarioN;
          const dni = this.listadoUsuarios.find(
            ({ codigo }) => codigo == this.listadoTrab[i].usuario
          )?.dni;
          this.listadoTrab[i].dni = dni == undefined ? '' : dni;
        }
        this.listadoBus = requestFive;
      }
    );
  }
}
