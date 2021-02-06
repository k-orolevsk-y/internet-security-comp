import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

import Main from "./Panels/Main";
import Info from "./Panels/Info";
import ChoiceInfo from "./Panels/ChoiceInfo";
import Tests from "./Panels/Tests";
import FinishTest from "./Panels/FinishTest";
import ChoiceTest from "./Panels/ChoiceTest";

import "bootswatch/dist/lux/bootstrap.css";
import "./Styles/App.css";

const App = () => {
       return (
           <Router>
               <Switch>
                   <Route exact path="/">
                       <Main/>
                   </Route>
                   <Route path="/info/:infoId">
                       <Info/>
                   </Route>
                   <Route path="/choiceInfo">
                       <ChoiceInfo/>
                   </Route>
                   <Route path="/test/:testId/:question?">
                       <Tests/>
                   </Route>
                   <Route path="/finishTest/:testId">
                       <FinishTest/>
                   </Route>
                   <Route path="/choiceTest">
                        <ChoiceTest/>
                   </Route>

                   <Route
                       path="/clearData"
                       render={() => {
                            localStorage.clear();
                            console.log("❗️ Local storage cleared!");

                            return <Redirect to="/"/>
                       }}
                   />
                   <Redirect from='*' to='/'/>
               </Switch>
           </Router>
       );
}

export default App;
