export interface AcsCredentials {
    accountName: string;
    primaryKey: string;
    secondaryKey?: string;
    scope: string;
    primaryAuthAddress: string;
    secondaryAuthAddress?: string;
}