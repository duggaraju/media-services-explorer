import { AzureMediaAccountNode } from './azure.media.account.node';
import { Node } from './node';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ArmService } from '../arm/arm.service';
import { AdalService } from '../aad/adal.service';
import { NodeType } from './node.type';
import { Subscription } from '../arm/subscription';

export class AzureSubscriptionNode extends Node {

    constructor(private subscritpion: Subscription, private adalService: AdalService, private armService: ArmService) {
        super(subscritpion.displayName, NodeType.Subscription);
    }

    public loadChildren(): Promise<AzureMediaAccountNode[]> {
        return this.loadMediaAccounts().pipe(
        map(accounts => accounts.map((a, i) => new AzureMediaAccountNode(a, this.armService, this.adalService))))
        .toPromise();
    }

    private loadMediaAccounts(): Observable<any> {
        console.log('loading media accounts...');
        return this.armService.getMediaAccounts(this.subscritpion.id);
    }
}
