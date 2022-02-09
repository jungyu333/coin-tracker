import { BrowserRouter, Route, Switch } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";
import Home from "./routes/Home";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/coinlist/:coinId">
          <Coin />
        </Route>
        <Route path="/coinlist">
          <Coins />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
