function Holdings(props) {
    let flag = Object.keys(props.state.holdings).some(key => {
        if (props.state.holdings[key].amount > 0) return true;
        else return false;
    })

    return (
        <div className="container-holdings">
            <div className="title-holdings">Current Holdings</div>
            <div className="container-values">
                {!flag && <div className="buy-some">Go buy some 🚀</div>}
                {flag && Object.keys(props.state.holdings).map(key => {
                    if (props.state.holdings[key].amount > 0) {
                        let curr = props.state.holdings[key].amount;
                        let currentValue = (props.state.prices[key] * curr).toFixed(2);
                        let totalPaid = (props.state.holdings[key].totalPaid.toFixed(2));
                        let change = currentValue - totalPaid;
                        return <div className="holdings-card" key={key}>
                            <div className="first-row">{key === 'bit' ? 'Bitcoin' : key === 'eth' ? 'Ethereum' : 'Dogecoin'}: {curr}</div>
                            <div className="second-row">Total Paid: ${totalPaid}, Current Value: ${currentValue}</div>
                            <div className="third-row" style={{ color: change > 0 ? 'green' : 'red' }}>P/L: {change >= 0 ? '' : '-'}${Math.abs(change)} {change > 0 ? '🚀' : '🔻'}</div>
                        </div>
                    }
                    else return null;
                })}
            </div>

        </div>
    )
}

export default Holdings;