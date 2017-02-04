import { MediaEntity } from './media.entity';

export interface Channel extends MediaEntity {
    Name: string;
    State: string;
    LastModified: Date;
    Created: Date;
}