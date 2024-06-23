import { Automovil } from "./automovil";
import { Usuarios } from "./usuarios";

export interface Renta{
    fecha: Date;
    fechaInicio: Date;
    fechaFin: Date;
    usuario:Usuarios;
    dias:number;
    auto:Automovil;
}