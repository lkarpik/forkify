import Search from './models/Search';
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
        await state.search.getResults();

        // Render results on UI
        searchView.renderResults(state.search.results);
        clearLoader(elements.searchResults);

    }

    console.log(state.search.results);
};


elements.searchButton.addEventListener('click', e => {
    e.preventDefault();
    let q = searchView.getInput();
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


const newDish = new Search(`potato`, 3);