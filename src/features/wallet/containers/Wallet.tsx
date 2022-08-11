import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';

import {
  type Account,
  getAccount,
  getTransactions,
  Transaction,
} from 'src/features/wallet/api';
import {LargeText, MediumText, SmallText} from 'src/components/text';
import ScreenContainer from 'src/components/screenContainer/ScreenContainer';
import Button from 'src/components/button/Button';
import useApi from 'src/hooks/useApi';
import {RootStackParamList} from 'src/navigation/AppNavigation';
import {GRAY, GRAY2} from 'src/theme/colors';

type NavigationProp = RouteProp<RootStackParamList>;

const Wallet = () => {
  const route = useRoute<NavigationProp>();
  const address = route?.params?.address;

  const onGetWalletAccount = async () => {
    // @ts-ignore
    return await getAccount(address);
  };

  const {
    error: getWalletAccountError,
    data: getWalletAccountData,
    fireRequest: fireGetWalletAccount,
  }: {
    error: string;
    data?: Account;
    fireRequest: Function;
  } = useApi({
    methodToCall: onGetWalletAccount,
  });

  const onGetTrasanctions = async () => {
    // @ts-ignore
    return await getTransactions(address);
  };

  const {
    isLoading: getTransactionsIsLoading,
    error: getTransactionsError,
    data: getTransactionsData,
    fireRequest: fireGetTransactions,
  }: {
    isLoading: boolean;
    error: string;
    data?: Array<Transaction>;
    fireRequest: Function;
  } = useApi({
    methodToCall: onGetTrasanctions,
  });

  const walletAccount = getWalletAccountData || {
    address: '',
    balance: '',
  };

  const transactions = getTransactionsData || [];

  useEffect(() => {
    if (address) {
      fireGetWalletAccount();
      fireGetTransactions();
    }
  }, [address]);

  return (
    <ScreenContainer>
      {address ? (
        <View style={styles.section}>
          <LargeText text="Address" />
          <MediumText text={address} style={styles.text} />
        </View>
      ) : null}
      {walletAccount.address ? (
        <View style={styles.section}>
          <LargeText text="Balance" />
          <MediumText
            text={`${walletAccount.balance} XeGLD`}
            style={styles.text}
          />
        </View>
      ) : null}
      {getWalletAccountError ? (
        <MediumText text={getWalletAccountError} />
      ) : null}
      <Button text="Send transaction" disabled={true} onPress={() => {}} />
      <LargeText style={styles.largeText} text="Last 10 transactions" />
      <View style={styles.transactions}>
        {getTransactionsIsLoading ? (
          <MediumText text="Loading..." />
        ) : transactions.length ? (
          transactions.map(t => (
            <View key={t.txHash} style={styles.transaction}>
              <SmallText text={`txHash: ${t.txHash}`} />
              <SmallText text={new Date(t.timestamp).toLocaleString()} />
              {/*<SmallText text={`value: ${t.value}`} />*/}
              {/*<SmallText text={`sender: ${t.sender}`} />*/}
              {/*<SmallText text={`receiver: ${t.receiver}`} />*/}
              <SmallText text={`status: ${t.status}`} />
            </View>
          ))
        ) : (
          <MediumText text="No transactions for current address" />
        )}
        {getTransactionsError ? (
          <MediumText text={getTransactionsError} />
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
});

export default Wallet;
