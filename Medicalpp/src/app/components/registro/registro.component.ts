import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/api/data.service';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { Admin } from '../../shared/admin';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  formulario: FormGroup;

  constructor(private route: Router, public service: DataService, private builder: FormBuilder) {

   }

  ngOnInit() {
    this.service.formulario.reset();
  }

  guardar() {
    this.service.register();
  }

  irLogin() {
      this.route.navigateByUrl('login');
  }

}
