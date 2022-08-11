import {Alert} from 'react-native';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';

import config from 'src/config';

const checkForInternetConnection = async () => {
  const state = await NetInfo.fetch();
  if (!state.isConnected && !state.isInternetReachable) {
    Alert.alert(
      'No internet connection found,',
      'Turn on WiFi or mobile data and try to reload this screen.',
    );
  }
};

type CallApiConfigProps = {
  headers?: Object;
  data?: Object;
  baseURL?: string;
  url: string;
  method: 'get' | 'post';
};

const callApi = async (apiConfig: CallApiConfigProps) => {
  await checkForInternetConnection();

  try {
    // @ts-ignore
    const response = await axios({
      baseURL: config.api.baseUrl,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      ...apiConfig,
    });
    if (response.data.success === false) {
      return Promise.reject(new Error(response.data.error));
    }
    if (!response) {
      const error = 'Something went wrong on our side';
      return Promise.reject(new Error(error));
    }
    return Promise.resolve(response.data || response);
  } catch (error: any) {
    return Promise.reject(new Error(error));
  }
};

export {callApi};
