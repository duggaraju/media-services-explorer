import { Observable } from 'rxjs/Rx';
import { AdalService } from '../aad/adal.service';
import { Node } from './node';
import { Account } from '../account';
import { ArmService } from '../arm/arm.service';
import { AzureSubscriptionNode } from './azure.subscription.node';
import { NodeType } from './node.type';

export class AzureAccountNode extends Node {
    
    constructor(public account:Account, private adalService:AdalService, private armService:ArmService) {
        super(account.name, NodeType.AzureAccount, account);
        this.adalService.init(this.name);
    }

    public loadChildren(): Promise<Node[]> {
        return this.loginIfNeeded()
            .switchMap(x => this.loadSubscriptions())
            .map(subscriptions => subscriptions.map((s, i) => {
                let node = new AzureSubscriptionNode(s, this.adalService, this.armService);
                return node;
            })).toPromise();
    }

    private loginIfNeeded(): Observable<boolean> {
        let user = this.adalService.getCachedUser();

        if (!user) {
            console.log('getting children by logging...');
            this.adalService.login();
            return Observable.interval(1000)
                        .map(value => this.adalService.loginInProgress())
                        .filter( value => !value)
                        .take(1);
        }
        console.log(`found user ${user.userName} ${user.profile}`);
        return Observable.of(true);
    }

    private loadSubscriptions(): Observable<any> {
        console.log("loading subscriptions...");
        return this.armService.getSubscriptions(this.adalService);
    }
}