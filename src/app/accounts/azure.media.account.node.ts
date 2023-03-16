import { MediaService } from '@azure/arm-mediaservices';
import { NodeType } from './node.type';
import { Node } from './node';
import { Observable } from 'rxjs';

export class AzureMediaAccountNode extends Node {

    public accountKey?: string;

    constructor(public account: MediaService) {
        super(account.name!, NodeType.MediaServicesAccount);
    }

    public override loadChildren(): Node[] {
        return [];
    }
}
