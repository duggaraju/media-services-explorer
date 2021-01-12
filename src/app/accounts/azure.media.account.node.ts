import { AccountNode } from './account.node';
import { MediaEnvironment } from '../mediaenvironment';
import { ArmService } from '../arm/arm.service';
import { AadService } from '../aad/aad.service';
import { NodeType } from './node.type';
import { AccountType } from '../account.type';
import { MediaAccountInfo } from '../arm/media.account.info';

export class AzureMediaAccountNode extends AccountNode {

    public accountKey?: string;

    constructor(public mediaAccountInfo: MediaAccountInfo, private armService?: ArmService, private aadService?: AadService) {
        super(mediaAccountInfo.name, NodeType.ArmAccount, mediaAccountInfo as any);
        if (this.aadService) {
            this.account.accountType = AccountType.AadAccount;
            this.account.properties.mediaEnvironment = MediaEnvironment.Custom;
        }
    }
}
