import { useAuth } from "../hooks/useAuth";

const ShoppingListsPage = () => {
    const { logOut } = useAuth();

    return (
        <div onClick={() => logOut()}>
            <div>Odhlásit se</div>
        </div>
    );
};

export default ShoppingListsPage;
