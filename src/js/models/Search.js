import axios from 'axios';
import {
    APIKey
} from '../config';

export default class Search {

    constructor(query, number = 1) {

        this.query = query;
        this.number = number;
    }

    async getResults() {

        try {

            const result = await axios.get(`https://api.spoonacular.com/recipes/search?apiKey=${APIKey}&query=${this.query}&number=${this.number}`);

            // let data = await fetch(`https://api.spoonacular.com/recipes/215435/information/?apiKey=${APIKey}`);

            this.results = result.data.results;

        } catch (error) {
            console.log(error);
        }
    }
};