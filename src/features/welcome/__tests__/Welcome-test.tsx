import 'react-native';
import React from 'react';
import {TextInput} from 'react-native';
import renderer, {act} from 'react-test-renderer';

// TODO: import mnemonicWords
import {mnemonicWords} from '@elrondnetwork/dapp-core/constants';

// const mnemonicWords =
//   'will minute summer mass topic hat magnet ball secret furnace sure pill high visa gallery garment uncle museum moon group void tornado then exile';

import Button from 'src/components/button/Button';
import {MediumText} from 'src/components/text';

jest.mock('@react-native-community/netinfo', () => ({
  fetch: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({navigate: jest.fn()}),
}));

import WelcomeScreen from '../containers/Welcome';

describe('Welcome screen', () => {
  const container = renderer.create(<WelcomeScreen />);
  const containerInstance = container.root;

  it('renders', () => {
    expect(container).toBeTruthy();
  });

  it('mnemonic text field is empty', () => {
    const MnemonicInput = containerInstance.findAllByType(TextInput)[0];
    expect(MnemonicInput.props.value).toBe('');
  });

  it('submit mnemonic is disabled', () => {
    const MnemonicSubmit = containerInstance.findAllByType(Button)[0];
    expect(MnemonicSubmit.props.disabled).toBe(true);
  });

  it('generate new mnemonic is enabled', () => {
    const GenerateMnemonic = containerInstance.findAllByType(Button)[1];
    expect(GenerateMnemonic.props.disabled).toBe(false);
  });

  it('mnemonic validation - invalid', () => {
    const MnemonicInput = containerInstance.findAllByType(TextInput)[0];

    const text = 'text';
    act(() => MnemonicInput.props.onChangeText(text));

    const ErrorMessage = containerInstance.findAllByType(MediumText)[0];
    const MnemonicSubmit = containerInstance.findAllByType(Button)[0];

    expect(MnemonicInput.props.value).toBe(text);
    expect(ErrorMessage.props.text).toEqual('Invalid mnemonic');
    expect(MnemonicSubmit.props.disabled).toBe(true);
  });

  it('mnemonic validation - valid', () => {
    const MnemonicInput = containerInstance.findAllByType(TextInput)[0];

    const text = mnemonicWords.slice(0, 24).join(' ');
    act(() => MnemonicInput.props.onChangeText(text));

    const ErrorMessage = containerInstance.findAllByType(MediumText)[0];
    const MnemonicSubmit = containerInstance.findAllByType(Button)[0];

    expect(MnemonicInput.props.value).toBe(text);
    expect(ErrorMessage.props.text).toEqual('Import wallet');
    expect(MnemonicSubmit.props.disabled).toBe(false);
  });
});
