import env from '@/env';
type FinancialClient = any; // Replace with the appropriate AxiosInstance type

export class FinancialService {
    private static _instance: FinancialService = new FinancialService();
    private _financialClient?: FinancialClient;

    private constructor() {
        if (FinancialService._instance) {
            throw new Error(
                'Error: Instantiation failed: Use FinancialService.getInstance() instead of new.'
            );
        }
        FinancialService._instance = this;
    }

    public static instance(): FinancialService {
        return FinancialService._instance;
    }

    public initClients = (clients: { financialClient: FinancialClient }) => {
        this._financialClient = clients.financialClient;
    }

    //to get user account summery
     getFinancialProfile = async (userId: string) => {
      if (!this._financialClient) {
        throw new Error('Financial Client is not registered');
      }

      try {
        const response = await this._financialClient.get(`users/${userId}/financial-profile`, {
          params: {
            bankId: env.api.bankId,
          },
        });
        return response.data;
      } catch (error: any) {
        throw new Error(`Failed to get financial profile: ${error.message}`);
      }
    };


}
