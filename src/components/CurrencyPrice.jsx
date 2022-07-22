import CurrencyCard from "./CurrencyCard";

function CurrencyPrice(props) {
  return (
    <div className="container-currency-price">
      <CurrencyCard props={props} coin={props.state.data[0].id} />
      <CurrencyCard props={props} coin={props.state.data[1].id} />
      <CurrencyCard props={props} coin={props.state.data[2].id} />
    </div>
  );
}

export default CurrencyPrice;
