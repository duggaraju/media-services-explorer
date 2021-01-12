import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Account } from '../account';
import { MediaEnvironment } from '../mediaenvironment';
import { AccountType } from '../account.type';
import { AzureAccountNode } from './azure.account.node';
import { MediaAccountNode } from './media.account.node';
import { ArmService } from '../arm/arm.service';
import { ITreeOptions, TreeNode, TreeComponent, IActionMapping } from '@circlon/angular-tree-component';
import { Observable } from 'rxjs';
import { Node } from './node';
import { AccountNode } from './account.node';
import { RootNode } from './root.node';
import { NodeType } from './node.type';
import { AadService } from '../aad/aad.service';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements AfterViewInit {

  @ViewChild(TreeComponent)
  private tree?: TreeComponent;

  selectedAccount?: Account;
  readOnly = false;
  newAccount = false;

  readonly nodes: Node[] = [];

  treeOptions: ITreeOptions = {
    getChildren: this.getChildren,
    actionMapping: {
      mouse: {
        contextMenu: (tree, node, $event) => this.onContextMenu(tree, node, $event)
      }
    } as IActionMapping
  };

  constructor(private activatedRoute: ActivatedRoute,
              private aadService: AadService,
              private armService: ArmService,
              private accountService: AccountService) {
    this.activatedRoute.fragment.subscribe(this.handleWindowCallback.bind(this));
    this.loadAccounts();
  }

  private handleWindowCallback(fragment: string): void {
    if (fragment) {
      console.log('Fragment is ' + fragment);
      this.aadService.handleWindowCallback(fragment);
    }
  }
  private loadAccounts(): void {
    const user = this.aadService.getCachedUser();
    const root = new AzureAccountNode(user.userName, this.aadService, this.armService);
    this.nodes.push(root);
  }

  ngAfterViewInit(): void {
  }

  private createNodes(accounts: Account[], accountType: AccountType, createFunction: (account: Account) => Node): Node[] {
    return accounts.filter( account => account.accountType === accountType).map(createFunction);
  }

  private onUpdate(account: Account): void {
    const added = this.accountService.updateAccount(account);
    if (added) {
      const nodeType: number = account.accountType;
      const node = account.accountType === AccountType.ArmAccount ?
        new AzureAccountNode(account.name, this.aadService, this.armService) :
        new MediaAccountNode(account);
      console.log(`Creating a new node name:${node.name} of type:${NodeType[nodeType]}`);
      this.nodes[nodeType].children.push(node);
      this.tree?.treeModel.update();
      this.newAccount = false;
    }
  }

  onDelete(account: Account): void {
    console.log(`Deleting account name:${account.name} of type:${AccountType[account.accountType]}`);
    this.accountService.deleteAccount(account);
    const nodes = this.nodes[account.accountType].children;
    const index = nodes.findIndex(node => node.name === account.name);
    if (index !== -1) {
      console.log(`removing node from the tree...`);
      nodes.splice(index, 1);
      this.tree?.treeModel.update();
    }
    this.selectedAccount = undefined;
  }

  private onActivate(node: TreeNode): void {
    const data = node.data as Node;
    data.onActivate().subscribe(() => {
      if (data instanceof AccountNode) {
        const account = data as AccountNode;
        this.selectedAccount = account.account;
        this.newAccount = false;
        this.readOnly = account.nodeType === NodeType.ArmAccount;
      }
    });
  }

  private getChildren(node: TreeNode): Promise<Node[]> {
    const data = node.data as Node;
    console.log(`loading data for ${data}`);
    return data.loadChildren();
  }

  private add($event: Event, node: TreeNode): void {
    $event.stopPropagation();
    const data = node.data as Node;
    const accountType: number = this.nodes.indexOf(data);
    this.selectedAccount = new Account(accountType, '');
    this.selectedAccount.properties.mediaEnvironment = MediaEnvironment.Production;
    this.readOnly = false;
    this.newAccount = true;
    console.log(`Adding a new account of type:${AccountType[accountType]}`);
  }

  private onContextMenu(tree: any, node: TreeNode, $event: Event): void {
    $event.preventDefault();
  }
}
