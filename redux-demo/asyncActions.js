const produce = require('immer').produce;
const redux = require('redux');
const axios = require('axios');
const thunkMiddleware = require('redux-thunk').thunk;
const reduxLogger = require('redux-logger');

const createStore = redux.legacy_createStore;
const bindActionCreators = redux.bindActionCreators;
const applyMiddleware = redux.applyMiddleware;

const logger = reduxLogger.createLogger();

const url = 'https://jsonplaceholder.typicode.com/users';

const initilaState = { loading: false, data: [], error: '' };

const FETCH_USERS_REQUESTED = 'FETCH_USERS_REQUESTED';
const FETCH_USERS_SUCCEDED = 'FETCH_USERS_SUCCEDED';
const FETCH_USERS_FAILED = 'FETCH_USERS_FAILED';

const fetchUsersRequested = () => ({
  type: FETCH_USERS_REQUESTED,
});
const fetchUsersSucceded = (data) => ({
  type: FETCH_USERS_SUCCEDED,
  data,
});
const fetchUsersFailed = (error) => ({
  type: FETCH_USERS_FAILED,
  error,
});

const reducer = (state = initilaState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUESTED:
      return produce(state, (draft) => {
        draft.loading = true;
        draft.data = [];
        draft.error = '';
      });
      break;
    case FETCH_USERS_SUCCEDED:
      return produce(state, (draft) => {
        draft.loading = false;
        draft.data = action.data;
        draft.error = '';
      });
      break;
    case FETCH_USERS_FAILED:
      return produce(state, (draft) => {
        draft.loading = false;
        draft.data = [];
        draft.error = action.error;
      });
      break;

    default:
      return state;
      break;
  }
};

const fetchUsers = () => {
  return (dispatch) => {
    dispatch(fetchUsersRequested());
    axios
      .get(url)
      .then((response) => {
        const users = response.data.map((user) => user.id);
        dispatch(fetchUsersSucceded(users));
      })
      .catch((error) => {
        dispatch(fetchUsersFailed(error.message));
      });
  };
};

const middleware = applyMiddleware(logger, thunkMiddleware);

const store = createStore(reducer, middleware);
console.log('Initial state', store.getState());

const usubscribe = store.subscribe(() => {});

store.dispatch(fetchUsers());

// const actions = bindActionCreators(
//   { fetchUsersRequested, fetchUsersSucceded, fetchUsersFailed },
//   store.dispatch
// );
// actions.fetchUsersRequested();
// actions.fetchUsersSucceded([{ id: 1, name: 'nygn' }]);
// actions.fetchUsersFailed('API 404');

usubscribe();
