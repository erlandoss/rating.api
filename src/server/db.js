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
    const item1 = createItem("bulbasaur", 4.7);
    const item2 = createItem("ivysayr", 4);
    const item3 = createItem("venusaur", 3);
    const item4 = createItem("charmander", 4.6);
    const item5 = createItem("charmeleon", 2.1);
    const item6 = createItem("charizard", 5);
    const item7 = createItem("squirtle", 2);
    const item8 = createItem("wartortle", 3);
    const item9 = createItem("blastoise", 4);
    const item10 = createItem("caterpie", 1);
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

function getItemsList(top){

    let itemArray = [];

    for (let i = 0; i < top; i++) {
        itemArray.push(items[i]);
    }
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

function createItem(id, rating) {

    if(getItem(id) !== undefined) {
        return false;
    }

    const item = {
        id: id,
        ratings: [],
        avgRating: rating
    }

    items.push(item);
}

function createUser(id, password){

    if(getUser(id) !== undefined ){
        return false;
    }

    const user = {
        id: id,
        ratingCount: null,
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

module.exports = {addTestUsers: addTestData, getUser, verifyUser, createUser, getItem, getItemsList};
