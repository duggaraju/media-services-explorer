import { Observable, interval, of } from 'rxjs';
import { map, take, filter } from 'rxjs/operators';
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
        return this.loadSubscriptions().pipe(
            map(subscriptions => subscriptions.map((s, i) => {
                const node = new AzureSubscriptionNode(s, this.adalService, this.armService);
                return node;
            }))).toPromise();
    }

    private loginIfNeeded(): Observable<boolean> {
        const user = this.adalService.getCachedUser();
        if (!user) {
            console.log('getting children by logging...');
            this.adalService.login();
            return interval(1000).pipe(
                        map(value => this.adalService.loginInProgress()),
                        filter( value => !value),
                        take(1));
        }
        console.log(`found user ${user.userName} ${user.profile}`);
        return of(true);
    }

    private loadSubscriptions(): Observable<Subscription[]> {
        console.log('loading subscriptions...');
        return this.armService.getSubscriptions();
    }
}
