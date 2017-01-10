import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Account } from "../account";
import { MediaEnvironment } from "../mediaenvironment";
import { AccountType } from '../account.type';
import { AzureAccountNode } from './azure.account.node';
import { MediaAccountNode } from './media.account.node';
import { ArmService } from '../arm/arm.service';
import { ITreeOptions, TreeNode, TreeComponent, IActionMapping } from 'angular2-tree-component';
import { Observable } from 'rxjs/Rx';
import { Node } from './node';
import { NodeType } from './node.type';
import { AdalService } from '../aad/adal.service';

@Component({
  selector: 'accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  @ViewChild(TreeComponent)
  private tree: TreeComponent;

  accounts: Account[] = [];
  selectedAccount: Node;

  readOnly: boolean = true;
  readonly nodes: Node[] = [
    new Node("Classic Accounts"),
    new Node("Azure AD Accounts"),
    new Node("Azure Accounts")
  ];

  treeOptions: ITreeOptions = {
    getChildren: this.getChildren,
    actionMapping: <IActionMapping> {
      mouse: {
        contextMenu: (tree, node, $event) => this.onContextMenu(tree, node, $event)
      }
    }
  }

  constructor(private activatedRoute:ActivatedRoute, private adalService:AdalService, private armService:ArmService) {
    this.adalService.init();
    this.activatedRoute.fragment.subscribe(fragment => { 
      console.log("Fragment is " + fragment); 
      this.adalService.handleWindowCallback(fragment);
    });
    this.loadAccounts();
  }

  private loadAccounts(): void {
    var accounts = localStorage.getItem("accounts");
    console.log(`found accounts in local storage ${accounts}`);
    if (accounts) {
      try {
        this.accounts = JSON.parse(accounts) as Account[];
      }
      catch(error) {
        console.log(`Invalid JSON saved so ignoring it. ${error}`);
      }
    }
    console.log(`Total accounts: ${this.accounts.length}`);
    this.nodes[0].children = this.createNodes(AccountType.AcsAccount, account => new MediaAccountNode(account));
    this.nodes[1].children = this.createNodes(AccountType.AadAccount, account => new MediaAccountNode(account));
    this.nodes[2].children = this.createNodes(AccountType.ArmAccount, account => new AzureAccountNode(account, this.adalService, this.armService));
    
  }

  private createNodes(accountType: AccountType, createFunction:(account:Account) => Node): Node[] {
    return this.accounts.filter( account => account.accountType === accountType).map(createFunction);
  }

  private onUpdate(account:Node): void {
    let nodeType: number = account.nodeType;
    if (!this.accounts.find(element => account.properties === element)) {
      console.log(`Creating a new account name:${account.name} of type:${NodeType[nodeType]}`);
      this.nodes[nodeType].children.push(account);
      this.accounts.push(<Account> {
        name: account.name,
        accountType: nodeType,
        properties: account.properties
      });
      this.tree.treeModel.update();
    } else {
      console.log(`Updated account ${account.name} of type:${NodeType[nodeType]}`);      
    }
    console.log(`Saving Accounts.... Total: ${this.accounts.length}`);
    localStorage.setItem("accounts", JSON.stringify(this.accounts));
  }

  onDelete(node:Node): void {
    let nodeType: number = node.nodeType;
    let account = this.accounts.find(element => node.properties === element);
    if (account) {
      console.log(`Deleting account name:${account.name} of type:${NodeType[nodeType]}`);
      let nodes = this.nodes[nodeType].children;
      let index = nodes.indexOf(node);
      nodes.splice(index, 1);

      index = this.accounts.indexOf(account);
      this.accounts.splice(index, 1);
      this.tree.treeModel.update();
    }
    console.log(`Saving Accounts.... Total: ${this.accounts.length}`);
    localStorage.setItem("accounts", JSON.stringify(this.accounts));
    
  }

  ngOnInit() {
  }

  private onActivate(node:TreeNode): void {
    let account = node.data as Node;
    account.onActivate().subscribe(x => {
      this.selectedAccount = node.isLeaf ? account : null; 
      this.readOnly = account.nodeType !== NodeType.ArmAccount;   
    });
  }

  private getChildren(node: TreeNode): Promise<Node[]> {
    let data = node.data as Node;
    console.log(`loading data for ${data}`);
    return data.loadChildren();
  }

  private add($event, node: TreeNode) {
    $event.stopPropagation();
    let data = node.data as Node;
    this.selectedAccount = new Node("",this.nodes.indexOf(data));
    this.readOnly = false;
  }

  private onContextMenu(tree, node, $event: Event) {
    $event.preventDefault();
  }
}
