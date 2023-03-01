import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CredentialService } from '../credential.service';
import { Subscription, SubscriptionClient } from '@azure/arm-resources-subscriptions';
import { AzureMediaServices } from '@azure/arm-mediaservices';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me';

type ProfileType = {
  givenName?: string,
  surname?: string,
  userPrincipalName?: string,
  id?: string
};

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile?: ProfileType;
  subscriptions?: Subscription[];
  dataSource = new MatTreeNestedDataSource<Subscription>();
  treeControl = new NestedTreeControl<Subscription>(node => []);
  
  hasChild = () => true;
  
  private client: SubscriptionClient
  constructor(private http: HttpClient, private credential: CredentialService) {
    this.client = new SubscriptionClient(credential.credential);
   }

  async ngOnInit() {
    this.getProfile();
    const iterator = await this.client.subscriptions.list();
    const result = await iterator.byPage().next();
    this.dataSource.data = result.value;
  }

  getProfile() {
    this.http.get(GRAPH_ENDPOINT)
      .subscribe(profile => {
        this.profile = profile;
      });
  }
}