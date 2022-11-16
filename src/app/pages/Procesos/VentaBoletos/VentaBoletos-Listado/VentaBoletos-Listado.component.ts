import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { forkJoin, of, throwError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CiudadModel } from 'src/DataBase/Entities/Maestros/Ciudad.model';
import { RutaModel } from 'src/DataBase/Entities/Maestros/Ruta.model';
import { TrabajadorModel } from 'src/DataBase/Entities/Maestros/Trabajador.model';
import { UsuarioModel } from 'src/DataBase/Entities/Maestros/Usuario';
import { BusesModel } from 'src/DataBase/Entities/Maestros/Buses.model';
import { ProgViajeModel } from 'src/DataBase/Entities/Procesos/ProgViaje.model';
import { CiudadService } from 'src/DataBase/Services/Maestros/Ciudade.Service';
import { RutaService } from 'src/DataBase/Services/Maestros/Ruta.Service';
import { TrabajadorService } from 'src/DataBase/Services/Maestros/Trabajador.Service';
import { UsuarioService } from 'src/DataBase/Services/Maestros/Usuario.Service';
import { ProgViajesService } from 'src/DataBase/Services/Procesos/ProgramacionViajes.Service';
import { BusesService } from 'src/DataBase/Services/Maestros/Buses.Service';
import { VentaBoletosRegistroComponent } from '../VentaBoletos-Registro/VentaBoletos-Registro.component'
import { CompraBoletosService } from 'src/DataBase/Services/Procesos/CompraBoletos.Service';
import { VentBoletosModel } from 'src/DataBase/Entities/Procesos/VentBoletos.model';
import { AsientosModel } from 'src/DataBase/Entities/Maestros/Asientos.model';
import {MatPaginator} from '@angular/material/paginator';
import { AsientosService } from 'src/DataBase/Services/Maestros/Asientos.Service';
import { ServicioService } from 'src/DataBase/Services/Maestros/Servicio.Service';
import { ServicioModel } from 'src/DataBase/Entities/Maestros/Servicio.model';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-VentaBoletos-listado',
  templateUrl: './VentaBoletos-Listado.component.html',
  styleUrls: ['./VentaBoletos-Listado.component.css'],
})
export class VentaBoletosListadoComponent implements OnInit {
  dataSource = new MatTableDataSource<VentBoletosModel>()
  listadoResult: VentBoletosModel[] = [];
  listadoViajes: ProgViajeModel[] = [];
  listadoViajesf: ProgViajeModel[] = [];
  listadoCiudades: CiudadModel[] = [];
  listadoRutas: RutaModel[] = [];
  listadoAsientos: AsientosModel[] = [];
  listadoUsuarios: UsuarioModel[] = [];
  listadoServicios: ServicioModel[] = [];
  listadoTrab: TrabajadorModel[] = [];
  listadoBus: BusesModel[] = [];
  displayedColumns: string[] = [
    'nro',
    'codigo',
    'pasajero',
    'asiento',
    'ruta',
    'fecha',
    'bus',
    'servicio',
    'precio',
    'actions',
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private progviajeService: ProgViajesService,
    private rutasService: RutaService,
    private busesService: BusesService,
    private ciudadesService: CiudadService,
    private asientoService: AsientosService,
    private trabajadorService: TrabajadorService,
    private usuarioService: UsuarioService,
    private boletosService: CompraBoletosService,
    private servicioService: ServicioService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.consultarInfo();
  }

  nuevoReg(element?: RutaModel){
    const dialogRef = this.dialog.open(VentaBoletosRegistroComponent, {
      width: '80%',
      data: { data: element },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.consultarInfo();
    });
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
        }
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
        this.dataSource.data = this.listadoResult;
        this.dataSource.paginator = this.paginator;
      }
    );
  }
}
