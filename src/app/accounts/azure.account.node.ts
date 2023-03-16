import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Node } from './node';
import { AzureSubscriptionNode } from './azure.subscription.node';
import { NodeType } from './node.type';
import { Subscription, SubscriptionClient } from '@azure/arm-subscriptions';
import { CredentialService } from '../credential.service';

export class AzureAccountNode extends Node {
    private client: SubscriptionClient

    constructor(account: string, private credentialService: CredentialService) {
        super(account, NodeType.AzureAccount);
        this.client = new SubscriptionClient(credentialService.credential);
    }

    public override loadChildren(): Observable<Node[]> {
        this.loading = true;
        return from(this.loadSubscriptions())
            .pipe(map(subscriptions => {
                this.loading = false;
                return subscriptions.map(s => new AzureSubscriptionNode(s, this.credentialService));
            }));
    }

    private async loadSubscriptions(): Promise<Subscription[]> {
        console.log('loading subscriptions...');
        const pages = this.client.subscriptions.list().byPage();
        const result = await pages.next();
        return result.value;
    }
}
