import React, {useEffect, useState} from 'react';
import {Platform, StyleSheet, TextInput} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';

import {LargeText, MediumText} from 'src/components/text';
import ScreenContainer from 'src/components/screenContainer/ScreenContainer';
import Button from 'src/components/button/Button';
import useApi from 'src/hooks/useApi';
import {
  NativeStackNavigationProp,
  RootStackParamList,
} from 'src/navigation/AppNavigation';
import {
  getNetWorkConfig,
  NetworkConfigData,
  sendTransaction,
  TransactionSent,
} from 'src/features/transaction/api';

type TransactionRouteProp = RouteProp<RootStackParamList, 'Transaction'>;

const Transaction = () => {
  const route = useRoute<TransactionRouteProp>();
  const {navigate} = useNavigation<NativeStackNavigationProp>();
  const {account, mnemonic} = route?.params || {};

  const [senderAddress, setSenderAddress] = useState('');
  const [amount, setAmount] = useState('');

  const onGetNetworkConfig = async () => {
    // @ts-ignore
    return await getNetWorkConfig();
  };

  const {
    isLoading: getNetworkConfigIsLoading,
    error: getNetworkConfigError,
    data: NCData,
    fireRequest: fireGetNetworkConfig,
  }: {
    isLoading: boolean;
    error: string;
    data?: NetworkConfigData;
    fireRequest: Function;
  } = useApi({
    methodToCall: onGetNetworkConfig,
  });

  const networkConfig = NCData?.data?.config || {
    erd_chain_id: '',
    erd_min_gas_limit: 0,
    erd_min_gas_price: 0,
  };

  const onSendTransaction = async () => {
    const transaction: TransactionSent = await sendTransaction({
      chainID: networkConfig.erd_chain_id,
      gasLimit: networkConfig.erd_min_gas_limit,
      gasPrice: networkConfig.erd_min_gas_price,
      receiver: senderAddress,
      senderMnemonic: mnemonic,
      senderNonce: account.nonce,
      value: (parseFloat(amount) * 1e18).toString(),
    });
    navigate('Confirmation', {
      value: amount,
      receiver: senderAddress,
      txHash: transaction?.data.txHash,
    });
  };

  const {
    isLoading: sendTransactionIsLoading,
    error: sendTransactionError,
    fireRequest: fireSendTransaction,
  }: {
    isLoading: boolean;
    error: string;
    fireRequest: Function;
  } = useApi({
    methodToCall: onSendTransaction,
  });

  useEffect(() => {
    if (account) {
      fireGetNetworkConfig();
    }
  }, [account]);

  const onChangeSenderAddress = (value: string) => {
    setSenderAddress(value);
  };

  const onChangeAmount = (value: string) => {
    setAmount(value);
  };

  const buttonIsDisabled = !(
    senderAddress &&
    amount &&
    !getNetworkConfigIsLoading &&
    !sendTransactionIsLoading &&
    networkConfig.erd_chain_id
  );

  return (
    <ScreenContainer>
      <LargeText text="Send" />

      <MediumText style={styles.label} text="To" />
      <TextInput
        style={styles.textArea}
        numberOfLines={5}
        multiline
        onChangeText={onChangeSenderAddress}
        value={senderAddress}
        placeholder="Receiver address"
      />

      <MediumText style={styles.label} text="Amount" />
      <TextInput
        style={styles.textArea}
        numberOfLines={5}
        multiline
        onChangeText={onChangeAmount}
        value={amount}
        placeholder="XeGLD amount"
      />

      {getNetworkConfigError ? (
        <MediumText text={`Network API: ${getNetworkConfigError}`} error />
      ) : null}

      {sendTransactionError ? (
        <MediumText text={`Transaction API: ${sendTransactionError}`} error />
      ) : null}

      <Button
        containerStyle={styles.button}
        disabled={buttonIsDisabled}
        text="Send transaction"
        onPress={() => fireSendTransaction()}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  textArea: {
    borderWidth: 0.5,
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'white',
    width: '100%',
    height: Platform.OS === 'ios' ? 'auto' : 32,
  },
  label: {
    alignSelf: 'flex-start',
    marginTop: 12,
  },
  button: {
    marginTop: 12,
  },
});

export default Transaction;
