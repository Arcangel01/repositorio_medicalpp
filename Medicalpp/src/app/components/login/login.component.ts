import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { DataService } from '../../api/data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formModel = {
    UserName: '',
    Password: ''
  };
  user = {
    UserName: 'Juan',
    Password: '1234*'
  };
  constructor(private route: Router, private service: DataService, private toast: ToastrService) { }

  ngOnInit() {
  }

  irRegistro() {
    this.route.navigateByUrl('registro');
  }

  login(form: NgForm) {
    if (form.value['Password'] == this.user.Password && form.value['UserName'] == this.user.UserName) {
      this.route.navigateByUrl('/home');
      this.toast.success("Ingreso sactifastorio", "Bienvenido");
    } else {
      this.toast.error("Ingrese las credenciales correctas", "ERROR");
    }
    // this.service.logueo(form.value)
    //   .subscribe((res: any) => {
    //     localStorage.setItem('token', res.token);
    //     this.route.navigateByUrl('/home');
    //   },
    //     err => {
    //       if (err.status === 400) {
    //         this.toast.error('Usuario o Password incorrectas!', 'INVENTORY');
    //       } else {
    //         console.log(err);
    //       }
    //     });
  }

}
