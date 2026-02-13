import { createBrowserRouter } from "react-router";

//Layouts
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";

//Pages
import ShoppingListsPage from "./ShoppingListsPage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";

//midlewares
import { loginAction } from "../router/actions/loginAction";

//Actions
import { registerAction } from "../router/actions/registerAction";
import { authMiddleware } from "../router/middleware/authMiddleware";
import ItemsPage from "./ItemsPage";

//Loaders

const router = createBrowserRouter([
    {
        path: "/auth",
        Component: AuthLayout,
        children: [
            { index: true, Component: LoginPage, action: loginAction },
            { path: "register", Component: RegisterPage, action: registerAction },
        ],
    },
    {
        path: "/",
        middleware: [authMiddleware],
        Component: MainLayout,
        children: [
            { index: true, Component: ShoppingListsPage },
            { path: "items", Component: ItemsPage },
        ],
    },
]);

export default router;
