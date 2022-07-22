function Transactions(props) {
    return (
        <div className="container-transactions">
            <div className="title-transactions">Transactions</div>
            { !props.transactions && <div className="no-transactions">No transactions yet...</div>}
        </div>
    )
}

export default Transactions;