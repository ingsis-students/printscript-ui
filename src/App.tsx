import './App.css';
import {RouterProvider} from "react-router";
import {createBrowserRouter} from "react-router-dom";
import HomeScreen from "./screens/Home.tsx";
import {QueryClient, QueryClientProvider} from "react-query";
import RulesScreen from "./screens/Rules.tsx";
import {withAuthenticationRequired} from "@auth0/auth0-react";
import AuthCallback from "./components/auth/AuthCallback.tsx";
import {TokenProvider} from "./contexts/TokenProvider.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeScreen/>
    },
    {
        path: '/rules',
        element: <RulesScreen/>
    },
    {
        path: "/callback",
        element: <AuthCallback/>
    }
]);

export const queryClient = new QueryClient()
const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <TokenProvider>
                <RouterProvider router={router}/>
            </TokenProvider>
        </QueryClientProvider>
    );
}

// To enable Auth0 integration change the following line
// export default App;
// for this one:
export default withAuthenticationRequired(App);

