import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http"; // Import 

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MsalModule, MsalRedirectComponent, MsalGuard, MsalInterceptor } from '@azure/msal-angular'; // Import MsalInterceptor
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { AccountComponent } from './account/account.component';
import { AccountsComponent } from './accounts/accounts.component';
import { ChannelsComponent } from './account/channels/channels.component';
import { AssetsComponent } from './account/assets/assets.component';
import { TransformsComponent } from './account/transforms/transforms.component';
import { StreamingendpointsComponent } from './account/streamingendpoints/streamingendpoints.component';
import { CommonModule } from '@angular/common';
// import { setLogLevel } from '@azure/logger';
// setLogLevel('verbose');

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    AccountsComponent,
    ChannelsComponent,
    AssetsComponent,
    TransformsComponent,
    StreamingendpointsComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTreeModule,
    MsalModule.forRoot( new PublicClientApplication({
      auth: {
        clientId: '2df1b6c9-1406-40f9-a730-b5d0462c651c',
        authority: 'https://login.microsoftonline.com/common',
        redirectUri: '/',
      },
      cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: false,
      }
    }), {
      interactionType: InteractionType.Redirect,
      authRequest: {
        scopes: ['user.read']
        }
    }, {
      interactionType: InteractionType.Redirect, // MSAL Interceptor Configuration
      protectedResourceMap: new Map([ 
          ['https://graph.microsoft.com/v1.0/me', ['user.read']],
          ['https://management.azure.com/', ['//user_impersonation']]
      ])
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    MsalGuard
  ],
  bootstrap: [ AppComponent, MsalRedirectComponent ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }