import { AsientosModel } from "../Maestros/Asientos.model";
import { BusesModel } from "../Maestros/Buses.model";
import { ServicioModel } from "../Maestros/Servicio.model";
import { ProgViajeModel } from "./ProgViaje.model";

export class VentBoletosModel {
    nro: number;
    codigo: string
	pasajero: string;
	pasajeroN: string;
    pasajerodni: string;
	asiento: string;
	asientoN: string;
	viaje: string;
	fecha: string;
	bus: string;
    viajeData: ProgViajeModel;
	asientoData: AsientosModel;
	servicioData: ServicioModel;
	busData: BusesModel;
}