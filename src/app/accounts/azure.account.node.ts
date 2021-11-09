import { Observable, interval, of } from 'rxjs';
import { map, take, filter } from 'rxjs/operators';
import { Node } from './node';
import { Account } from '../account';
import { ArmService } from '../arm/arm.service';
import { AzureSubscriptionNode } from './azure.subscription.node';
import { NodeType } from './node.type';
import { Subscription } from '@azure/arm-subscriptions/esm/models';

export class AzureAccountNode extends Node {

    constructor(account: string, private armService: ArmService) {
        super(account, NodeType.AzureAccount);
    }

    public loadChildren(): Promise<Node[]> {
        return this.loadSubscriptions().pipe<Node[]>(
            map(subscriptions => subscriptions.map((s, i) => {
                const node = new AzureSubscriptionNode(s, this.armService);
                return node;
            }))).toPromise<Node[]>();
    }

    private loadSubscriptions(): Observable<Subscription[]> {
        console.log('loading subscriptions...');
        return this.armService.getSubscriptions();
    }
}
