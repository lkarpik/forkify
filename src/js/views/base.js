export const elements = {
    searchInput: document.querySelector('.search__field'),
    searchButton: document.querySelector('.search .btn'),
    searchResultList: document.querySelector('.results__list'),
    searchResults: document.querySelector('.results'),
    searchResultPages: document.querySelector('.results__pages'),
    recipe: document.querySelector('.recipe'),
    shoppingList: document.querySelector('.shopping__list'),
    likesMenu: document.querySelector('.likes__field'),
    likesList: document.querySelector('.likes__list')

};

export const elementsStrings = {
    loader: 'loader'
}

export const renderLoader = parrent => {
    const loader = `
        <div class="${elementsStrings.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"</use>
            </svg>
        </div>
    `;
    parrent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = parrent => {

    const loader = parrent.querySelector(`.${elementsStrings.loader}`);
    if (loader) {
        loader.remove();
    }
};