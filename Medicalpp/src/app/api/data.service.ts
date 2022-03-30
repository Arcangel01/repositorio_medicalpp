import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Admin } from '../shared/admin';
import { tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // admin: Admin[];
  URL = 'https://localhost:44394/api/admon/users';

  constructor(private http: HttpClient, private toast: ToastrService, private builder: FormBuilder, private route: Router) { }
  fecha = new Date();
  formulario = this.builder.group({
    ID: ['', Validators.required],
    Nombre: ['', Validators.required],
    Apellido: ['', Validators.required],
    Edad: ['', Validators.required],
    Genero: 0,
    Clave: ['', [Validators.required, Validators.minLength(4)]],
    FechaRegistro: this.fecha.getFullYear() + '-' + (this.fecha.getMonth() + 1) + '-' + this.fecha.getDate(),
    Estado: 1,
    Rol: 2
  });

  // Metodo para registrar user
  register() {
    this.formulario.value.FechaRegistro = this.fecha.getFullYear() + '-' + (this.fecha.getMonth() + 1) + '-' + this.fecha.getDate(),
    this.formulario.value.Estado = 1,
    this.formulario.value.Rol = 2
    console.log(this.formulario.value);
    return this.http.post('https://medicalpp.herokuapp.com/api/user', JSON.parse(JSON.stringify(this.formulario.value)))
    .subscribe((res: any) => {
      console.log(res);
      if (res.code == 'ER_DUP_ENTRY') {
        this.toast.error("El usuario con el documento " + this.formulario.value.ID + " Ya existe", "ERROR");
      }
    },err => {
      if (err.status === 200) {
        this.toast.success('Registrado con exito!', 'MEDICALPP');
        this.route.navigateByUrl('/home');
      } else {
        this.toast.error('No se logro registrar', 'ERROR');
      }
      console.log(err);
    });
  }

  // Obtener los datos del perfil
  getUserProfile() {
    const tokenHeader = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')});
    return this.http.get('https://localhost:44394/api/profile', {headers : tokenHeader});
  }

  // Iniciar Sesion
  logueo(formData) {
    return this.http.post('https://localhost:44394/api/user/login', formData);
  }

  // Metodo para registrar un administrador
  addAdmin(admin: Admin) {
    return this.http.post<boolean>(this.URL, admin)
      .pipe(tap(res => {
        this.toast.success('Registrado con exito!', 'INVENTORY');
        console.log(res);
      },
        err => {
          this.toast.error('No se logro registrar', 'INVENTORY');
          console.log(err);
        }));
  }
}
