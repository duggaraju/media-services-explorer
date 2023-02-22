import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
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
import { TreeModule } from '@circlon/angular-tree-component';
import { ArmService } from './arm/arm.service';
import { MsalInterceptor, MsalModule, MsalRedirectComponent } from '@azure/msal-angular';
import { AadConfigService } from 'app/aad/aad.config.service';
import { AppRoutingModule } from './app.routing.module';
import { AadModule } from './aad/aad.module';

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
    AppRoutingModule,
    NgxDatatableModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    TreeModule,
    AadModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    MediaServiceFactory,
    AccountService,
    AadConfigService,
    ArmService
  ],
  bootstrap: [ AppComponent, MsalRedirectComponent ]
})
export class AppModule { }
