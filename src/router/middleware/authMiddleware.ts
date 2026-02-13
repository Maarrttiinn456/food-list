import { redirect } from "react-router";
import type { User } from "@supabase/supabase-js";
import { supabase } from "../../supabase/client";
import { userContext } from "../context/authContext";

type AuthMiddlewareContext = {
    set: (key: typeof userContext, value: User | null) => void;
};

export async function authMiddleware({ context }: { context: AuthMiddlewareContext }) {
    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
        throw redirect("/auth");
    }

    context.set(userContext, session.user);

    return null;
}

/*
React router context buud používat v loaderech kdy se po overeni jestli je nebo neni uzvatel proihlaseny spusti fetch dat

export async function loader({ context }) {
  // Tady už víš, že user existuje, protože authMiddleware proběhl jako první
  const user = context.get(userContext); 

  // Můžeš rovnou tahat data z DB pro konkrétního uživatele
  const { data: lists } = await supabase
    .from('shopping_lists')
    .select('*')
    .eq('user_id', user.id);

  return { lists };
}

*/
