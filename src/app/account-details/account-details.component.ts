import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Account } from "../account";
import { AccountType } from "../account.type";
import { MediaEnvironment } from '../mediaenvironment';
import { Router } from "@angular/router";
import { AccountService } from '../account.service';
import { Node } from '../accounts/node';
import { NodeType } from '../accounts/node.type';

@Component({
  selector: 'account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent {

  public MediaEnvironment = MediaEnvironment;
  public NodeType = NodeType;
  environments = Object.keys(MediaEnvironment).filter(x => !isNaN(Number(x)));

  @Input()
  account: Node;

  @Input()
  readOnly: boolean = true;

  @Output()
  accountUpdated = new EventEmitter();

  @Output()
  accountDeleted = new EventEmitter();

  constructor(private router:Router, private accountService:AccountService) {
  }

  onClick() {
    let json = JSON.stringify(<Account> {
      name: this.account.name,
      accountType: <number> this.account.nodeType,
      properties: this.account.properties
    });
    console.log(`JSON for account is ${json}`);
    this.router.navigate(["account", json]);
  }

  onDelete() {
    this.accountDeleted.emit(this.account);
  }

  onUpdate() {
    this.accountUpdated.emit(this.account);
  }
}
