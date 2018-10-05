import { Node } from './node';
import { MediaEnvironment } from '../mediaenvironment';
import { ArmService } from '../arm/arm.service';
import { AdalService } from '../aad/adal.service';
import { NodeType } from './node.type';
import { AccountType } from '../account.type';
import { MediaAccountInfo } from '../arm/media.account.info';

export class AzureMediaAccountNode extends Node {

    public accountKey: string;

    constructor(public mediaAccountInfo: MediaAccountInfo, private armService?: ArmService, private adalService?: AdalService) {
        super(mediaAccountInfo.name, NodeType.ArmAccount, <any>mediaAccountInfo);
        if (this.adalService) {
            this.account.accountType = AccountType.AadAccount;
            this.account.properties['mediaEnvironment'] = MediaEnvironment.Custom;
        }
    }
}
