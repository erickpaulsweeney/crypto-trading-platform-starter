import Header from "./Header";
import CurrencyPrice from "./CurrencyPrice";
import Holdings from "./Holdings";
import Transactions from "./Transactions";
import TransactionWindow from "./TransactionWindow";
import { useReducer, useState } from "react";

const ACTIONS = {
  BUY_COIN: "buy-coin",
  SELL_COIN: "sell-coin",
};

// { type: , payload:, currency: }

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.BUY_COIN:
      let newState = JSON.parse(JSON.stringify(state));
      let newWallet = newState.currWallet - action.payload;
      let newHoldings = newState.holdings[action.currency] + action.payload;
      return { ...state, currWallet: newWallet, holdings: newHoldings };
    case ACTIONS.SELL_COIN:
      let newState2 = JSON.parse(JSON.stringify(state));
      let newWallet2 = newState2.currWallet + action.payload;
      let newHoldings2 = newState2.holdings[action.currency] - action.payload;
      return { ...state, currWallet: newWallet2, holdings: newHoldings2 };
    default:
      return state;
  }
}

async function fetchData() {
  let response = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2C%20ethereum%2C%20dogecoin&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=%601h%2C24h%2C7d%60"
  );
  let data = await response.json();
  // console.log(data)
  return data;
}

function App() {
  let [data, setData] = useState(null);
  let stateObj = {
    currWallet: 100,
    currPortfolio: 0,
    prices: { bit: 0, eth: 0, doge: 0 },
    holdings: { bit: 0, eth: 0, doge: 0 },
    transactions: [],
    data: data,
  };
  let [state, dispatch] = useReducer(reducer, stateObj);

  return (
    <div className="container-all">
      <Header state={state} dispatch={dispatch} ACTIONS={ACTIONS} />
      {data === null && (
        <div className="fetching">Fetching...{setData(fetchData())}</div>
      )}
      {data !== null && (
        <div className="container-data">
          <CurrencyPrice state={state} dispatch={dispatch} ACTIONS={ACTIONS} />
          <div className="bottom-row">
            <Holdings state={state} dispatch={dispatch} ACTIONS={ACTIONS} />
            <Transactions state={state} dispatch={dispatch} ACTIONS={ACTIONS} />
          </div>
          <TransactionWindow
            state={state}
            dispatch={dispatch}
            ACTIONS={ACTIONS}
          />
        </div>
      )}
    </div>
  );
}

export default App;
