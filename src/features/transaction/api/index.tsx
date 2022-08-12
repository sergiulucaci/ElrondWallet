import {callApi} from 'src/api';
import config from 'src/config';
import {AccountTransaction} from 'src/features/wallet/api';

export type NetworkConfig = {
  erd_chain_id: string;
  erd_min_gas_limit: number;
  erd_min_gas_price: number;
};

export type NetworkConfigData = {
  data: {
    config: NetworkConfig;
  };
};

export function getNetWorkConfig(): Promise<NetworkConfig> {
  const apiConfig: {url: string; method: 'get'; baseURL: string} = {
    url: '/network/config',
    baseURL: config.api.elrondApi,
    method: 'get',
  };

  return callApi(apiConfig);
}

type TransactionToSign = {
  chainID: string;
  gasLimit: number;
  gasPrice: number;
  value: string;
  senderMnemonic: string;
  senderNonce: number;
  receiver: string;
};

type TransactionSigned = {
  nonce: number;
  value: string;
  receiver: string;
  sender: string;
  senderUsername: string;
  receiverUsername: string;
  gasPrice: number;
  gasLimit: number;
  data: string;
  chainID: string;
  version: number;
  signature: string;
};

export type TransactionSent = {
  data: {
    txHash: string;
  };
};

export async function sendTransaction({
  chainID,
  gasLimit,
  gasPrice,
  receiver,
  senderMnemonic,
  senderNonce,
  value,
}: TransactionToSign): Promise<TransactionSent> {
  const signTransactionConfig: {
    url: string;
    method: 'post';
    baseURL: string;
    data: TransactionToSign;
  } = {
    url: '/sign-transaction',
    baseURL: config.api.baseUrl,
    method: 'post',
    data: {
      chainID,
      gasLimit,
      gasPrice,
      receiver,
      senderMnemonic,
      senderNonce,
      value,
    },
  };
  const {signedTransaction}: {signedTransaction: TransactionSigned} =
    await callApi(signTransactionConfig);

  const apiConfig: {
    url: string;
    method: 'post';
    baseURL: string;
    data: TransactionSigned;
  } = {
    url: '/transaction/send',
    baseURL: config.api.elrondApi,
    method: 'post',
    data: signedTransaction,
  };

  return callApi(apiConfig);
}

export function getTransactionStatus(
  txHash: string,
): Promise<AccountTransaction> {
  const apiConfig: {url: string; method: 'get'; baseURL: string} = {
    url: `/transactions/${txHash}`,
    baseURL: config.api.elrondApi,
    method: 'get',
  };

  return callApi(apiConfig);
}
