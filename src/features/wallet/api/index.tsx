import {callApi} from 'src/api';
import config from 'src/config';

export type Account = {
  address: string;
  balance: string;
  nonce: number;
};

export type AccountTransaction = {
  txHash: string;
  timestamp: number;
  value: number;
  sender: string;
  receiver: string;
  status: 'success' | 'pending' | 'invalid';
};

export function getAccount(address: string): Promise<Account> {
  const apiConfig: {url: string; method: 'get'; baseURL: string} = {
    url: `/accounts/${address}`,
    baseURL: config.api.elrondApi,
    method: 'get',
  };

  return callApi(apiConfig);
}

export function getTransactions(
  address: string,
): Promise<Array<AccountTransaction>> {
  const apiConfig: {url: string; method: 'get'; baseURL: string} = {
    url: `/accounts/${address}/transactions`,
    baseURL: config.api.elrondApi,
    method: 'get',
  };

  return callApi(apiConfig);
}
