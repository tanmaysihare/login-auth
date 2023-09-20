import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "../meals/MealItem/MealItem";

import "bootstrap/dist/css/bootstrap.min.css";

const DUMMY_MEALS = [
  {
    id: "m1",
    name: "Colors",
    description: "https://prasadyash2411.github.io/ecom-website/img/Album%201.png",
    price: 100,
  },
  {
    id: "m2",
    name: "Black and white Colors",
    description: "https://prasadyash2411.github.io/ecom-website/img/Album%202.png",
    price: 200,
  },
  {
    id: "m3",
    name: "Yellow and Black Colors",
    description: "https://prasadyash2411.github.io/ecom-website/img/Album%203.png",
    price: 100,
  },
  {
    id: "m4",
    name: "Blue Color",
    description: "https://prasadyash2411.github.io/ecom-website/img/Album%204.png",
    price: 120,
  },
];

const AvailableMeals = () => {
  const mealsList = DUMMY_MEALS.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
      
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};
export default AvailableMeals;
