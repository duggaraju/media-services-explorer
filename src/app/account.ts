import { AccountType } from './account.type';
import { MediaEnvironment } from './mediaenvironment';

export class Account  {
    public name: string;
    public properties: { [name: string]: any } = {};

    public constructor(public accountType: AccountType, name: string) {
      this.accountType = accountType;
      this.name = name;
    }
}

export interface ApiEndpoint {
  endpoint: string;
  version?: string;
}


export interface AcsAccountProperties {
  mediaEnvironment?: MediaEnvironment;
  apiEndpoints: ApiEndpoint[];
  primaryKey?: string;
  secondaryKey?: string;
  scope?: string;
  primaryAuthEndpoint?: string;
  secondaryAuthEndpoint?: string;
}

