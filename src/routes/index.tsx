import { createBrowserRouter } from "react-router";

//Layouts
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";

//Pages
import ShoppingListsPage from "./ShoppingListsPage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import ItemsPage from "./ItemsPage";
import ErrorPage from "./ErrorPage";

//midlewares
import { loginAction } from "../router/actions/loginAction";

//Actions
import { registerAction } from "../router/actions/registerAction";
import { authMiddleware } from "../router/middleware/authMiddleware";
import { addItemAction } from "../router/actions/addItemAction";
import { deleteItemAction } from "../router/actions/deleteItemAction";

//Loaders
import { itemsLoader } from "../router/loaders/itemsLoader";

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
        errorElement: <ErrorPage />,
        Component: MainLayout,
        children: [
            { index: true, Component: ShoppingListsPage },
            { path: "items", Component: ItemsPage, action: addItemAction, loader: itemsLoader },
            {
                path: "delete-item",
                action: deleteItemAction,
            },
        ],
    },
]);

export default router;
