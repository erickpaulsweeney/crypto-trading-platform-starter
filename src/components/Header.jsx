function Header(props) {
    return (
        <div className="container-header">
            <div className="earn-money">Earn some virtual money 💰</div>
            <div className="buy-food">To buy virtual food 🍕</div>
            <div className="wallet">🏦 Wallet: ${props.state.currWallet} </div>
            <div className="portfolio">Portfolio Value: $0.00</div>
        </div>
    )
}

export default Header;