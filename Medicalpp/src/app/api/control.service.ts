import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ControlService {

  constructor(private http: HttpClient, private toast: ToastrService, private builder: FormBuilder) { }

  URL = 'https://medicalpp.herokuapp.com/api/control';

  guardarControlMedico(body: any) {
    return this.http.post(this.URL, body);
  }

}
