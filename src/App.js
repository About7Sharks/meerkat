import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import About from "./about/About";
import Tools from "./tools/Tools";
import Downloads from "./Downloads";
import SystemInfo from "./tools/sysInfo";
import NetworkInfo from "./tools/NetworkInfo";
const renderLoader = () => <p>Loading ...</p>;
//register listener for online offline

const updateOnlineStatus = () => {
  window.ipcRenderer.send(
    "online-status-changed",
    navigator.onLine ? "online" : "offline"
  );
};
window.addEventListener("online", updateOnlineStatus);
window.addEventListener("offline", updateOnlineStatus);
function App() {
  return (
    <div className="App">
      <Suspense fallback={renderLoader()}>
        <Router>
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route path="/Tools" component={Tools} />
            <Route path="/Downloads" component={Downloads} />
            <Route exact path="/About" component={About} />
            <Route path={`/SystemInfo`} component={SystemInfo} />
            <Route path={`/NetworkInfo`} component={NetworkInfo} />
          </Switch>
        </Router>
      </Suspense>
    </div>
  );
}

export default App;
