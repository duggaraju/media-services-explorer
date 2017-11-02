import { Node } from './node';
import { MediaEnvironment } from '../mediaenvironment';
import { ArmService } from '../arm/arm.service';
import { AdalService } from '../aad/adal.service';
import { Observable } from 'rxjs/Rx';
import { NodeType } from './node.type';
import { AccountType } from '../account.type';
import { MediaAccountInfo } from '../arm/media.account.info';

export class AzureMediaAccountNode extends Node {

    private loaded = false;
    public accountKey: string;

    constructor(public mediaAccountInfo: MediaAccountInfo, private armService?: ArmService, private adalService?: AdalService) {
        super(mediaAccountInfo.name, NodeType.ArmAccount, <any>mediaAccountInfo);
        if (this.adalService) {
            this.account.accountType = AccountType.AcsAccount;
            this.account.properties['mediaEnvironment'] = MediaEnvironment.Custom;
        }
    }

    public onActivate(): Observable<boolean> {
        if (!this.loaded && this.adalService) {
            console.log('loading account details...');
            return this.loadAccountDetails().map(account => {
                Object.assign(this.account.properties, account);
                this.loaded = true;
                return true;
            });
        }
        return super.onActivate();
    }

    private loadAccountDetails(): Observable<any> {
        console.log('loading media account keys...');
        return this.armService.getMediaAccountKeys(this.adalService, this.mediaAccountInfo.id);
    }
}
