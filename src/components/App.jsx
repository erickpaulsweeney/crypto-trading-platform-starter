import Header from "./Header";
import CurrencyPrice from "./CurrencyPrice";
import Holdings from "./Holdings";
import Transactions from "./Transactions";
import TransactionWindow from "./TransactionWindow";
import { useEffect, useReducer } from "react";

const ACTIONS = {
    SET_DATA: "set-data",
    TOGGLE_WINDOW: 'toggle-window',
    BUY_COIN: "buy-coin",
    SELL_COIN: "sell-coin", 
    CALC_PORTFOLIO: "calculate-portfolio"
};

// { type: , payload:, currency: }

function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.SET_DATA:
            return { ...state, data: action.payload, prices: { bit: action.payload[0].current_price, eth: action.payload[1].current_price, doge: action.payload[2].current_price } };
        case ACTIONS.CALC_PORTFOLIO: 
            let newPortfolio = 0;
            Object.keys(state.holdings).forEach(key => newPortfolio += state.holdings[key].amount * state.prices[key] );
            return { ...state, currPortfolio:newPortfolio }
        case ACTIONS.BUY_COIN:
            let buyCurr = action.payload.currency;
            let buyWallet = state.currWallet - action.payload.actualValue;
            let buyHoldings = { ...state.holdings, [buyCurr]: { totalPaid: state.holdings[buyCurr].totalPaid + action.payload.actualValue, amount: state.holdings[buyCurr].amount + action.payload.amount } };
            let buyTransactions = state.transactions.concat([{ 
                type: 'Buy', 
                currency: buyCurr, 
                amount: action.payload.amount, 
                price: action.payload.price, 
                paid: action.payload.actualValue, 
                time: new Date()
            }])
            return { ...state, currWallet: buyWallet, holdings: buyHoldings, transactions: buyTransactions };
        case ACTIONS.SELL_COIN:
            let sellCurr = action.payload.currency;
            let sellWallet = state.currWallet + action.payload.actualValue;
            let sellHoldings = { ...state.holdings, [sellCurr]: { totalPaid: state.holdings[sellCurr].totalPaid - action.payload.actualValue, amount: state.holdings[sellCurr].amount - action.payload.amount } };
            let sellTransactions = state.transactions.concat([{ 
                type: 'Sell', 
                currency: sellCurr, 
                amount: action.payload.amount, 
                price: action.payload.price, 
                paid: action.payload.actualValue, 
                time: new Date()
            }])
            return { ...state, currWallet: sellWallet, holdings: sellHoldings, transactions: sellTransactions };
        case ACTIONS.TOGGLE_WINDOW:
            let coin //= action.payload ? action.payload === 0 ? 'bit' : action.payload === 1 ? 'eth' : 'doge' : undefined ;
            if (action.payload !== undefined) {
                switch (action.payload) {
                    case 0: 
                        coin = 'bit';
                        break;
                    case 1: 
                        coin = 'eth';
                        break;
                    case 2: 
                        coin = 'doge';
                        break;
                    default: 
                        return { ...state, window: !state.window} ;
                }
            }
            else return { ...state, window: !state.window} ;
            return { ...state, active: coin, window: !state.window }
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
            doge: { totalPaid: 0, amount: 0 }
        },
        transactions: [],
        data: [],
        window: false,
        active: ''
    };
    let [state, dispatch] = useReducer(reducer, stateObj);

    useEffect(() => {
        function fetchData() {
            fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2C%20ethereum%2C%20dogecoin&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=%601h%2C24h%2C7d%60')
                .then(response => response.json())
                .then(data => {
                    dispatch({ type: ACTIONS.SET_DATA, payload: data })
                    dispatch({ type: ACTIONS.CALC_PORTFOLIO });
                });
        }
        fetchData();
        setInterval(() => {
            fetchData();
        }, 5000)
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
                    <TransactionWindow state={state} dispatch={dispatch} ACTIONS={ACTIONS} />
                </div>
            }
        </div>
    );
}

export default App;
