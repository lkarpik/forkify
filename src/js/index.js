import Search from './models/Search';
import * as searchView from './views/searchView';
import {
    elements
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
        state.search = new Search(query, 20);

        // Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        // Search for recipes
        await state.search.getResults();

        // Render results on UI

        searchView.renderResults(state.search.results);

    }

    console.log(state.search.results);
}


elements.searchButton.addEventListener('click', e => {
    e.preventDefault();
    let q = searchView.getInput();
    controlSearch(q);
});


const newDish = new Search(`potato`, 3);