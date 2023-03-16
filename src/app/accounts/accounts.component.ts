import { Component, OnInit } from '@angular/core';
import { AzureAccountNode } from './azure.account.node';
import { Node } from './node';
import { CredentialService } from '../credential.service';
import { MediaService } from '@azure/arm-mediaservices';
import { HttpClient } from '@angular/common/http';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import { from, Observable, Subscription, tap } from 'rxjs';
import { CollectionViewer } from '@angular/cdk/collections';
import { NodeType } from './node.type';
import { AzureMediaAccountNode } from './azure.media.account.node';

const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me';
type ProfileType = {
  displayName?: string,
  givenName?: string,
  surname?: string,
  userPrincipalName?: string,
  id?: string
};


class TreeDataSource extends MatTreeNestedDataSource<Node> {
  constructor (private treeControl: NestedTreeControl<Node>) {
    super()
  }
}


@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  treeControl = new NestedTreeControl<Node>(node => node.loadChildren());
  dataSource = new TreeDataSource(this.treeControl);
  selectedAccount?: MediaService;
  readonly nodes: Node[] = [];
  profile?: ProfileType;

  constructor(private credentialService: CredentialService, private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.httpClient.get<ProfileType>(GRAPH_ENDPOINT)
      .subscribe(profile => {
        this.profile = profile;
        const root = new AzureAccountNode(profile.userPrincipalName ?? '', this.credentialService);
        this.nodes.push(root);
        this.dataSource.data = this.nodes;
      });
  }

  hasChildren(node: Node): boolean {
    return node.hasChildren;
  }

  selectAccount(node:Node): void {
    if (node.nodeType === NodeType.MediaServicesAccount) {
      this.selectedAccount = (node as AzureMediaAccountNode).account;
    }
  }
}
