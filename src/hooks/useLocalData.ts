import { useContext } from 'react';

import { LocalDataContext } from '../core/context';

const useLocalData = () : ILocalData => useContext(LocalDataContext);

export default useLocalData;