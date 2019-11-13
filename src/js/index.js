const APIKey = `15ea0962498b45de85baff42fac0a281`;
console.log(`Started`);

const getData = async () => {
    try {
        // let data = await fetch(`https://api.spoonacular.com/recipes/search?apiKey=${APIKey}&query=cheese&number=2`);
        let data = await fetch(`https://api.spoonacular.com/recipes/215435/information/?apiKey=${APIKey}`);

        let json = await data.json();
        console.log(json);
    } catch (error) {
        console.log(error);
    }
};
getData();