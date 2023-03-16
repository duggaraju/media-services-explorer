import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { AccountsComponent } from './accounts/accounts.component';
import { ChannelsComponent } from './account/channels/channels.component';
import { AssetsComponent } from './account/assets/assets.component';
import { TransformsComponent } from './account/transforms/transforms.component';
import { StreamingendpointsComponent } from './account/streamingendpoints/streamingendpoints.component';


const routes: Route[] = [
  {
    path: '',
    component: AccountsComponent,
    canActivate: [ MsalGuard ],
    children: [
      { path: 'assets', component: AssetsComponent },
      { path: 'channels', component: ChannelsComponent },
      { path: 'streamingendpoints', component: StreamingendpointsComponent },
      { path: 'transforms', component: TransformsComponent },
    ]
  },
  {
    path: '**',
    redirectTo: '',
  }
];

const isIframe = window !== window.parent && !window.opener;

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: !isIframe ? 'enabledBlocking' : 'disabled' // Don't perform initial navigation in iframes
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }