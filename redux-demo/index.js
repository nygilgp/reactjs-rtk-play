const redux = require('redux');
const produce = require('immer').produce;
const reduxLogger = require('redux-logger');

const createStore = redux.legacy_createStore;
const bindActionCreators = redux.bindActionCreators;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;

const logger = reduxLogger.createLogger();

const CAKE_ORDERED = 'CAKE_ORDERED';
const CAKE_RESTOCKED = 'CAKE_RESTOCKED';
const ICECREAM_ORDERED = 'ICECREAM_ORDERED';
const ICECREAM_RESTOCKED = 'ICECREAM_RESTOCKED';

function orderCake() {
  return {
    type: CAKE_ORDERED,
    quantity: 1,
  };
}
function restockCake(quantity = 1) {
  return {
    type: CAKE_RESTOCKED,
    quantity,
  };
}

function orderIcecream() {
  return {
    type: ICECREAM_ORDERED,
    quantity: 1,
  };
}
function restockIcecream(quantity = 1) {
  return {
    type: ICECREAM_RESTOCKED,
    quantity,
  };
}

const initialCakeState = {
  numberOfCakes: 10,
};

const initialIcecreamState = {
  numberOfIcecreams: 20,
};

const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      // return {
      //   ...state,
      //   numberOfCakes: state.numberOfCakes - 1,
      // };
      return produce(state, (draft) => {
        draft.numberOfCakes = draft.numberOfCakes - 1;
      });
      break;
    case CAKE_RESTOCKED:
      // return {
      //   ...state,
      //   numberOfCakes: state.numberOfCakes + action.quantity,
      // };
      return produce(state, (draft) => {
        draft.numberOfCakes = draft.numberOfCakes + action.quantity;
      });
      break;

    default:
      return state;
  }
};
const iceCreamReducer = (state = initialIcecreamState, action) => {
  switch (action.type) {
    case ICECREAM_ORDERED:
      // return {
      //   ...state,
      //   numberOfIcecreams: state.numberOfIcecreams - 1,
      // };
      return produce(state, (draft) => {
        draft.numberOfIcecreams = draft.numberOfIcecreams - 1;
      });
      break;
    case ICECREAM_RESTOCKED:
      // return {
      //   ...state,
      //   numberOfIcecreams: state.numberOfIcecreams + action.quantity,
      // };
      return produce(state, (draft) => {
        draft.numberOfIcecreams = draft.numberOfIcecreams + action.quantity;
      });
      break;

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer,
});

const store = createStore(rootReducer, applyMiddleware(logger));
console.log('Initial state', store.getState());

// const usubscribe = store.subscribe(() =>
//   console.log('Updated state', store.getState())
// );
const usubscribe = store.subscribe(() => {});

// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(restockCake(3));

const actions = bindActionCreators(
  { orderCake, restockCake, orderIcecream, restockIcecream },
  store.dispatch
);
actions.orderCake();
actions.orderCake();
actions.orderCake();
actions.restockCake(4);
actions.orderIcecream();
actions.orderIcecream();
actions.orderIcecream();
actions.restockIcecream(2);

usubscribe();
