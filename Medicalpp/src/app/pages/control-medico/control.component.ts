import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup } from '@angular/forms';
import { ControlService } from '../../api/control.service';
import { ToastrService } from 'ngx-toastr';
import { LaboratorioService } from '../../api/laboratorio.service';
@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})
export class ControlComponent implements OnInit {

  product: any;

  formulario: FormGroup;

  constructor(private service: ControlService, private serviceProd: LaboratorioService, 
    private toast: ToastrService, private builder: FormBuilder) {
      this.formulario = this.builder.group({
        IDUsuario: 1,
        IDEstadoSalud: 1,
        FechaControl: [''],
        IDProcedimiento: 1,
        Detalle: ['']
      });
   }

  ngOnInit() {
  }

  onSubmit(value) {
    let body = {
      IDUsuario: 2,
      IDEstadoSalud: 1,
      FechaControl: "2022-03-29",
      IDProcedimiento: 1,
      Detalle: "Realizamos el control medico"
    }
    this.service.guardarControlMedico(body)
    .subscribe(x => {
      console.log(x);
    },
    err => {
      if (err.status === 200) {
        this.toast.success('El control medico se registro con exito!');
        this.formulario.reset(0);
      } else {
        this.toast.error(err.error, 'No se logró hacer el registro');
      }
      console.log(err);
    });
  }

}
