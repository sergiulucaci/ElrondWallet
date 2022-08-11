import {useCallback, useState} from 'react';

type Props = {
  methodToCall: Function;
};

type DataToReturn = {
  isLoading: boolean;
  error: string;
  data?: any;
  fireRequest: Function;
};

const useApi = ({methodToCall}: Props): DataToReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState({});

  const fireRequest = useCallback(async () => {
    console.log('=== request...', methodToCall);
    setIsLoading(true);
    try {
      const response = await methodToCall();
      if (response) {
        setData(response);
      }
      if (error) {
        setError('');
      }
      setIsLoading(false);
    } catch (e: any) {
      console.log('== error : ', e);
      setError(e?.message || JSON.stringify(e));
      setIsLoading(false);
    }
  }, [error, methodToCall]);

  return {
    isLoading,
    error,
    data,
    fireRequest,
  };
};

export default useApi;
