import axios from 'axios';

export default class Search {

    constructor(query, number = 1) {

        this.query = query;
        this.number = number;
    }

    async getResults() {

        const APIKey = `15ea0962498b45de85baff42fac0a281`;

        try {

            const result = await axios.get(`https://api.spoonacular.com/recipes/search?apiKey=${APIKey}&query=${this.query}&number=${this.number}`);

            // let data = await fetch(`https://api.spoonacular.com/recipes/215435/information/?apiKey=${APIKey}`);

            this.results = result.data.results;

        } catch (error) {
            console.log(error);
        }
    }
};