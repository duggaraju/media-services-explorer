import { AccountType } from './account.type';
import { MediaEnvironment } from './mediaenvironment';

export class Account  {
    public accountType = AccountType.AcsAccount;
    public name: string;
    public properties: { [name:string] : any } = {};
}

export interface ApiEndpoint {
  endpoint: string;
  version?: string
}


export interface AcsAccountProperties {
  mediaEnvironment?: MediaEnvironment;
  endpoints: ApiEndpoint[],
  primaryKey?: string;
  secondaryKey?: string;
  scope?: string;
  primaryAuthAddress?: string;
  secondaryAuthAddress?: string;
}

