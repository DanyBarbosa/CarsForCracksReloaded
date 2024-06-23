import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, getAuth, updateProfile, signOut, User } from '@angular/fire/auth';
import { Firestore, collection, doc, setDoc, query, where, getDocs, getDoc, addDoc } from '@angular/fire/firestore';
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
      querySnapshot.forEach((doc) => {
        this.datosCliente.usuario = doc.get("usuario");
        this.datosCliente.auto = doc.get("auto");
        this.datosCliente.dias = doc.get("dias");
        this.datosCliente.fecha = doc.get("fecha");
        this.datosCliente.fechaInicio = doc.get("fechaInicio");
        this.datosCliente.fechaFin = doc.get("fechaFin");
        this.clientes.push(this.datosCliente);
      });
      return this.clientes;

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

   // Método para verificar si hay un usuario autenticado

   // Método para obtener el usuario actual
  getCurrentUser(): string |null{
    return this.citasService.obtenerCookie();
  }

 

}
