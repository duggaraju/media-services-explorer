import { AssetOptions } from './asset-options';

export interface Asset {
    Id: string;
    Name: string;
    LastModified: Date;
    Created: Date;
    StorageAccount: string;
    Options: AssetOptions;
}