import { MediaEntity } from './media.entity';

export interface Job extends MediaEntity {
    Name: string;
    State: string;
    LastModified: Date;
    Created: Date;
}