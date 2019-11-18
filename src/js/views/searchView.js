import {
    elements
} from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = '';
};

export const clearResults = () => {
    elements.searchResultList.innerHTML = '';
    elements.searchResultPages.innerHTML = '';
};

export const clearButtons = () => {
    elements.searchResults.querySelectorAll('button').forEach(el => {
        el.remove();
    });
};

const limitTitle = (title, limit = 17) => {

    if (title.length > limit) {
        let newTitle = title.slice(0, limit);
        newTitle = newTitle.slice(0, newTitle.lastIndexOf(` `));
        return newTitle + ' ...';
    }

    return title;
};

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
};

const renderButtons = (page, numResults, resPerPage) => {

    const createButton = (page, type) => `
        <button class="btn-inline results__btn--${type}" data-goto="${type === 'prev' ? page - 1 : page + 1}">
            <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
            </svg>
        </button>
        `;
    const pages = Math.ceil(numResults / resPerPage);

    let button;

    if (page === 1 && pages > 1) {
        // Button for next page
        button = createButton(page, 'next');
    } else if (page < pages && page > 1) {
        // Both buttons
        button = `${createButton(page, 'prev')}${createButton(page, 'next')}`;

    } else if (page === pages && pages > 1) {
        // Button for prev page
        button = createButton(page, 'prev');
    }

    if (button) {
        elements.searchResultPages.insertAdjacentHTML('beforeend', button);
    }

};

export const renderResults = (recipes, page = 1, resPerPage = 10) => {

    const start = (page - 1) * resPerPage;
    const end = resPerPage * page;

    recipes.slice(start, end).forEach(renderRecipe);

    renderButtons(page, recipes.length, resPerPage);

};