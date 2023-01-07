import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { Loading } from "./components/Loading";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
} from "@apollo/client";

import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";
const App = React.lazy(() => import('./App'));

const httpLink = createUploadLink({
    uri: process.env.REACT_APP_BACKEND_URL,
});

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem("token");
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        },
    };
});

const client = new ApolloClient({
    connectToDevTools: true,
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <ApolloProvider client={client}>
                <Suspense fallback={<Loading />}>
                    <App />
                </Suspense>
            </ApolloProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);

reportWebVitals();
