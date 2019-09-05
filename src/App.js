import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import OrderForm from "./Containers/OrderCart";


const App = () => (
    <BrowserRouter basename="/multiple-step-form">
      <Switch>
        <Route path='/' component={OrderForm} exact/>

      </Switch>
    </BrowserRouter>

);

export default App;
