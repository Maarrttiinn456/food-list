import ItemSearchAndAdd from "../components/items/ItemSearchAndAdd";
import ItemsList from "../components/items/ItemsList";

const ItemsPage = () => {
    //Text filed na zapasání nové položky
    //Když budu do text inputu psát tak se mu musí zárove%n podtím filtrovat položky dle toho ci píšu
    //V jakémkoliv okamzáku budu moc klinkout n a + a přidat položku
    //po přidání se mi vynuluje input a mohu přidávat znova
    //Dialog komponnta na odtranění a nebo potvrzení

    //Page
    //Bude zde searech inptu který bude zároveň inputem pro přidání itemu

    //List
    //tady budu potřebovat data z databíze o všech items a mapem je vypsat
    //Bude zde probíhat filtrace dle search inputu

    //Item
    //Prost= zobrazení itemu

    return (
        <>
            <ItemSearchAndAdd />
            <ItemsList />
        </>
    );
};

export default ItemsPage;
