import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Account } from "../account";
import { MediaEnvironment } from "../mediaenvironment";
import { AccountType } from '../account.type';
import { AzureAccountNode } from './azure.account.node';
import { MediaAccountNode } from './media.account.node';
import { ArmService } from '../arm/arm.service';
import { ITreeOptions, TreeNode, TreeComponent, IActionMapping } from 'angular-tree-component';
import { Observable } from 'rxjs/Rx';
import { Node } from './node';
import { RootNode } from './root.node';
import { NodeType } from './node.type';
import { AdalService } from '../aad/adal.service';
import { AdalServiceFactory } from '../aad/adal.service.factory';
import { AccountService } from '../account.service';

@Component({
  selector: 'accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  @ViewChild(TreeComponent)
  private tree: TreeComponent;

  selectedAccount: Account;
  readOnly: boolean = false;
  newAccount: boolean = false;

  readonly nodes: Node[] = [
    new RootNode("Classic Accounts"),
    new RootNode("Azure AD Accounts"),
    new RootNode("Azure Accounts")
  ];

  treeOptions: ITreeOptions = {
    getChildren: this.getChildren,
    actionMapping: <IActionMapping> {
      mouse: {
        contextMenu: (tree, node, $event) => this.onContextMenu(tree, node, $event)
      }
    }
  }

  constructor(private activatedRoute:ActivatedRoute, private adalServiceFactory:AdalServiceFactory, private armService:ArmService, private accountService: AccountService) {
    this.loadAccounts();
    this.activatedRoute.fragment.subscribe(fragment => { 
      if (fragment) {
        console.log("Fragment is " + fragment);
        this.nodes[NodeType.ArmAccount].children.forEach((node) => {
          var account =  node as AzureAccountNode;
          account.adalService.handleWindowCallback(fragment);
        })
      }
    });
  }

  private loadAccounts(): void {
    let accounts = this.accountService.getAccounts();
    this.nodes[0].children = this.createNodes(accounts, AccountType.AcsAccount, account => new MediaAccountNode(account));
    this.nodes[1].children = this.createNodes(accounts, AccountType.AadAccount, account => new MediaAccountNode(account));
    this.nodes[2].children = this.createNodes(accounts, AccountType.ArmAccount, account => 
      new AzureAccountNode(
        account, 
        this.adalServiceFactory.createContextForUser(account.name),
        this.armService));   
  }

  private createNodes(accounts: Account[], accountType: AccountType, createFunction:(account:Account) => Node): Node[] {
    return accounts.filter( account => account.accountType === accountType).map(createFunction);
  }

  private onUpdate(account:Account): void {
    let added = this.accountService.updateAccount(account);
    if (added) {
      let nodeType: number = account.accountType;
      let node = account.accountType == AccountType.ArmAccount ? 
        new AzureAccountNode(account, this.adalServiceFactory.createContextForUser(account.name), this.armService) :
        new MediaAccountNode(account);
      console.log(`Creating a new node name:${node.name} of type:${NodeType[nodeType]}`);
      this.nodes[nodeType].children.push(node);
      this.tree.treeModel.update();
      this.newAccount = false;
    }
  }

  onDelete(account:Account): void {
    console.log(`Deleting account name:${account.name} of type:${AccountType[account.accountType]}`);
    this.accountService.deleteAccount(account);
    let nodes = this.nodes[account.accountType].children;
    let index = nodes.findIndex(node => node.name === account.name);
    if (index != -1) {
      console.log(`removing node from the tree...`)
      nodes.splice(index, 1);
      this.tree.treeModel.update();
    }
    this.selectedAccount == null;
  }

  ngOnInit() {
  }

  private onActivate(node:TreeNode): void {
    let account = node.data as Node;
    account.onActivate().subscribe(x => {
      this.selectedAccount = account.account;
      this.newAccount = false;
      this.readOnly = account.nodeType === NodeType.ArmAccount;   
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
    let accountType: number = this.nodes.indexOf(data);
    this.selectedAccount = new Account(accountType);
    this.selectedAccount.properties["mediaEnvironment"] = MediaEnvironment.Production;
    this.readOnly = false;
    this.newAccount = true;
    console.log(`Adding a new account of type:${AccountType[accountType]}`);
  }

  private onContextMenu(tree, node, $event: Event) {
    $event.preventDefault();
  }
}
