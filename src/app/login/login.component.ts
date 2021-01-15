import { Component, OnInit } from '@angular/core';
import { AadService } from '../aad/aad.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private aadService: AadService) { }

  ngOnInit() {
    this.aadService.login();
  }

}
