import { Observable } from 'rxjs/Rx';
import { AdalService } from '../aad/adal.service';
import { Node } from './node';
import { Account } from '../account';
import { ArmService } from '../arm/arm.service';
import { AzureSubscriptionNode } from './azure.subscription.node';
import { NodeType } from './node.type';
import { Subscription } from '../arm/subscription';

export class AzureAccountNode extends Node {

    constructor(account: string, public adalService: AdalService, private armService: ArmService) {
        super(account, NodeType.AzureAccount);
    }

    public loadChildren(): Promise<Node[]> {
        return this.loadSubscriptions()
            .map(subscriptions => subscriptions.map((s, i) => {
                const node = new AzureSubscriptionNode(s, this.adalService, this.armService);
                return node;
            })).toPromise();
    }

    private loginIfNeeded(): Observable<boolean> {
        const user = this.adalService.getCachedUser();
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

    private loadSubscriptions(): Observable<Subscription[]> {
        console.log('loading subscriptions...');
        return this.armService.getSubscriptions();
    }
}
