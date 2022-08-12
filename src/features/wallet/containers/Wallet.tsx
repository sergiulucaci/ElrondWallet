import React, {useEffect, useState} from 'react';
import {Clipboard, StyleSheet, View} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {useIsFocused} from '@react-navigation/native';

import {
  type Account,
  type AccountTransaction,
  getAccount,
  getTransactions,
} from 'src/features/wallet/api';
import {LargeText, MediumText, SmallText} from 'src/components/text';
import ScreenContainer from 'src/components/screenContainer/ScreenContainer';
import Button from 'src/components/button/Button';
import useApi from 'src/hooks/useApi';
import {
  NativeStackNavigationProp,
  RootStackParamList,
} from 'src/navigation/AppNavigation';
import {GRAY, GRAY2} from 'src/theme/colors';

type WalletRouteProp = RouteProp<RootStackParamList, 'Wallet'>;

const Wallet = () => {
  const navigation = useNavigation<NativeStackNavigationProp>();
  const [addressCopied, setAddressCopied] = useState(false);
  const route = useRoute<WalletRouteProp>();
  const {address, mnemonic} = route?.params || {};

  const onGetWalletAccount = async () => {
    // @ts-ignore
    return await getAccount(address);
  };

  const {
    error: getWalletAccountError,
    data: WAData,
    fireRequest: fireGetWalletAccount,
  }: {
    error: string;
    data?: Account;
    fireRequest: Function;
  } = useApi({
    methodToCall: onGetWalletAccount,
  });

  const walletAccount = WAData || {
    address: '',
    balance: '',
    nonce: 0,
  };

  const onGetTransactions = async () => {
    // @ts-ignore
    return await getTransactions(address);
  };

  const {
    isLoading: getTransactionsIsLoading,
    error: getTransactionsError,
    data: TData,
    fireRequest: fireGetTransactions,
  }: {
    isLoading: boolean;
    error: string;
    data?: Array<AccountTransaction>;
    fireRequest: Function;
  } = useApi({
    methodToCall: onGetTransactions,
  });

  const transactions = TData || [];

  useEffect(() => {
    if (address) {
    }
  }, [address]);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && address) {
      fireGetWalletAccount();
      fireGetTransactions();
    }
  }, [address, isFocused]);

  const onAddressCopy = () => {
    // @ts-ignore
    Clipboard.setString(address);
    setAddressCopied(true);
  };

  const onSendTransaction = () => {
    navigation.navigate('Transaction', {account: walletAccount, mnemonic});
  };

  console.log(transactions);

  return (
    <ScreenContainer>
      {address ? (
        <View style={styles.section}>
          <LargeText text="Address" />
          <MediumText text={address} style={styles.text} />
          <Button
            containerStyle={styles.grayButton}
            text={addressCopied ? 'Copied' : 'Copy address'}
            onPress={onAddressCopy}
          />
        </View>
      ) : null}
      {walletAccount.address ? (
        <View style={styles.section}>
          <LargeText text="Balance" />
          <MediumText
            text={`${
              walletAccount.balance
                ? parseFloat(walletAccount.balance) / 1e18
                : 0
            } XeGLD`}
            style={styles.text}
          />
        </View>
      ) : null}
      {getWalletAccountError ? (
        <MediumText text={`API: ${getWalletAccountError}`} error />
      ) : null}
      <Button
        text="Send transaction"
        disabled={!(walletAccount.address && parseFloat(walletAccount.balance))}
        onPress={onSendTransaction}
      />
      <LargeText style={styles.largeText} text="Last 10 transactions" />
      <View style={styles.transactions}>
        {getTransactionsIsLoading ? (
          <MediumText text="Loading..." />
        ) : transactions.length ? (
          transactions.map(t => (
            <View key={t.txHash} style={styles.transaction}>
              <SmallText text={`value: ${t.value ? t.value / 1e18 : 0}`} />
              <SmallText text={`txHash: ${t.txHash}`} />
              <SmallText text={`status: ${t.status}`} />
              <SmallText text={new Date(t.timestamp * 1000).toLocaleString()} />
            </View>
          ))
        ) : (
          <MediumText text="No transactions yet" />
        )}
        {getTransactionsError ? (
          <MediumText text={`API: ${getTransactionsError}`} />
        ) : null}
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  section: {
    marginTop: 16,
    display: 'flex',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
  },
  largeText: {
    marginTop: 32,
  },
  transactions: {
    marginTop: 12,
  },
  transaction: {
    paddingTop: 12,
    paddingBottom: 12,
    borderTopWidth: 1,
    borderTopColor: GRAY2,
  },
  grayButton: {
    backgroundColor: GRAY,
  },
});

export default Wallet;
