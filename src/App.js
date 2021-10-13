import './css/App.css';
import NavComp from './components/NavComp'
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import {BrowserRouter, Route, Switch} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <NavComp/>
      <div className="container">
          <BrowserRouter>
              <Switch>
                  <Route exact path="/">
                      <HomePage/>
                  </Route>
                  {/*<Route path="/about">*/}
                  {/*    <About />*/}
                  {/*</Route>*/}
                  {/*<Route path="/dashboard">*/}
                  {/*    <Dashboard />*/}
                  {/*</Route>*/}
              </Switch>
          </BrowserRouter>


          <Footer/>
      </div>

    </div>
  );
}

export default App;
