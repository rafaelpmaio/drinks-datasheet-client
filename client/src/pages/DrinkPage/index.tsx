import styles from "./DrinkPage.module.scss";
import themeStyles from "styles/theme.module.scss";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { CollectionsContext } from "state/CollectionContext";
import DrinkDatasheetHeader from "pages/DrinkPage/DrinkDatasheetHeader";
import DrinkDatasheetIngredients from "pages/DrinkPage/DrinkDatasheetIngredients";
import DrinkDatasheetPreparation from "pages/DrinkPage/DrinkDatasheetPreparation";
import getFromList from "shared/utils/getFromList";
import { IDrink } from "shared/interfaces/IDrink";
import DrinkDatasheetDecoration from "./DrinkDatasheetDecoration";

export default function DrinkPage() {
  const { collectionsList } = useContext(CollectionsContext);

  const params = useParams();
  let collectionId = params.collectionId;
  let drinkId = params.drinkId;

  let collection = getFromList(collectionId, collectionsList);
  let drink: IDrink | undefined;

  if (collection) {
    drink = getFromList(drinkId, collection.drinksList);
  }

  if (!drink) {
    drink = collectionsList[0].drinksList[0];
  }

  return (
    <main className={styles.drink_page}>
      <section className={`${themeStyles.card} ${styles.drink_section} `}>
        <DrinkDatasheetHeader {...drink} />
        <DrinkDatasheetIngredients {...drink} />
        <DrinkDatasheetPreparation {...drink} />
        <DrinkDatasheetDecoration {...drink}/>
      </section>
    </main>
  );
}
