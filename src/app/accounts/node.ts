import { Observable, of } from 'rxjs';
import { NodeType } from './node.type';

export class Node {

    public hasChildren = true;
    public children: Node[] = [];

    constructor(public name: string, public nodeType: NodeType = NodeType.Root) {
        this.hasChildren = this.nodeType === NodeType.Root ||
            this.nodeType === NodeType.AzureAccount ||
            this.nodeType === NodeType.Subscription;
    }

    public loadChildren(): Promise<Node[]> {
        return Promise.resolve([]);
    }

    public onActivate(): Observable<boolean> {
        return of(true);
    }
}
