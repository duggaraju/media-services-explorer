import { MediaAccount } from "./mediaaccount";
import { MediaEnvironment } from "../mediaenvironment";
import { Account } from "../account";
import { AccountType } from '../account.type';
import { AcsCredentials } from '../acs/acs.credentials';
import {} from './aad/aad.credentials';

export class AcsAccount  {
    public accountType = AccountType.AcsAccount;
    public name: string;

    public accountName: string;
    public accountKey: string;
    public scope:string;
    public apiUrl: string;
    public acsBaseAddress: string[];
    public environment = MediaEnvironment.Production;
    public username: string;

    public properties: Map<string, any>;

    public constructor(accountName?: string, accountKey?:string, environment?: MediaEnvironment) {
        this.accountName = accountName;
        this.accountKey = accountKey;
        this.environment = environment || MediaEnvironment.Production;
    }

    public get mediaEnvironment(): string {
        return MediaEnvironment[this.environment];
    }

    public set mediaEnvironment(value: string) {
        this.environment = MediaEnvironment[value] || MediaEnvironment.Production;
    }

    public static getSettingsForEnvironment(account: AcsAccount) {
        let template = AcsAccount.environments.get(account.environment);
        if (template) {
            console.log(`Found settings for ${MediaEnvironment[account.environment]} ${template.scope}, ${template.apiUrl}`);
            account.scope = template.scope;
            account.apiUrl = template.apiUrl;
            account.acsBaseAddress = template.acsBaseAddress;
        }
    };

    static readonly environments:Map<MediaEnvironment, AcsAccount> = 
    new Map<MediaEnvironment, AcsAccount>()
        .set(MediaEnvironment.Production, <AcsAccount> {
            apiUrl: "https://media.windows.net",
            scope: "urn:WindowsAzureMediaServices",
            acsBaseAddress:  [
                "https://wamsprodglobal001acs.accesscontrol.windows.net",
                "https://wamsprodglobal002acs.accesscontrol.windows.net"
            ]
        }).set(MediaEnvironment.Mooncake, <AcsAccount> {
            apiUrl: "https://media.chinacloud.cn",
            scope: "urn:WindowsAzureMediaServices",
            acsBaseAddress: [
                "https://"
            ]
        }).set(MediaEnvironment.BlackForest, <AcsAccount> {
        });
}