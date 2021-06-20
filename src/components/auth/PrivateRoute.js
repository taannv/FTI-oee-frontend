import React from 'react';
import {Redirect, Route} from "react-router-dom";
import {PATH_LOGIN} from "../../constants";

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            authenticated ? (
                <Component {...rest} {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: PATH_LOGIN,
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
);

export default PrivateRoute