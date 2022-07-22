function Holdings(props) {
    return (
        <div className="container-holdings">
            <div className="title-holdings">Current Holdings</div>
            { !props.holdings && <div className="buy-some">Go buy some 🚀</div> }
        </div>
    )
}

export default Holdings;