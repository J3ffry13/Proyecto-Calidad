import { Component, OnInit } from '@angular/core';
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
import { ProgramacionViajesRegistroComponent } from '../programacion-viajes-registro/programacion-viajes-registro.component'


@Component({
  selector: 'app-programacion-viajes-listado',
  templateUrl: './programacion-viajes-listado.component.html',
  styleUrls: ['./programacion-viajes-listado.component.css'],
})
export class ProgramacionViajesListadoComponent implements OnInit {
  dataSource: any[] = [];
  listadoResult: ProgViajeModel[] = [];
  listadoResultf: ProgViajeModel[] = [];
  listadoCiudades: CiudadModel[] = [];
  listadoRutas: RutaModel[] = [];
  listadoUsuarios: UsuarioModel[] = [];
  listadoTrab: TrabajadorModel[] = [];
  listadoBus: BusesModel[] = [];
  displayedColumns: string[] = [
    'nro',
    'codigo',
    'pilotoN',
    'copilotoN',
    'terramozaN',
    'rutaN',
    'busN',
    'actions',
  ];

  constructor(
    private progviajeService: ProgViajesService,
    private rutasService: RutaService,
    private busesService: BusesService,
    private ciudadesService: CiudadService,
    private trabajadorService: TrabajadorService,
    private usuarioService: UsuarioService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.consultarInfo();
  }

  nuevoReg(element?: RutaModel){
    const dialogRef = this.dialog.open(ProgramacionViajesRegistroComponent, {
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
    }).subscribe(
      ({
        requestOne,
        requestTwo,
        requestThree,
        requestFour,
        requestFive,
        requestSix,
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
        this.listadoResult = requestSix;
        for (let i = 0; i < this.listadoResult.length; i++) {
          this.listadoResult[i].nro = i + 1;
          const codPi = this.listadoTrab.find(
            ({ codigo }) => codigo == this.listadoResult[i].piloto
          )?.nombre;
          this.listadoResult[i].pilotoN = codPi == undefined ? '' : codPi;
          const codCo = this.listadoTrab.find(
            ({ codigo }) => codigo == this.listadoResult[i].copiloto
          )?.nombre;
          this.listadoResult[i].copilotoN = codCo == undefined ? '' : codCo;
          const codAs = this.listadoTrab.find(
            ({ codigo }) => codigo == this.listadoResult[i].terramoza
          )?.nombre;
          this.listadoResult[i].terramozaN = codAs == undefined ? '' : codAs;
          const codRu = this.listadoRutas.find(
            ({ codigo }) => codigo == this.listadoResult[i].ruta
          )?.nombreOrigenN + ' -> ' + this.listadoRutas.find(
            ({ codigo }) => codigo == this.listadoResult[i].ruta
          )?.nombreDestinoN;
          this.listadoResult[i].rutaN = codRu == undefined ? '' : codRu;
          const codBu = this.listadoBus.find(
            ({ codigo }) => codigo == this.listadoResult[i].bus
          )?.placa;
          this.listadoResult[i].busN = codBu == undefined ? '' : codBu;
        }
        this.listadoResultf = this.listadoResult.filter(function(obj){
          return obj.estado == '1';
        }); 
        this.dataSource = this.listadoResultf;
      }
    );
  }
}
