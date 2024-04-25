import "./App.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";

const router = createBrowserRouter([
    {
        path: "/",
        element: <div>Home</div>,
    },
]);

function App() {
    return (
        <div className="app">
            <Navbar />
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
