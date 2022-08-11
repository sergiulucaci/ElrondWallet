import React, {useCallback, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Clipboard, StyleSheet, Text, TextInput, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {RootStackParamList} from 'src/navigation/AppNavigation';
import {
  GeneratedMnemonic,
  generateMnemonic,
  importWallet,
} from 'src/features/welcome/api';
import useApi from 'src/hooks/useApi';
import {LargeText, MediumText} from 'src/components/text';
import Button from 'src/components/button/Button';
import {GRAY} from 'src/theme/colors';
import ScreenContainer from 'src/components/screenContainer/ScreenContainer';

export type La = {
  address: string;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Welcome = () => {
  const {navigate} = useNavigation<NavigationProp>();
  const [mnemonicWords, setMnemonicWords] = useState(
    'resist judge pledge three oil world defy electric gloom verb picnic car census prison reopen traffic frost cousin boring road vapor tobacco accident banana',
  );
  const [generatedMnemonicWordsCopied, setGeneratedMnemonicWordsCopied] =
    useState(false);
  const [walletIsValid, setWalletIsValid] = useState(false);

  const onGetMnemonicPress = async () => {
    if (generatedMnemonicWordsCopied) {
      setGeneratedMnemonicWordsCopied(false);
    }
    return await generateMnemonic();
  };

  const {
    isLoading: getMnemonicIsLoading,
    error: getMnemonicError,
    data: getMnemonicData,
    fireRequest: fireGetMnemonic,
  }: {
    isLoading: boolean;
    error: string;
    data?: GeneratedMnemonic;
    fireRequest: Function;
  } = useApi({
    methodToCall: onGetMnemonicPress,
  });

  const generatedMnemonicWords = getMnemonicData?.mnemonic;

  const checkIfMnemonicIsValid = useCallback((): boolean => {
    const arr = mnemonicWords.split(' ');
    return arr.length === 24;
  }, [mnemonicWords]);

  const onImportWalletPress = async () => {
    const wallet = await importWallet(mnemonicWords);
    navigate('Wallet', {address: wallet.wallet.bech32});
  };

  const {
    isLoading: importWalletIsLoading,
    error: importWalletError,
    fireRequest: fireImportWallet,
  }: {
    isLoading: boolean;
    error: string;
    fireRequest: Function;
  } = useApi({
    methodToCall: onImportWalletPress,
  });

  const onChangeMnemnonic = (value: string) => {
    setMnemonicWords(value);
    if (value) {
      const isValid = checkIfMnemonicIsValid();
      setWalletIsValid(isValid);
    }
  };

  useEffect(() => {
    if (mnemonicWords) {
      const isValid = checkIfMnemonicIsValid();
      setWalletIsValid(isValid);
    }
  }, [checkIfMnemonicIsValid, mnemonicWords]);

  const onCopyGeneratedMnemnonic = () => {
    // @ts-ignore
    Clipboard.setString(generatedMnemonicWords);
    setGeneratedMnemonicWordsCopied(true);
  };

  return (
    <ScreenContainer>
      <LargeText text="Your mnemonic words" style={styles.sectionTitle} />
      <TextInput
        style={styles.textArea}
        numberOfLines={5}
        multiline
        onChangeText={onChangeMnemnonic}
        value={mnemonicWords}
        placeholder="24 words"
      />
      {mnemonicWords && !walletIsValid ? (
        <MediumText text="Invalid mnemonic" error />
      ) : null}
      {importWalletError ? (
        <MediumText text={`API: ${importWalletError}`} error />
      ) : null}
      <Button
        text="Import wallet"
        disabled={!mnemonicWords || importWalletIsLoading || !walletIsValid}
        onPress={fireImportWallet}
      />
      <LargeText
        text="Wanna create a new wallet instead?"
        style={styles.sectionTitle}
      />
      <Button
        disabled={getMnemonicIsLoading}
        containerStyle={styles.lighterButton}
        text="Generate new words"
        onPress={() => fireGetMnemonic()}
      />
      {generatedMnemonicWords ? (
        <>
          <View style={styles.generatedMnemonic}>
            <Text>{generatedMnemonicWords}</Text>
          </View>
          <Button
            containerStyle={styles.lighterButton}
            text={`${generatedMnemonicWordsCopied ? 'Copied' : 'Copy'}`}
            onPress={onCopyGeneratedMnemnonic}
          />
        </>
      ) : null}
      {getMnemonicError ? <MediumText text={getMnemonicError} error /> : null}
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    marginTop: 16,
  },
  textArea: {
    width: '100%',
    borderWidth: 0.5,
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'white',
    marginTop: 12,
    height: 100,
  },
  generatedMnemonic: {
    width: '100%',
    borderWidth: 0.5,
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'white',
    marginTop: 12,
    height: 100,
  },
  lighterButton: {
    backgroundColor: GRAY,
  },
});

export default Welcome;
