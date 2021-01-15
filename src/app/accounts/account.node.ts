import { Node } from './node';
import { NodeType } from './node.type';
import { Account } from '../account';

export abstract class AccountNode extends Node {

    constructor(public name: string, public nodeType: NodeType, public account: Account) {
        super(name, nodeType);
    }
}
