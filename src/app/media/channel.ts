import { MediaEntity } from './media.entity';

export enum ChannelState {
    Starting,
    Running,
    Stoppping,
    Stopped
};

export interface Channel extends MediaEntity {
    Name: string;
    State: string;
    LastModified: Date;
    Created: Date;
}