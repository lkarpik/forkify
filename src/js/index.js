import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import {
    elements,
    renderLoader,
    clearLoader
} from './views/base';

/** Global state of app
 * - Search object
 * - Current recipe object
 * - Liked recipes 
 */
const state = {};


/**
 * Search controller
 * @param {string} query 
 */
const controlSearch = async (query) => {

    if (query) {
        // New search object added to state
        state.search = new Search(query, 30);

        // Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        searchView.clearButtons();

        renderLoader(elements.searchResults);
        // Search for recipes
        try {
            await state.search.getResults();
            // Render results on UI
            searchView.renderResults(state.search.results);
            clearLoader(elements.searchResults);

        } catch (error) {
            console.log(error);
            clearLoader(elements.searchResults);
        }
    }
};


elements.searchButton.addEventListener('click', e => {
    e.preventDefault();
    let q = searchView.getInput();
    controlSearch(q);
});
// TEST
window.addEventListener('load', e => {
    e.preventDefault();
    let q = `honey`;
    controlSearch(q);
});

elements.searchResultPages.addEventListener('click', e => {

    const btn = e.target.closest('.btn-inline', );
    if (btn) {

        const page = parseInt(btn.dataset.goto);

        searchView.clearInput();
        searchView.clearResults();
        searchView.clearButtons();
        renderLoader(elements.searchResults);
        searchView.renderResults(state.search.results, page);
        clearLoader(elements.searchResults);
    }
});

/**
 * Recipe controller
 * 
 */
const controllRecipe = async (e) => {

    // const id = e.newURL.split('/#')[1];
    const id = window.location.hash.replace('#', '');
    if (id) {

        // Prepare UI

        // Create new Recipe
        state.recipe = new Recipe(id);

        try {
            await state.recipe.getRecipe();
            // Render recipe
            console.log(state.recipe);
            // TESTING
            window.state = state;

        } catch (error) {
            console.log(error);
        }
        // Get data
    }
}

// window.addEventListener('hashchange', controllRecipe);
// window.addEventListener('load', controllRecipe);

['hashchange', 'load'].forEach(e => window.addEventListener(e, controllRecipe));