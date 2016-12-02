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
import { ChannelsComponent } from './channels/channels.component';
import { AssetsComponent } from './assets/assets.component';
import { JobsComponent } from './jobs/jobs.component';
import { StreamingendpointsComponent } from './streamingendpoints/streamingendpoints.component';


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
      { path: "jobs", component: JobsComponent }
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
    StreamingendpointsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    RouterModule.forRoot(routes, { useHash: true})
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent ]
})
export class AppModule { }
