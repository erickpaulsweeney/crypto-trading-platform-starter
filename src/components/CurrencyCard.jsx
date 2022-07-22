function CurrencyCard(props) {
    let currentData = props.state.data[props.coin];

    return (
        <div className="container-card" onClick={() => {
            props.dispatch({ type: props.ACTIONS.DISPLAY_WINDOW })
        }}>
            <div className="icon">
                <img src={currentData.image} style={{ height: '50px' }} alt="" />
            </div>
            <div className="details">
                <h1 className="unit-price">${currentData.current_price}</h1>
                <h4 className="name">{currentData.id}</h4>
                <h5 className="last24">Last 24: {currentData.price_change_percentage_24h}</h5>
            </div>
        </div>
    );
}

export default CurrencyCard;
