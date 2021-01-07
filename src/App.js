import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

import Main from "./Panels/Main";
import Advice from "./Panels/Advice";
import Tests from "./Panels/Tests";

import "bootswatch/dist/lux/bootstrap.css";
import "./Styles/App.css";

const App = () => {

       return (
           <Router>
               <Switch>
                   <Route exact path="/">
                       <Main/>
                   </Route>
                   <Route path="/advice">
                       <Advice/>
                   </Route>
                   <Route path="/test/:id">
                       <Tests/>
                   </Route>

                   <Redirect from='*' to='/' />
               </Switch>
           </Router>
       );
}

export default App;
