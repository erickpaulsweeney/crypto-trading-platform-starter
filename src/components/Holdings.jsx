function Holdings(props) {
    let flag = Object.keys(props.state.holdings).some(key => {
        if (props.state.holdings.key > 0) return true;
        else return false;
    })

    return (
        <div className="container-holdings">
            <div className="title-holdings">Current Holdings</div>
            {!flag && <div className="buy-some">Go buy some 🚀</div>}
            {flag && Object.keys(props.state.holdings).map(key => {
                if (props.state.holdings.key > 0) {
                    return <div className="holdings-card">
                        <div className="first-row">{pr}</div>
                    </div>
                }
            })}
        </div>
    )
}

export default Holdings;