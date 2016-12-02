import { MediaAccount } from "./media/mediaaccount";
import { MediaEnvironment } from "./mediaenvironment";

export class Account implements MediaAccount {
    public accountName: string;
    public accountKey: string;
    public scope:string;
    public apiUrl: string;
    public acsBaseAddress: string[];
    public environment: MediaEnvironment;

    public constructor(accountName?: string, accountKey?:string, environment?: MediaEnvironment) {
        this.accountName = accountName;
        this.accountKey = accountKey;
        this.environment = environment;
        this.getSettingsForEnvironment(environment);
    }

    public getSettingsForEnvironment(environment:MediaEnvironment) {
        let template = Account.environments.get(environment);
        if (template) {
            console.log(`Found settings for ${MediaEnvironment[environment]} ${template.scope}, ${template.apiUrl}`);
            this.scope = template.scope;
            this.apiUrl = template.apiUrl;
            this.acsBaseAddress = template.acsBaseAddress;
        }
    };

    static readonly environments:Map<MediaEnvironment, Account> = 
    new Map<MediaEnvironment, Account>()
        .set(MediaEnvironment.Production, <Account> {
            apiUrl: "https://media.windows.net",
            scope: "urn:WindowsAzureMediaServices",
            acsBaseAddress:  [
                "https://wamsprodglobal001acs.accesscontrol.windows.net",
                "https://wamsprodglobal002acs.accesscontrol.windows.net"
            ]
        }).set(MediaEnvironment.Mooncake, <Account> {
        }).set(MediaEnvironment.BlackForest, <Account> {
        });
}