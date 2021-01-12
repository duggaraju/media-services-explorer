import { AccountNode } from './account.node';
import { Account } from '../account';
import { MediaEnvironment } from '../mediaenvironment';

export class MediaAccountNode extends AccountNode {

    public accountKey?: string;
    public mediaEnvironment: MediaEnvironment = MediaEnvironment.Production;

    constructor(account: Account) {
        super(account.name, account.accountType as number, account);
    }
}
