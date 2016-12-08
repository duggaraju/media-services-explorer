import { BrowserModule } from '@angular/platform-browser';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule, Route} from '@angular/router';
import { AppComponent } from './app.component';
import { AccountComponent } from './account/account.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { AccountsComponent } from './accounts/accounts.component';
import { ChannelsComponent } from './account/channels/channels.component';
import { AssetsComponent } from './account/assets/assets.component';
import { JobsComponent } from './account/jobs/jobs.component';
import { StreamingendpointsComponent } from './account/streamingendpoints/streamingendpoints.component';
import { Angular2DataTableModule } from 'angular2-data-table';
import { MediaServiceFactory } from './media/media.service.factory';
import { LocatorsComponent } from './account/locators/locators.component';
import { KeysComponent } from './account/keys/keys.component';
import { AccessPoliciesComponent } from './account/access-policies/access-policies.component';
import { DeliveryPoliciesComponent } from './account/delivery-policies/delivery-policies.component';

const routeTracing = false;

export const routes: Route[] = [
  { path: "", redirectTo: "accounts", pathMatch: "full"},
  { path: "accounts", component: AccountsComponent },
  {
    path: "account/:account",
    component: AccountComponent,
    children: [
      { path: '', redirectTo: 'assets', pathMatch: 'full' },
      { path: "assets", component: AssetsComponent },
      { path: "channels", component: ChannelsComponent },
      { path: "origins", component: StreamingendpointsComponent },
      { path: "jobs", component: JobsComponent },
      { path: "locators", component: LocatorsComponent },
      { path: "accesspolicies", component: AccessPoliciesComponent },
      { path: "deliverypolicies", component: DeliveryPoliciesComponent },
      { path: "keys", component: KeysComponent }
    ]
  }];

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    AccountDetailsComponent,
    AccountsComponent,
    ChannelsComponent,
    AssetsComponent,
    JobsComponent,
    StreamingendpointsComponent,
    LocatorsComponent,
    KeysComponent,
    AccessPoliciesComponent,
    DeliveryPoliciesComponent
  ],
  imports: [
    Angular2DataTableModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    RouterModule.forRoot(routes, {  enableTracing: routeTracing, useHash: true})
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    MediaServiceFactory
  ],
  bootstrap: [AppComponent ]
})
export class AppModule { }
