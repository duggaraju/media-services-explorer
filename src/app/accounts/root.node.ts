import { Node } from './node';
import { NodeType } from './node.type';

export class RootNode extends Node {

    constructor(name: string) {
        super(name, NodeType.Root);
    }
}