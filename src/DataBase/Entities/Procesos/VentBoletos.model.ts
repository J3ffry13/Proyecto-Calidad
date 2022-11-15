import { AsientosModel } from "../Maestros/Asientos.model";
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
    viajeData: ProgViajeModel;
	asientoData: AsientosModel;
}