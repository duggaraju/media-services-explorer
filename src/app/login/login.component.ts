import { Component, OnInit } from '@angular/core';
import { MsalService} from '@azure/msal-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private aadService: MsalService) { }

  ngOnInit(): void {
    this.aadService.loginRedirect();
  }

}
