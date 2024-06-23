import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, getAuth, updateProfile } from '@angular/fire/auth';
import { Firestore, collection, doc, setDoc, query, where, getDocs, getDoc } from '@angular/fire/firestore';
import { FormGroup } from '@angular/forms';
import { signInWithEmailAndPassword } from '@firebase/auth';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private auth:Auth, private firestore:Firestore) { }


  registro(formRegistro:FormGroup){
    setDoc(doc(this.firestore, "usuarios", formRegistro.value.correo),{
      nombre : formRegistro.value.nombre, 
      tel : formRegistro.value.tel, 
      correo : formRegistro.value.correo,
      pass: formRegistro.value.pass,
    });
    return createUserWithEmailAndPassword(this.auth, formRegistro.value.correo, formRegistro.value.pass);
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
      const q = query(collection(this.firestore, "usuarios"), where("correo", "==", this.auth.currentUser?.email));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
      });    
  }

  async cuenta(){
    if(this.auth.currentUser?.email != null){
      const docRef = doc(this.firestore, "usuarios", this.auth.currentUser?.email);
      const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          return docSnap.get("nombre");
        } else {
          // docSnap.data() will be undefined in this case
          return "";
        }

    }
  }

}
