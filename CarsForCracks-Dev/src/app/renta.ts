import { Automovil } from "./automovil";

export interface Renta{
    fecha: Date;
    fechaInicio: Date;
    fechaFin: Date;
    nombre: string;
    tel: string;
    correo: string;
    dias:number;
    auto:Automovil;
}