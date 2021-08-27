import React, { useState, useEffect } from 'react';
import { shape, string } from 'prop-types';
import { fetchFoodById } from '../../services/fetchApi';

function DetailsFood({ match: { params: { id } } }) {
  const [food, setFood] = useState({});
  const [isMount, setIsMount] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchFood = () => {
    const getFood = async () => {
      const foodData = await fetchFoodById(id);
      setFood(foodData);
      // console.log(foodData);
      setIsMount(true);
      setIsLoading(false);
    };
    if (!isMount) getFood();
  };

  useEffect(fetchFood);

  if (isLoading) return <div>Carregando...</div>;

  const keysFoods = Object.keys(food);
  const keysIngredients = keysFoods.filter((key) => (
    key.includes('strIngredient') && !!food[key]));

  // const testId = 52951; ID = testado

  const allow = `accelerometer; autoplay; clipboard-write; 
  encrypted-media; gyroscope; picture-in-picture`;
  const videoRegex = food.strYoutube.replace(/watch\?v=/, 'embed/');
  // console.log(videoRegex);

  return (
    <div>
      <img
        src={ food.strMealThumb }
        alt="recipe"
        data-testid="recipe-photo"
        width="150"
        height="150"
      />
      <h1 data-testid="recipe-title">{food.strMeal}</h1>
      <p data-testid="recipe-category">{food.strCategory}</p>
      <button type="button" data-testid="share-btn">Compartilhar</button>
      <button type="button" data-testid="favorite-btn">Favoritar</button>
      <ul>
        {keysIngredients.map((key, index) => (
          <li
            key={ key }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {food[key]}
          </li>
        ))}
      </ul>
      <p data-testid="instructions">{food.strInstructions}</p>
      <section>
        <iframe
          width="560"
          height="315"
          src={ videoRegex }
          title="YouTube video player"
          frameBorder="0"
          allow={ allow }
          allowFullScreen
          data-testid="video"
        />
      </section>
      {/* <div data-testid={ `${index}-recomendation-card` }>
        receitas recomendadas
      </div> */}
      <button type="button" data-testid="start-recipe-btn">Iniciar receita</button>
    </div>
  );
}

DetailsFood.propTypes = {
  match: shape({ params: shape({ id: string }) }).isRequired,
};

export default DetailsFood;
