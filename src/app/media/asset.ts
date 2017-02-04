import { AssetOptions } from './asset-options';
import { MediaEntity } from './media.entity';

export interface Asset extends MediaEntity {
    Name: string;
    LastModified: Date;
    Created: Date;
    StorageAccount: string;
    Options: AssetOptions;
}