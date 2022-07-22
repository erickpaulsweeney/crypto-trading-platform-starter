import { useState } from "react";

function TransactionWindow(props) {
    let [transaction, setTransaction] = useState('Buy');
    let [isDisabled, setIsDisabled] = useState(false);
    let currPrice = props.state.prices[props.input];
    let max = props.state.currWallet * currPrice;

    return (
        <div className="container-window" style={{ display: props.state.window && 'flex' }}>
            <div className="window-header">{transaction} + {props.input}</div>
            <div className="window-price">Current Price: {currPrice}</div>
            <div className="input-row">
                <input type="number" placeholder="0" onChange={(ev) => {
                    if (ev.target.value > max) setIsDisabled(true);
                    else setIsDisabled(false);
                }}/>
                <div className="window-max">Max: {max}</div>
            </div>
            <div className="buy-row">
                <input type="radio" id="buy-radio" name="transaction" onClick={() => transaction !== 'Buy' && setTransaction('Sell')}/>
                <label htmlFor="buy-radio">Buy</label>
            </div>
            <div className="sell-row">
                <input type="radio" id="sell-radio" name="transaction" onClick={() => transaction !== 'Sell' && setTransaction('Buy')}/>
                <label htmlFor="sell-radio">Sell</label>
            </div>
            <button className="transaction-btn" disabled={isDisabled}>{transaction}</button>
        </div>
    )
}

export default TransactionWindow;