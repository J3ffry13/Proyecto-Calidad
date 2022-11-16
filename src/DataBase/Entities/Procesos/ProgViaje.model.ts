export class ProgViajeModel {
    nro: number;
    codigo: string
	piloto: string;
    pilotoN: string
    busS: string;
    copiloto: string;
    copilotoN: string
    terramoza: string
    terramozaN: string
	ruta: string;
    rutaN: string
    bus: string;
    busN: string
    fecha: string;
    estado: string

    construc(){
        this.nro = 0;
        this.codigo = ''
        this.piloto = ''
        this.pilotoN = ''
        this.copiloto = ''
        this.copilotoN = ''
        this.terramoza = ''
        this.terramozaN = ''
        this.ruta = ''
        this.rutaN = ''
        this.bus = ''
        this.busN = ''
        this.estado = '0'

    }
}