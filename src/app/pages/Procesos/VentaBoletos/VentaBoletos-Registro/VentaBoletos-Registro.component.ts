import { Component, OnInit, Inject } from '@angular/core';
import { forkJoin, of, throwError } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BusesModel } from 'src/DataBase/Entities/Maestros/Buses.model';
import { CiudadModel } from 'src/DataBase/Entities/Maestros/Ciudad.model';
import { RutaModel } from 'src/DataBase/Entities/Maestros/Ruta.model';
import { TrabajadorModel } from 'src/DataBase/Entities/Maestros/Trabajador.model';
import { UsuarioModel } from 'src/DataBase/Entities/Maestros/Usuario';
//import { ProgViajeModel } from 'src/DataBase/Entities/Procesos/ProgViaje.model';
import { BusesService } from 'src/DataBase/Services/Maestros/Buses.Service';
import { CiudadService } from 'src/DataBase/Services/Maestros/Ciudade.Service';
import { RutaService } from 'src/DataBase/Services/Maestros/Ruta.Service';
import { TrabajadorService } from 'src/DataBase/Services/Maestros/Trabajador.Service';
import { UsuarioService } from 'src/DataBase/Services/Maestros/Usuario.Service';
import { ServicioService } from 'src/DataBase/Services/Maestros/Servicio.Service';
import { CompraBoletosService } from 'src/DataBase/Services/Procesos/CompraBoletos.Service';
import { AsientosService } from 'src/DataBase/Services/Maestros/Asientos.Service';
import { ProgViajesService } from 'src/DataBase/Services/Procesos/ProgramacionViajes.Service';
import { ServicioModel } from 'src/DataBase/Entities/Maestros/Servicio.model';
import { AsientosModel } from 'src/DataBase/Entities/Maestros/Asientos.model';
import { VentBoletosModel } from 'src/DataBase/Entities/Procesos/VentBoletos.model';
import { ProgViajeModel } from 'src/DataBase/Entities/Procesos/ProgViaje.model';
import swal from 'sweetalert2';

@Component({
  selector: 'app-VentaBoletos-registro',
  templateUrl: './VentaBoletos-Registro.component.html',
  styleUrls: ['./VentaBoletos-Registro.component.css']
})
export class VentaBoletosRegistroComponent implements OnInit {

  prog: FormGroup;
  titulo: string = '';
  programacion: any

  listadoResult: VentBoletosModel[] = [];
  listadoViajes: ProgViajeModel[] = [];
  listadoViajesf: ProgViajeModel[] = [];
  listadoCiudades: CiudadModel[] = [];
  listadoRutas: RutaModel[] = [];
  listadoAsientos: AsientosModel[] = [];
  listadoAsientosf: AsientosModel[] = [];
  listadoUsuarios: UsuarioModel[] = [];
  listadoServicios: ServicioModel[] = [];
  listadoTrab: TrabajadorModel[] = [];
  listadoBus: BusesModel[] = [];

  constructor(
    public dialogRef: MatDialogRef<VentaBoletosRegistroComponent>,
    private rutasService: RutaService,
    private busesService: BusesService,
    private ciudadesService: CiudadService,
    private trabajadorService: TrabajadorService,
    private usuarioService: UsuarioService,
    private progviajeService: ProgViajesService,
    private asientoService: AsientosService,
    private boletosService: CompraBoletosService,
    private servicioService: ServicioService,
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
      codigo: new FormControl('', [Validators.required]),
      ruta : new FormControl('', [Validators.required]),
      fecha : new FormControl('', [Validators.required]),
      viaje : new FormControl('', [Validators.required]),
      asiento : new FormControl('', [Validators.required]),
      pasajero : new FormControl('', [Validators.required]),
    });
    if(this.programacion !== undefined){
      this.prog.setValue(
        {
          codigo: this.programacion.codigo,
          ruta: this.programacion.viajeData.ruta,
          fecha: this.programacion.fecha,
          viaje: this.programacion.viaje,
          asiento: this.programacion.asiento,
          pasajero:this.programacion.pasajero,
        }
      )
    }

    this.prog.get("ruta")?.valueChanges.subscribe((selectedValue) => {
      console.log(this.listadoViajes);
      console.log(this.listadoViajes.filter(
        (f) => f.ruta == selectedValue,
      ));
      this.listadoViajesf = this.listadoViajes.filter(
        (f) => f.ruta == selectedValue,
      );
    });

    // this.prog.get("fecha")?.valueChanges.subscribe((selectedValue) => {
    //   this.listadoViajesf = this.listadoViajes.filter(
    //     (f) => f.fecha == selectedValue,
    //   );
    // });

    this.prog.get("viaje")?.valueChanges.subscribe((selectedValue) => {
      var busID = this.listadoViajesf.find(
        (f) => f.codigo == selectedValue,
      )?.bus;
      this.listadoAsientosf = this.listadoAsientos.filter(
        (f) => f.bus === busID,
      );
    });

  }
  obtenerTitulo(){
    if(this.programacion != undefined ){
      this.titulo = 'Editar Boleto ' + this.programacion.codigo
      this.prog.controls['codigo'].disable();
    }else {
      this.titulo = 'Nuevo Boleto'
    }
  }

  cancelar(){
    this.dialogRef.close();
  }

  guardar(){
    //ENVIAR DATOS AL SERVER :c
    if(this.programacion != undefined ){
      this.programacion = this.prog.getRawValue();
      this.boletosService.update(this.programacion).subscribe(
        res => {
          if(res.msj == 'OK'){
            swal.fire('Editado de datos exitoso', `Ingreso ${this.programacion.codigo} editado con exito`, 'success')
          }
          else{
            swal.fire('Error de registro', `Ingreso ${this.programacion.codigo} ya existe o con completo campos`, 'warning')
          }
        }
      )
    }else {
      this.programacion = this.prog.getRawValue();

      this.boletosService.create(this.programacion).subscribe(
        res => {
          if(res.msj == 'OK'){
            swal.fire('Ingreso de datos exitoso', `Ingreso ${this.programacion.codigo} ingresado con exito`, 'success')
          }
          else{
            swal.fire('Error de registro', `Ingreso ${this.programacion.codigo} ya existe o con completo campos`, 'warning')
          }
        }
      )
    }

    this.dialogRef.close();
  }

  consultarInfo() {
    forkJoin({
      requestOne: this.ciudadesService.getAll(),
      requestTwo: this.rutasService.getAll(),
      requestThree: this.usuarioService.getAll(),
      requestFour: this.trabajadorService.getAll(),
      requestFive: this.busesService.getAll(),
      requestSix: this.progviajeService.getAll(),
      requestSeven: this.asientoService.getAll(),
      requestFinal: this.boletosService.getAll(),
    }).subscribe(
      ({
        requestOne,
        requestTwo,
        requestThree,
        requestFour,
        requestFive,
        requestSix,
        requestSeven,
        requestFinal,
      }) => {
        (this.listadoCiudades = requestOne), (this.listadoRutas = requestTwo);
        for (let i = 0; i < this.listadoRutas.length; i++) {
          const origenN = this.listadoCiudades.find(
            ({ codigo }) => codigo == this.listadoRutas[i].nombreOrigen
          )?.nombre;
          this.listadoRutas[i].nombreOrigenN = origenN == undefined ? '' : origenN;
          const destinoN = this.listadoCiudades.find(
            ({ codigo }) => codigo == this.listadoRutas[i].nombreDestino
          )?.nombre;
          this.listadoRutas[i].nombreDestinoN = destinoN == undefined ? '' : destinoN;
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
        this.listadoViajes = requestSix;
        for (let i = 0; i < this.listadoViajes.length; i++) {
          const codPi = this.listadoTrab.find(
            ({ codigo }) => codigo == this.listadoViajes[i].piloto
          )?.nombre;
          this.listadoViajes[i].pilotoN = codPi == undefined ? '' : codPi;
          const codCo = this.listadoTrab.find(
            ({ codigo }) => codigo == this.listadoViajes[i].copiloto
          )?.nombre;
          this.listadoViajes[i].copilotoN = codCo == undefined ? '' : codCo;
          const codAs = this.listadoTrab.find(
            ({ codigo }) => codigo == this.listadoViajes[i].terramoza
          )?.nombre;
          this.listadoViajes[i].terramozaN = codAs == undefined ? '' : codAs;
          const codRu = this.listadoRutas.find(
            ({ codigo }) => codigo == this.listadoViajes[i].ruta
          )?.nombreOrigenN + ' -> ' + this.listadoRutas.find(
            ({ codigo }) => codigo == this.listadoViajes[i].ruta
          )?.nombreDestinoN;
          this.listadoViajes[i].rutaN = codRu == undefined ? '' : codRu;
          const codBu = this.listadoBus.find(
            ({ codigo }) => codigo == this.listadoViajes[i].bus
          )?.placa;
          this.listadoViajes[i].busN = codBu == undefined ? '' : codBu;
          const codSe = this.listadoBus.find(
            ({ codigo }) => codigo == this.listadoViajes[i].bus
          )?.servicio;
          this.listadoViajes[i].busS = codSe == undefined ? '' : codSe;
        }
        this.listadoViajesf = this.listadoViajes
        this.listadoAsientos = requestSeven;
        this.listadoResult = requestFinal;
        for (let i = 0; i < this.listadoResult.length; i++) {
          this.listadoResult[i].nro = i + 1;
          const usuarioN = this.listadoUsuarios.find(
            ({ codigo }) => codigo == this.listadoResult[i].pasajero
          )?.nombre;
          this.listadoResult[i].pasajeroN = usuarioN == undefined ? '' : usuarioN;
          const dni = this.listadoUsuarios.find(
            ({ codigo }) => codigo == this.listadoResult[i].pasajero
          )?.dni;
          this.listadoResult[i].pasajerodni = dni == undefined ? '' : dni;
          const bus = this.listadoViajes.find(
            ({ codigo }) => codigo == this.listadoResult[i].viaje
          )?.bus;
          this.listadoResult[i].bus = bus == undefined ? '' : bus;
          const viaje = this.listadoViajes.find(
            ({ codigo }) => codigo == this.listadoResult[i].viaje
          );

          let xd: any
          this.listadoResult[i].viajeData = viaje == undefined ? xd : viaje;
        }
        for (let i = 0; i < this.listadoResult.length; i++) {
          const viaje = this.listadoAsientos.find(
            ({ codigo }) => codigo == this.listadoResult[i].asiento
          );
          let xd: any
          this.listadoResult[i].asientoData = viaje == undefined ? xd : viaje;

          const precio = this.listadoBus.find(
            ({ codigo }) => codigo == this.listadoResult[i].bus
          );
          let xd1: any
          this.listadoResult[i].busData = precio == undefined ? xd1 : precio;
        }
      }
    );
  }
}
