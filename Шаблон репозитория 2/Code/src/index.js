import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import {
  BrowserRouter as BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import Reviews from './Reviews';
import Menu from './customViews/Menu';
import Navbar from './customViews/Navbar';
import TestReview from './TestReview';
import Favorite from './Favorite';
import Analitycs from './Analitycs';
import Settings from './Settings';


class Application extends React.Component {
   
  constructor(){
      super()
  }

  render() {
      
      return (
          <div>
              <div className="app">
                 <aside style={document.location.pathname == "/auth" ? {display : 'none'} : {}}  className = "aside">
                      <Menu /> 
                  </aside>
                  <div className = "main">
                      {/* <Navbar /> */}
                      <section>
                          <main>
                              <Switch>
                                  <Route path="/reviews">
                                      <Reviews/>
                                  </Route>
                                  <Route path="/test">
                                      <TestReview/>
                                  </Route>
                                  <Route path="/bookmark">
                                      <Favorite/>
                                  </Route>
                                  <Route path="/analytics">
                                      <Analitycs/>
                                  </Route>
                                  <Route path="/settings">
                                      <Settings/>
                                  </Route>
                            
                              </Switch>
                          </main>
                      </section>
                  </div>
              
              </div>
           </div>
          
      );
      }
  
}

ReactDOM.render(
  <BrowserRouter>
      <Application/>
  </BrowserRouter>,
  document.getElementById('root')
);
