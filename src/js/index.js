import axios from 'axios';

import Search from './models/Search';


/** Global state of app
 * - Search object
 * - Current recipe object
 * - Liked recipes 
 */
const state = {};

const controlSearch = async () => {
    // Get query from view
    const query = `bean`;

    if (query) {
        // New search object added to state
        state.search = new Search(query, 20);

        // Prepare UI for results

        // Search for recipes
        await state.search.getResults();

        // Render results on UI

    }

    console.log(state);
}


document.querySelector('.search').addEventListener('click', e => {
    e.preventDefault();
    controlSearch();
});


const newDish = new Search(`potato`, 3);