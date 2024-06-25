import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, getAuth, updateProfile, signOut, User } from '@angular/fire/auth';
import { Firestore, collection, doc, setDoc, query, where, getDocs, getDoc, addDoc, Timestamp, deleteDoc } from '@angular/fire/firestore';
import { FormGroup } from '@angular/forms';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { Usuarios } from './usuarios';
import { Renta } from './renta';
import { CitasService } from './citas.service';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {


  constructor(private auth:Auth, private firestore:Firestore, private citasService:CitasService) {  }

  valor:string|null = '';
  usuario:Usuarios = {
    nombre:'',
    tel:'',
    correo:'',
    pass:''
  }
  datosCliente:Renta = {
    fecha: new Date(),
    fechaInicio: new Date(),
    fechaFin: new Date(),
    usuario: {
      nombre:'',
      tel:'',
      correo:'',
      pass:''
    },
    dias:0,
    auto: {
      nombre:'',
      descrip: '',
      anio: 0,
      img: '',
      marca: '',
      costo: 0,
    },
  }
  
  clientes: Renta [] = [];

  registro(formRegistro:FormGroup){
    setDoc(doc(this.firestore, "usuarios", formRegistro.value.correo),{
      nombre : formRegistro.value.nombre, 
      tel : formRegistro.value.tel, 
      correo : formRegistro.value.correo,
      pass: formRegistro.value.pass,
    });
    return createUserWithEmailAndPassword(this.auth, formRegistro.value.correo, formRegistro.value.pass);
  }

  async registroCita(renta:Renta){
    await addDoc(collection(this.firestore, "citas"),{
      fecha: renta.fecha,
      fechaInicio: renta.fechaInicio,
      fechaFin: renta.fechaFin,
      usuario: {
        nombre: renta.usuario.nombre,
        tel: renta.usuario.tel,
        correo: renta.usuario .correo,
        pass:renta.usuario.pass
      },
      dias: renta.dias,
      auto: {
        nombre: renta.auto.nombre,
        descrip: renta.auto.descrip,
        anio: renta.auto.anio,
        img: renta.auto.img,
        marca: renta.auto.marca,
        costo: renta.auto.costo,
      },
      correo: renta.usuario.correo
    });
  }

  iniciar(correo:string, pass:string){
    const auth = getAuth();
      signInWithEmailAndPassword(auth, correo, pass)
        .then((userCredential) => {
          this.citasService.guardarCookie(String(userCredential.user.email));
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
  }

  async buscar(){
      this.valor = this.citasService.obtenerCookie();
      const q = query(collection(this.firestore, "citas"), where("correo", "==", this.valor));
      const querySnapshot = await getDocs(q);
      this.clientes = [];  // Asegurarse de que la lista de clientes esté vacía antes de llenarla
      querySnapshot.forEach((doc) => {
        const datosCliente = {  // Crear un nuevo objeto en cada iteración
            usuario: doc.get("usuario"),
            auto: doc.get("auto"),
            dias: doc.get("dias"),
            fecha: this.convertTimestampToDate(doc.get("fecha")),  // Convertir a Date
            fechaInicio: this.convertTimestampToDate(doc.get("fechaInicio")),  // Convertir a Date
            fechaFin: this.convertTimestampToDate(doc.get("fechaFin"))  // Convertir a Date
        };
        this.clientes.push(datosCliente);
    });
      return this.clientes;

  }

  async futurasCitas(){
    const fechaAct = new Date();
    const q = query(collection(this.firestore, "citas"), where("fechaFin", ">", fechaAct));
    const querySnapshot = await getDocs(q);
    const futurasCitas: Renta[] = [];  // Asegurarse de que la lista de clientes esté vacía antes de llenarla
    querySnapshot.forEach((doc) => {
      const datosCliente = {  // Crear un nuevo objeto en cada iteración
          usuario: doc.get("usuario"),
          auto: doc.get("auto"),
          dias: doc.get("dias"),
          fecha: this.convertTimestampToDate(doc.get("fecha")),  // Convertir a Date
          fechaInicio: this.convertTimestampToDate(doc.get("fechaInicio")),  // Convertir a Date
          fechaFin: this.convertTimestampToDate(doc.get("fechaFin"))  // Convertir a Date
      };
      futurasCitas.push(datosCliente);
    });
      return futurasCitas;
  }

  async pasadasCitas(){
    const fechaAct = new Date();
    const q = query(collection(this.firestore, "citas"), where("fechaFin", "<", fechaAct));
    const querySnapshot = await getDocs(q);
    const pasadas: Renta[] = [];  // Asegurarse de que la lista de clientes esté vacía antes de llenarla
    querySnapshot.forEach((doc) => {
      const datosCliente = {  // Crear un nuevo objeto en cada iteración
          usuario: doc.get("usuario"),
          auto: doc.get("auto"),
          dias: doc.get("dias"),
          fecha: this.convertTimestampToDate(doc.get("fecha")),  // Convertir a Date
          fechaInicio: this.convertTimestampToDate(doc.get("fechaInicio")),  // Convertir a Date
          fechaFin: this.convertTimestampToDate(doc.get("fechaFin"))  // Convertir a Date
      };
      pasadas.push(datosCliente);
    });
      return pasadas;
  }

  async citasMarca(){
    const fechaAct = new Date();
    const marcaS = 'BMW';
    const q = query(collection(this.firestore, "citas"), where("auto.marca", "==", marcaS));
    const querySnapshot = await getDocs(q);
    const marca: Renta[] = [];  // Asegurarse de que la lista de clientes esté vacía antes de llenarla
    querySnapshot.forEach((doc) => {
      const datosCliente = {  // Crear un nuevo objeto en cada iteración
          usuario: doc.get("usuario"),
          auto: doc.get("auto"),
          dias: doc.get("dias"),
          fecha: this.convertTimestampToDate(doc.get("fecha")),  // Convertir a Date
          fechaInicio: this.convertTimestampToDate(doc.get("fechaInicio")),  // Convertir a Date
          fechaFin: this.convertTimestampToDate(doc.get("fechaFin"))  // Convertir a Date
      };
      marca.push(datosCliente);
    });
      return marca;
  }
  async tomarCitas(){
      // this.valor = this.citasService.obtenerCookie();
      // const fechaH = new Date;
      //const q = query(collection(this.firestore, "citas"));
      const querySnapshot = await getDocs(collection(this.firestore,"citas"));
      this.clientes = [];  // Asegurarse de que la lista de clientes esté vacía antes de llenarla
      querySnapshot.forEach((doc) => {
        const datosCliente = {  // Crear un nuevo objeto en cada iteración
            usuario: doc.get("usuario"),
            auto: doc.get("auto"),
            dias: doc.get("dias"),
            fecha: this.convertTimestampToDate(doc.get("fecha")),  // Convertir a Date
            fechaInicio: this.convertTimestampToDate(doc.get("fechaInicio")),  // Convertir a Date
            fechaFin: this.convertTimestampToDate(doc.get("fechaFin"))  // Convertir a Date
        };
        this.clientes.push(datosCliente);
    });
    return this.clientes;
  }
  private convertTimestampToDate(timestamp: Timestamp): Date {
    return timestamp.toDate();
  }

  cerrar(){
    const auth = getAuth();
    signOut(auth).then(() => {
      this.citasService.eliminarCookie();
    }).catch((error) => {
      // An error happened.
    });
  }


  async cuenta(){
      this.valor = this.citasService.obtenerCookie();
      if(this.valor != null){
        const docRef = doc(this.firestore, "usuarios", this.valor);
        const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            this.usuario.correo = docSnap.get("correo");
            this.usuario.nombre = docSnap.get("nombre");
            this.usuario.tel = docSnap.get("tel");
            this.usuario.pass = docSnap.get("pass");
            return this.usuario;
          }
          return null;
      }
      return null;
  }

  async eliminarCita(nombre: string, auto: string, fechaFin: Date): Promise<void> {
    try {
      // Convertir fechaFin a Timestamp para la consulta
      const fechaFinTimestamp = Timestamp.fromDate(fechaFin);
  
      // Primero, realizar una consulta para obtener el ID del documento
      const q = query(
        collection(this.firestore, "citas"), 
        where("auto.nombre", "==", auto), 
        where("usuario.nombre", "==", nombre),
        where("fechaFin", "==", fechaFinTimestamp)
      );
      const querySnapshot = await getDocs(q);
  
      // Iterar sobre los documentos encontrados y eliminarlos
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
        console.log(`Cita de ${nombre} con el auto ${auto} y fecha de finalización ${fechaFin} eliminada correctamente`);
      });
  
    } catch (error) {
      console.error("Error al eliminar la cita: ", error);
    }
  }

   // Método para verificar si hay un usuario autenticado

   // Método para obtener el usuario actual
  getCurrentUser(): string |null{
    return this.citasService.obtenerCookie();
  }
}
