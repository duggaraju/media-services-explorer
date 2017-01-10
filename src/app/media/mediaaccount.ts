import { TokenProvider } from '../token.provider';

export interface MediaAccount
{
    tokenProvider: TokenProvider;
    accountName: string;
    apiUrl: string;
    apiVersion?: string;
}
