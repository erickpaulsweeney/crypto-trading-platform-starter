function CurrencyCard(props) {
    let currentData = props.state.data[props.coin];
    let color = currentData.price_change_percentage_24h > 0 ? 'green' : 'red';

    return (
        <div className="container-card" onClick={() => {
            props.dispatch({ type: props.ACTIONS.TOGGLE_WINDOW, payload: props.coin })
        }}>
            <div className="container-icon">
                <img src={currentData.image} className="coin-icon" alt="Coin Icon" />
            </div>
            <div className="details">
                <h1 className="unit-price">${currentData.current_price}</h1>
                <h4 className="unit-name" style={{ textTransform: 'capitalize' }}>{currentData.id}</h4>
                <h5 className="unit-last24">Last 24: &nbsp;<span style={{ color: color }}>{currentData.price_change_percentage_24h}%</span> </h5>
            </div>
        </div>
    );
}

export default CurrencyCard;
