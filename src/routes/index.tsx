import { createBrowserRouter } from "react-router";

//Layouts
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";

//Pages
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import ItemsPage from "./ItemsPage";
import MealsPage from "./MealsPage";
import AddMealPage from "./AddMealPage";
import ErrorPage from "./ErrorPage";
import NotFoundPage from "./NotFoundPage";
import UpdateMealPage from "./UpdateMealPage";

//midlewares
import { loginAction } from "../router/actions/loginAction";

//Actions
import { registerAction } from "../router/actions/registerAction";
import { authMiddleware } from "../router/middleware/authMiddleware";
import { addItemAction } from "../router/actions/addItemAction";
import { deleteItemAction } from "../router/actions/deleteItemAction";
import { addMealAction } from "../router/actions/addMealAction";
import { deleteMealAction } from "../router/actions/deleteMealAction";

//Loaders
import { itemsLoader } from "../router/loaders/itemsLoader";
import { mealsAndCategoriesLoader } from "../router/loaders/mealsAndCategoriesLoader";
import { itemsAndCategoriesLoader } from "../router/loaders/itemsAndCatagories";
import { updateMealLoader } from "../router/loaders/updateMealLoader";

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
            {
                index: true,
                Component: MealsPage,
                loader: mealsAndCategoriesLoader,
            },
            {
                path: "items",
                Component: ItemsPage,
                action: addItemAction,
                loader: itemsLoader,
                children: [
                    {
                        path: "delete",
                        action: deleteItemAction,
                    },
                ],
            },
            {
                path: "meals",
                children: [
                    {
                        index: true,
                        Component: MealsPage,
                        loader: mealsAndCategoriesLoader,
                    },
                    {
                        path: "add",
                        Component: AddMealPage,
                        loader: itemsAndCategoriesLoader,
                        action: addMealAction,
                    },
                    {
                        path: "delete",
                        action: deleteMealAction,
                    },
                    {
                        path: "edit/:mealId",
                        Component: UpdateMealPage,
                        loader: updateMealLoader,
                        action: addMealAction,
                    },
                ],
            },
            { path: "*", Component: NotFoundPage },
        ],
    },
]);

export default router;
