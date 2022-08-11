import {callApi} from 'src/api';

export type GeneratedMnemonic = {
  mnemonic: string;
};

export type Wallet = {
  wallet: {
    address: string;
    bech32: string;
  };
};

export function generateMnemonic(): Promise<GeneratedMnemonic> {
  const apiConfig: {url: string; method: 'get'} = {
    url: '/generate-mnemonic',
    method: 'get',
  };

  return callApi(apiConfig);
}

export function importWallet(data: string): Promise<Wallet> {
  const apiConfig: {url: string; method: 'post'; data: {mnemonic: string}} = {
    url: '/import-wallet',
    method: 'post',
    data: {mnemonic: data},
  };

  return callApi(apiConfig);
}
