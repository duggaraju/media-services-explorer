import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { AccountsComponent } from './accounts/accounts.component';
import { ChannelsComponent } from './account/channels/channels.component';
import { AssetsComponent } from './account/assets/assets.component';
import { JobsComponent } from './account/jobs/jobs.component';
import { StreamingendpointsComponent } from './account/streamingendpoints/streamingendpoints.component';
import { LocatorsComponent } from './account/locators/locators.component';
import { KeysComponent } from './account/keys/keys.component';
import { AccessPoliciesComponent } from './account/access-policies/access-policies.component';
import { DeliveryPoliciesComponent } from './account/delivery-policies/delivery-policies.component';

const routes: Route[] = [
    {
      path: 'accounts',
      component: AccountsComponent,
      canActivate: [ MsalGuard ],
      children: [
        { path: '', redirectTo: 'accounts', pathMatch: 'full' },
        { path: 'assets', component: AssetsComponent },
        { path: 'channels', component: ChannelsComponent },
        { path: 'origins', component: StreamingendpointsComponent },
        { path: 'jobs', component: JobsComponent },
        { path: 'locators', component: LocatorsComponent },
        { path: 'accesspolicies', component: AccessPoliciesComponent },
        { path: 'deliverypolicies', component: DeliveryPoliciesComponent },
        { path: 'keys', component: KeysComponent }
      ]
    },
    {
      path: '',
      component: AccountsComponent,
      canActivate: [ MsalGuard ]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
