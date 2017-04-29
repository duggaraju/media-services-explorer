import { BrowserModule } from '@angular/platform-browser';
import { LocationStrategy, HashLocationStrategy, APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule, Route } from '@angular/router';
import { AppComponent } from './app.component';
import { AccountComponent } from './account/account.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { AccountsComponent } from './accounts/accounts.component';
import { ChannelsComponent } from './account/channels/channels.component';
import { AssetsComponent } from './account/assets/assets.component';
import { JobsComponent } from './account/jobs/jobs.component';
import { StreamingendpointsComponent } from './account/streamingendpoints/streamingendpoints.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MediaServiceFactory } from './media/media.service.factory';
import { LocatorsComponent } from './account/locators/locators.component';
import { KeysComponent } from './account/keys/keys.component';
import { AccessPoliciesComponent } from './account/access-policies/access-policies.component';
import { DeliveryPoliciesComponent } from './account/delivery-policies/delivery-policies.component';
import { AccountService } from './account.service';
import { TreeModule } from 'angular-tree-component';
import { ArmService } from './arm/arm.service';
import { AdalService } from './aad/adal.service';
import { AdalServiceFactory } from './aad/adal.service.factory';
import { ContextMenuModule } from 'ngx-contextmenu';
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
  },
  { path: "**", component: AccountsComponent },
];

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
    NgxDatatableModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    TreeModule,
    ContextMenuModule,
    RouterModule.forRoot(routes, {  enableTracing: routeTracing, useHash: false })
  ],
  providers: [
    // { provide: LocationStrategy, useClass: HashLocationStrategy },
    // { provide:APP_BASE_HREF,  useValue: location.pathname },
    MediaServiceFactory,
    AccountService,
    AdalServiceFactory,
    ArmService
  ],
  bootstrap: [AppComponent ]
})
export class AppModule { }
