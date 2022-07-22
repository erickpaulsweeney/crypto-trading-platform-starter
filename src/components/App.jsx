import Header from "./Header";
import CurrencyPrice from "./CurrencyPrice";
import Holdings from "./Holdings";
import Transactions from "./Transactions";
import TransactionWindow from "./TransactionWindow";
import { useEffect, useReducer } from "react";

const ACTIONS = {
    SET_DATA: "set-data", 
    DISPLAY_WINDOW: 'display-window', 
    BUY_COIN: "buy-coin",
    SELL_COIN: "sell-coin"
};

// { type: , payload:, currency: }

function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.SET_DATA: 
            return { ...state, data: action.payload };
        case ACTIONS.BUY_COIN:
            let buyState = JSON.parse(JSON.stringify(state));
            let buyWallet = buyState.currWallet - action.payload;
            let buyHoldings = buyState.holdings[action.currency].amount + action.payload;
            return { ...state, currWallet: buyWallet, holdings: buyHoldings };
        case ACTIONS.SELL_COIN:
            let sellState = JSON.parse(JSON.stringify(state));
            let sellWallet = sellState.currWallet + action.payload;
            let sellHolding = sellState.holdings[action.currency].amount - action.payload;
            return { ...state, currWallet: sellWallet, holdings: sellHolding };
        case ACTIONS.DISPLAY_WINDOW: 
            return { ...state, window: !state.window }
        default:
            return state;
    }
}

function App() {
    let stateObj = {
        currWallet: 100,
        currPortfolio: 0,
        prices: { bit: 0, eth: 0, doge: 0 },
        holdings: { 
            bit: { totalPaid: 0, amount: 0 }, 
            eth: { totalPaid: 0, amount: 0 }, 
            doge: { totalPaid: 0, amount: 0 } },
        transactions: [],
        data: [],
        window: false
    };
    let [state, dispatch] = useReducer(reducer, stateObj);
    
    useEffect(() => {
        fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2C%20ethereum%2C%20dogecoin&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=%601h%2C24h%2C7d%60')
        .then(response => response.json())
        .then(data => dispatch({ type: ACTIONS.SET_DATA, payload: data }));
    }, [])

    return (
        <div className="container-all">
            <Header state={state} dispatch={dispatch} ACTIONS={ACTIONS} />
            {state.data.length === 0 && (
                <div className="fetching">Fetching...</div>
            )}
            {state.data.length !== 0 && 
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
            }
        </div>
    );
}

export default App;
