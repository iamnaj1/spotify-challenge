import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Page1 from './components/page1';
import Page2 from './components/page2';
import Page3 from './components/page3';
 
class App extends Component {
  render() {
    return (      
       <BrowserRouter>
        <div> 
            <Switch>
             <Route path="/" component={Page1} exact/>
             <Route path="/Page2" component={Page2}/>
             <Route path="/Page3" component={Page3}/>
            {/* <Route component={Error}/> */}
           </Switch>
        </div> 
      </BrowserRouter>
    );
  }
}
 
export default App;