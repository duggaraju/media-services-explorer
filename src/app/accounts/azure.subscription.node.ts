import { AzureMediaAccountNode } from './azure.media.account.node';
import { Node } from './node';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NodeType } from './node.type';
import { Subscription } from '@azure/arm-subscriptions';
import { CredentialService } from '../credential.service';
import { AzureMediaServices, MediaService } from '@azure/arm-mediaservices';
import { ResourceManagementClient } from '@azure/arm-resources';

export class AzureSubscriptionNode extends Node {

    constructor(private subscritpion: Subscription, private credentialService: CredentialService) {
        super(subscritpion.displayName ?? '', NodeType.Subscription);
    }

    public override loadChildren(): Observable<Node[]> {
        return from(this.loadMediaAccounts())
        .pipe(map(accounts => accounts.map(a => new AzureMediaAccountNode(a))));
    }

    private async loadMediaAccounts(): Promise<MediaService[]> {
        console.log('loading media accounts...');
        const media = new AzureMediaServices(this.credentialService.credential, this.subscritpion.subscriptionId!);
        const result = media.mediaservices.listBySubscription().byPage();
        const accounts = await result.next();
        return accounts.value;
    }
}
