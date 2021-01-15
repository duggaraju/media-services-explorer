import { MediaEntity } from './media.entity';

export enum JobState {
    Queueud,
    Scheduled,
    Processing,
    Finished,
    Error,
    Cancelled,
    Cancelling
}

export interface Job extends MediaEntity {
    Name: string;
    State: JobState;
    LastModified: Date;
    Created: Date;
}