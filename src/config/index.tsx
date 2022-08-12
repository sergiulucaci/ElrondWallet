import {Platform} from 'react-native';

export default {
  api: {
    baseUrl: `http://${Platform.OS === 'ios' ? 'localhost' : '10.0.2.2'}:3000`,
    elrondApi: 'https://testnet-api.elrond.com',
  },
};
