import {callApi} from 'src/api';
import config from 'src/config';

export type Account = {
  address: string;
  balance: string;
  nonce: number;
  shard: number;
  txCount: number;
  scrCount: number;
  developerReward: string;
};

export type Transaction = {
  txHash: string;
  timestamp: number;
  value: number;
  sender: string;
  receiver: string;
  status: string;
};

export function getAccount(address: string): Promise<Account> {
  const apiConfig: {url: string; method: 'get'; baseURL: string} = {
    url: `/accounts/${address}`,
    baseURL: config.api.elrondApi,
    method: 'get',
  };

  return callApi(apiConfig);
}

export function getTransactions(address: string): Promise<Array<Transaction>> {
  const apiConfig: {url: string; method: 'get'; baseURL: string} = {
    url: `/accounts/erd1n8dlrhj75lyw6qsz6h9lfw3ytsp7v4zww9cr3h3m4s40ezug7f5stt646y/transactions`,
    baseURL: config.api.elrondApi,
    method: 'get',
  };

  return callApi(apiConfig);
}
