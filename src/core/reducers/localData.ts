
export default function localData(state: any, action: any) {
  switch (action.type) {
    case 'update':
      return ({
        ...state,
        [action.name]: action.value
      })
    case 'delete':
      delete state[action.name];
      return state;
    default:
      return state;
  }
};