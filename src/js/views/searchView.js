import {
    elements
} from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = '';
};

export const clearResults = () => {
    elements.searchResultList.innerHTML = '';
}

const limitTitle = (title, limit = 17) => {

    if (title.length > limit) {
        let newTitle = title.slice(0, limit);
        newTitle = newTitle.slice(0, newTitle.lastIndexOf(` `));
        return newTitle + ' ...';
    }

    return title;
}

const renderRecipe = recipe => {
    const markup = `
    <li>
        <a class="results__link results__link--active" href="#${recipe.id}">
            <figure class="results__fig">
                <img src="https://spoonacular.com/recipeImages/${recipe.image}" alt="${recipe.title}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitTitle(recipe.title)}</h4>
                <p class="results__author">Ready in ${recipe.readyInMinutes} minutes</p>
            </div>
        </a>
    </li>
    `
    elements.searchResultList.insertAdjacentHTML('beforeend', markup);
}

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    const start = (page - 1) * resPerPage;
    const end = resPerPage * page - 1;

    recipes.forEach(renderRecipe);
}