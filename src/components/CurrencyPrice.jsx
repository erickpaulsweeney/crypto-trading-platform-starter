import CurrencyCard from "./CurrencyCard";

function CurrencyPrice(props) {
  return (
    <div className="container-currency-price">
      <CurrencyCard state={props.state} dispatch={props.dispatch} ACTIONS={props.ACTIONS} coin={0} />
      <CurrencyCard state={props.state} dispatch={props.dispatch} ACTIONS={props.ACTIONS} coin={1} />
      <CurrencyCard state={props.state} dispatch={props.dispatch} ACTIONS={props.ACTIONS} coin={2} />
    </div>
  );
}

export default CurrencyPrice;
