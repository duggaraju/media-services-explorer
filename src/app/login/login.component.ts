import { Component, OnInit } from '@angular/core';
import { AdalService } from '../aad/adal.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private armService: AdalService) { }

  ngOnInit() {
    this.armService.login();
  }

}
