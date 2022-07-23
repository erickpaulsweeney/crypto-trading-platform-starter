function Transactions(props) {
    let list = props.state.transactions;

    return (
        <div className="container-transactions">
            <div className="title-transactions">Transactions</div>
            <div className="container-list">
                {list.length === 0 && <div className="no-transactions">No transactions yet...</div>}
                {list.length > 0 && list.map(el => <div className="transaction-card" key={el.time} style={{ borderColor: el.type === 'Buy' ? 'green' : 'red' }}>
                    <div className="details-row">{el.currency === 'bit' ? 'Bitcoin' : el.currency === 'eth' ? 'Ethereum' : 'Dogecoin'} - {el.amount}@${el.price}</div>
                    <div className="money-row">{el.type === 'Buy' ? 'Paid' : 'Received'}: ${(el.paid).toFixed(2)}</div>
                    <div className="date-row">
                        Bought on &nbsp;
                        {el.time.getDate().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}
                        /
                        {(el.time.getMonth() + 1).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}
                        /
                        {el.time.getFullYear().toString()}
                        , &nbsp;
                        {el.time.getHours().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}
                        :
                        {el.time.getMinutes().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}
                        :
                        {(el.time.getSeconds() + 1).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}
                    </div>
                </div>)}
            </div>

        </div>
    )
}

export default Transactions;