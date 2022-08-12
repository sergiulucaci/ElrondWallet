import React, {useEffect} from 'react';
import {StyleSheet, Linking} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';

import {LargeText, MediumText, SmallText} from 'src/components/text';
import ScreenContainer from 'src/components/screenContainer/ScreenContainer';
import Button from 'src/components/button/Button';
import {
  NativeStackNavigationProp,
  RootStackParamList,
} from 'src/navigation/AppNavigation';
import {BLUE} from 'src/theme/colors';
import {getTransactionStatus} from 'src/features/transaction/api';
import useApi from 'src/hooks/useApi';
import {AccountTransaction} from 'src/features/wallet/api';

type ConfirmationRouteProp = RouteProp<RootStackParamList, 'Confirmation'>;

const Confirmation = () => {
  const route = useRoute<ConfirmationRouteProp>();
  const {goBack} = useNavigation<NativeStackNavigationProp>();
  const {value, receiver, txHash} = route?.params || {};

  const onGetTransaction = async () => {
    // @ts-ignore
    return await getTransactionStatus(txHash);
  };

  const {
    isLoading: getTransactionIsLoading,
    data: TData,
    fireRequest: fireGetTransaction,
  }: {
    isLoading: boolean;
    error: string;
    data?: AccountTransaction;
    fireRequest: Function;
  } = useApi({
    methodToCall: onGetTransaction,
  });

  const transaction = TData || {status: ''};

  useEffect(() => {
    if (txHash) {
      setTimeout(() => {
        fireGetTransaction();
      }, 1000);
    }
  }, [txHash]);

  const onViewInExplorer = () => {
    Linking.openURL(
      `https://testnet-explorer.elrond.com/transactions/${txHash}`,
    );
  };

  const onBackToWallet = () => {
    goBack();
    goBack();
  };

  return (
    <ScreenContainer>
      <LargeText style={styles.largeText} text={`${value} EeGLD`} />
      {transaction.status && !getTransactionIsLoading ? (
        <>
          <MediumText
            text={
              transaction.status === 'success'
                ? 'successfully sent to'
                : transaction.status === 'pending'
                ? 'pending to send to'
                : 'failed to send to'
            }
          />
          <SmallText style={styles.smallText} text={receiver} />
        </>
      ) : (
        <MediumText text="Loading..." />
      )}

      <MediumText style={styles.mediumText} text="TX Hash" />
      <SmallText style={styles.smallText} text={txHash} />

      <Button
        containerStyle={styles.buttonContainer}
        onPress={onViewInExplorer}
        text="View in explorer"
        textStyle={styles.buttonText}
      />

      <Button text="Back to Wallet" onPress={onBackToWallet} />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  largeText: {
    marginTop: 32,
  },
  smallText: {
    textAlign: 'center',
  },
  mediumText: {
    marginTop: 16,
  },
  buttonContainer: {
    backgroundColor: 'transparent',
  },
  buttonText: {
    color: BLUE,
  },
  label: {
    alignSelf: 'flex-start',
    marginTop: 12,
  },
});

export default Confirmation;
