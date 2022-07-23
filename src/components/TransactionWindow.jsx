import { useState } from "react";

function TransactionWindow(props) {
    let [transaction, setTransaction] = useState('Buy');
    let [isDisabled, setIsDisabled] = useState(false);
    let [value, setValue] = useState('');
    let currPrice = props.state.prices[props.state.active];
    let buyMax = props.state.currWallet / currPrice;
    let sellMax = props.state.active && props.state.holdings[props.state.active].amount;
    let coin = props.state.active === 'bit' ? 'Bitcoin' : props.state.active === 'eth' ? 'Ethereum' : 'Dogecoin';

    return (
        <div className="container-window" style={{ display: props.state.window && 'flex' }} >
            <div className="container-main">
                <div className="window-header">
                    <div className="header-text">{transaction} {coin}</div>
                    <div className="window-close" onClick={() => {
                        setValue('');
                        props.dispatch({ type: props.ACTIONS.TOGGLE_WINDOW });
                    }}>X</div>
                </div>
                <div className="window-price">Current Price: {currPrice}</div>
                <div className="input-row">
                    <input type="number" placeholder="0" className="input-bar" value={value} onChange={(ev) => {
                        if (ev.target.value > (transaction === 'Buy' ? buyMax : sellMax)) setIsDisabled(true);
                        else setIsDisabled(false);
                        setValue(ev.target.value);
                    }} />
                    <div className="window-max">Max: {transaction === 'Buy' ? buyMax : sellMax }</div>
                </div>
                <div className="options-row">
                    <div className="buy-row">
                        <input type="radio" id="buy-radio" name="transaction" onClick={() => transaction !== 'Buy' && setTransaction('Buy')} />
                        <label htmlFor="buy-radio">Buy</label>
                    </div>
                    <div className="sell-row">
                        <input type="radio" id="sell-radio" name="transaction" onClick={() => transaction !== 'Sell' && setTransaction('Sell')} />
                        <label htmlFor="sell-radio">Sell</label>
                    </div>
                </div>

                <button className="transaction-btn" disabled={isDisabled} onClick={(ev) => {
                    if (ev.target.disabled) {
                        return;
                    }
                    setValue('');
                    props.dispatch({ 
                        type: transaction === 'Buy' ? props.ACTIONS.BUY_COIN : props.ACTIONS.SELL_COIN,
                        payload: { amount: Number(value), currency: props.state.active, actualValue: value * currPrice, price: currPrice }
                     })
                }}>{transaction}</button>
            </div>
        </div>
    )
}

export default TransactionWindow;