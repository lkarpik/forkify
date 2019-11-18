import axios from 'axios';
import {
    APIKey
} from '../config';

export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe() {

        try {

            const res = await axios(`https://api.spoonacular.com/recipes/${this.id}/information/?apiKey=${APIKey}`);

            console.log(res);
            this.title = res.data.title;
            this.author = res.data.sourceName;
            this.img = res.data.image;
            this.url = res.data.sourceUrl;
            this.ingrediens = res.data.extendedIngredients;
            this.readyInMinutes = res.data.readyInMinutes;
            this.servings = res.data.servings;


        } catch (error) {
            console.log(error);
        }
    }
};