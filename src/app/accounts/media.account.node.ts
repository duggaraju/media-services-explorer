import { Node } from './node';
import { Account } from '../account';
import { AccountType } from '../account.type';
import { MediaEnvironment } from '../mediaenvironment';
import { ArmService } from '../arm/arm.service';
import { AdalService } from '../aad/adal.service';
import { Observable } from 'rxjs/Rx';
import { NodeType } from './node.type';

export class MediaAccountNode extends Node{

    private loaded: boolean = false;
    public accountKey: string;
    public mediaEnvironment: MediaEnvironment;

    constructor(mediaAccount: any, private armService?: ArmService, private adalService?: AdalService) {
        super(mediaAccount.name,
            mediaAccount.accountType === AccountType.AcsAccount ? NodeType.AcsAccount : NodeType.ArmAccount,
            mediaAccount.accountType === AccountType.AcsAccount ? mediaAccount.properties : mediaAccount);
        if (this.properties["properties"]) {
            console.log(`found ${this.properties['properties']} to ${this.properties}`);
            Object.assign(this.properties, this.properties["properties"]);
        }
        if (this.adalService) {
            this.properties['mediaEnvironment'] = MediaEnvironment.Custom;
        }
    }

    public onActivate(): Observable<boolean> {
        if (!this.loaded && this.adalService) {
            console.log('loading account details...');
            return this.loadAccountDetails().map(account => {
                Object.assign(this.properties, account);
                this.loaded = true;
                console.log(`env:${this.properties['mediaEnvironment']}`);
                return true;
            });
        }
        return super.onActivate();
    }

    private loadAccountDetails(): Observable<any> {
        console.log("loading media account details...");
        return this.armService.getMediaAccountDetails(this.adalService, this.properties['id']);
    }    
}