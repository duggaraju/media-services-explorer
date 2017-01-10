import { MediaAccountNode } from './media.account.node';
import { Node } from './node';
import { Observable } from 'rxjs/Rx';
import { ArmService } from '../arm/arm.service';
import { AdalService } from '../aad/adal.service';
import { NodeType } from './node.type';

export class AzureSubscriptionNode extends Node {

    constructor(subscritpion: any, private adalService: AdalService, private armService: ArmService) {
        super(subscritpion.displayName, NodeType.Subscription, subscritpion);
    }

    public loadChildren(): Promise<MediaAccountNode[]> {
        return this.loadMediaAccounts()
        .map( accounts => accounts.map((a, i) => new MediaAccountNode(a, this.armService, this.adalService)))
        .toPromise();
    }

    private loadMediaAccounts(): Observable<any> {
        console.log("loading media accounts...");
        return this.armService.getMediaAccounts(this.adalService, this.properties['id']);
    }
}