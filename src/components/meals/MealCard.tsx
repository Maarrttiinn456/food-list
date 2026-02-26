import { Card } from "@mui/material";
import type { MelasWithItemsLoader } from "../../router/loaders/mealsLoader";
import MealCardHeader from "./MealCardHeader";
import MealsCardContent from "./MealCardContent";

type MealCardProps = {
    meal: MelasWithItemsLoader["mealsWithItems"][number];
};

const MealCard = ({ meal }: MealCardProps) => {
    return (
        <Card
            key={meal.id}
            elevation={0}
            sx={{
                borderRadius: "20px",
                border: "none",
                background: "#fff",
                overflow: "hidden",
                position: "relative",
            }}
        >
            <MealCardHeader meal={meal} />
            <MealsCardContent meal={meal} />
        </Card>
    );
};

export default MealCard;
