import { Account } from '../account';
import { AccountType } from '../account.type';
import { Observable } from 'rxjs/Rx';
import { NodeType } from './node.type';

export class Node {

    public hasChildren: boolean = true;
    public children: Node[];

    constructor(public name:string, public nodeType: NodeType = NodeType.Root, public account?: Account) {
        this.hasChildren = this.nodeType == NodeType.Root || this.nodeType == NodeType.AzureAccount || this.nodeType == NodeType.Subscription;
    }

    public loadChildren(): Promise<Node[]> {
        return Promise.resolve([]);
    }

    public onActivate(): Observable<boolean> {
        return Observable.of(true);
    }
}