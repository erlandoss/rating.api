/*
    Here we "simulate" a database with in-memory Map.
    Furthermore, we do not deal with the "proper" handling of
    passwords. Passwords should NEVER be saved in plain text,
    but rather hashed with secure algorithms like BCrypt.
 */

//Mostly original code

const users = new Map();
let items = [];

function addTestData () {
    const user1 = createUser("jon", "123");
    const user2 = createUser("jane", "123" );
    users.set(user1.id, user1);
    users.set(user2.id, user2);
    const item1 = createItem("Bulbasaur", 4.7, "Grass");
    const item2 = createItem("Ivysaur", 3.9, "Grass");
    const item3 = createItem("Venusaur", 3, "Grass");
    const item4 = createItem("Charmander", 3.6, "Fire");
    const item5 = createItem("Charmeleon", 2.1, "Fire");
    const item6 = createItem("Charizard", 5, "Fire");
    const item7 = createItem("Squirtle", 2, "Water");
    const item8 = createItem("Wartortle", 3, "Water");
    const item9 = createItem("Blastoise", 4, "Water");
    const item10 = createItem("Caterpie", 1.3, "Bug");
    const item11 = createItem("Metapod", 2.4, "Bug");
    const item12 = createItem("Butterfree", 4.2, "Bug");
    items.push(item1);
    items.push(item2);
    items.push(item3);
    items.push(item4);
    items.push(item5);
    items.push(item6);
    items.push(item7);
    items.push(item8);
    items.push(item9);
    items.push(item10);
    items.push(item11);
    items.push(item12);
    items.sort((a, b) => (a.avgRating < b.avgRating) ? 1 : -1);
}

function getUser(id){
    return users.get(id);
}

function getItem(id){
    for (let i = 0; i < items.length; i++) {
        if (id === items[i].id) {
            return items[i];
        }
    }
}

function getItemsList(type){

    console.log(type);
    let counter = 0;
    let itemArray = [];

    for (let i = 0; i < items.length; i++) {
        if (type === "All"){
            itemArray.push(items[i]);
            console.log("alle");
            counter++;
        }
        if (type === items[i].type ) {
            itemArray.push(items[i]);
            console.log(type + " lagt til");
            counter++;
        }
        if (counter > 2) {break;}
    }
    console.log(itemArray);
    return itemArray;
}

function verifyUser(id, password){

    const user = getUser(id);

    if(user === undefined){
        return false;
    }
    /*
        WARNING: remember that those passwords should be hashed,
        with salt and pepper...
        But we are not dealing with backend details
        in this course, like secure storage of passwords
     */
    return user.password === password;
}

function createItem(id, rating, type) {

    if(getItem(id) !== undefined) {
        return false;
    }

    const item = {
        id: id,
        ratings: [],
        avgRating: rating,
        type: type
    };

    items.push(item);
}

function createUser(id, password){

    if(getUser(id) !== undefined ){
        return false;
    }

    const user = {
        id: id,
        ratingCount: 1,
        password: password
    };

    users.set(id, user);
    return true;
}

/*
 * Planned functionality for users to rate items
function createRating(userId, itemId, rating){
}
 */

module.exports = {addTestData, getUser, verifyUser, createUser, getItem, getItemsList};
