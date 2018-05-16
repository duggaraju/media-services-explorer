import { Node } from './node';
import { Account } from '../account';
import { AccountType } from '../account.type';
import { MediaEnvironment } from '../mediaenvironment';
import { ArmService } from '../arm/arm.service';
import { AdalService } from '../aad/adal.service';
import { Observable } from 'rxjs/Rx';
import { NodeType } from './node.type';

export class MediaAccountNode extends Node {

    private loaded = false;
    public accountKey: string;
    public mediaEnvironment: MediaEnvironment;

    constructor(account: Account) {
        super(account.name, <number>account.accountType, account);
    }
}
