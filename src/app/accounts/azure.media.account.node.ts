import { AccountNode } from './account.node';
import { ArmService } from '../arm/arm.service';
import { NodeType } from './node.type';
import { MediaAccountInfo } from '../arm/media.account.info';

export class AzureMediaAccountNode extends AccountNode {

    public accountKey?: string;

    constructor(public mediaAccountInfo: MediaAccountInfo, private armService?: ArmService) {
        super(mediaAccountInfo.name, NodeType.ArmAccount, mediaAccountInfo as any);
    }
}
