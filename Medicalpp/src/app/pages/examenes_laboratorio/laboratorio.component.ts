import { Component, OnInit } from '@angular/core';
import { LaboratorioService } from '../../api/laboratorio.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-laboratorio',
  templateUrl: './laboratorio.component.html',
  styleUrls: ['./laboratorio.component.css']
})
export class LaboratorioComponent implements OnInit {

  fileName = 'Seleccionar imagen';

  fileToUpload = null;

  formulario: FormGroup;

  imgURL = '../../../assets/img/camera.webp';

  constructor(private service: LaboratorioService, private toast: ToastrService, private builder: FormBuilder) {
    this.formulario = this.builder.group({
      Nombre: [''],
      Descripcion: [''],
      Estado: 1
    });
   }

  ngOnInit() {
  }

  updateControls(e): void {
    this.fileToUpload = e.target.files.item(0);
    this.fileName = this.fileToUpload.name;

    const reader = new FileReader();

    reader.onload = (event: any) => {
      this.imgURL = event.target.result;
    };
    reader.readAsDataURL(this.fileToUpload);
  }

  onSubmit() {
    console.log(this.formulario.value);
    let body = {
      Nombre: String,
      Descripcion: String,
      Estado: 1
    }
  
    body = this.formulario.value;
    this.service.guardarExamenLaboratorio(body)
    .subscribe(x=> {
      console.log(x);
      this.formulario.reset(0);
      this.toast.success('El examen de laboratorio se registro con exito!');
    },
    err => {
      if (err.status === 200) {
        this.toast.success('El examen de laboratorio se registro con exito!');
        this.formulario.reset(0);
      } else {
        this.toast.error(err.error, 'No se logró hacer el registro');
      }
      console.log(err);      
    });
  }

}
