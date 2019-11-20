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
            this.ingredients = res.data.extendedIngredients;
            this.readyInMinutes = res.data.readyInMinutes;
            this.servings = res.data.servings;


        } catch (error) {
            console.log(error);
        }
    }

    getIngredients() {
        const newIngredients = this.ingredients.map(el => {

            return {
                count: el.measures.metric.amount % 1 === 0 ? el.measures.metric.amount : el.measures.metric.amount.toFixed(2),
                unit: el.measures.metric.unitShort || '',
                ingredient: el.name
            };
        });
        this.ingredients = newIngredients;
    }
};