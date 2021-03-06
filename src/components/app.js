import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { observer } from "mobx-react";
import Ask from "./ask";
import Wall from "./wall";
import AnswerWall from "./answer-wall";
import store from "../store";
import WithPassword from "./with-password";
import Nav from "./nav";
import PageTransition from "./page-transition";

// create-react-app uses package.json's homepage field to configure the path for assets, so use the
// same URL to figure out the basename for the router
const isDev = process.env.NODE_ENV === "development";
let basename = "";
if (!isDev) {
  const publicUrl = process.env.PUBLIC_URL;
  const parts = publicUrl.replace(/https?:\/\//, "").split("/");
  basename = parts.slice(1).join("/");
}

@observer
export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter basename={basename}>
        <div>
          <Nav />
          <Route
            render={({ location }) => (
              <PageTransition pageKey={location.pathname}>
                <Switch location={location}>
                  <Route path="/ask" render={() => <Ask store={store} />} />
                  <Route
                    path="/answer"
                    render={() => (
                      <WithPassword>
                        <AnswerWall store={store} />
                      </WithPassword>
                    )}
                  />
                  <Route path="/wall" render={() => <Wall store={store} />} />
                  <Redirect to="/ask" />
                </Switch>
              </PageTransition>
            )}
          />
        </div>
      </BrowserRouter>
    );
  }
}
