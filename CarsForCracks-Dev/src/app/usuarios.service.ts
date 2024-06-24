import { Injectable } from '@angular/core';
import { Auth, User, createUserWithEmailAndPassword, getAuth, updateProfile } from '@angular/fire/auth';
import { Firestore, collection, doc, setDoc, query, where, getDocs, getDoc, addDoc } from '@angular/fire/firestore';
import { FormGroup } from '@angular/forms';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { Usuarios } from './usuarios';
import { Renta } from './renta';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private auth:Auth, private firestore:Firestore) { }

  valor:string = '';
  usuario:Usuarios = {
    nombre:'',
    tel:'',
    correo:'',
    pass:''
  }

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

  estado(){
    if(this.auth.currentUser != null){
      console.log("Conectado")
    }else{
      console.log("NO Conectado")
      // return false;
    }

  }

  iniciar(correo:string, pass:string){
    const auth = getAuth();
      signInWithEmailAndPassword(auth, correo, pass)
        .then((userCredential) => {
          console.log(userCredential.user.email);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
  }

  async buscar(){
      this.valor = String(this.auth.currentUser?.email);
      console.log(this.valor);
      const q = query(collection(this.firestore, "citas"), where("correo", "==", this.valor));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.get("usuario.nombre"));
        console.log(doc.get("correo"));
        console.log(doc.get("auto"));
      });    

  }


  async cuenta(){
    if(this.auth.currentUser?.email != null){
      const docRef = doc(this.firestore, "usuarios", this.auth.currentUser?.email);
      const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          this.usuario.correo = docSnap.get("correo");
          this.usuario.nombre = docSnap.get("nombre");
          this.usuario.tel = docSnap.get("tel");
          this.usuario.pass = docSnap.get("pass");
          return this.usuario;
        } else {
          // docSnap.data() will be undefined in this case
          return null;
        }

    }
    return null;
  }

   // Método para verificar si hay un usuario autenticado
   isLoggedIn(): boolean {
    return this.auth.currentUser !== null;
  }

   // Método para obtener el usuario actual
   getCurrentUser(): User | null {
    return this.auth.currentUser;
  }
}
