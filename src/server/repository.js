
/*
    Here we "simulate" a database with in-memory Map.
    Furthermore, we do not deal with the "proper" handling of
    passwords. Passwords should NEVER be saved in plain text,
    but rather hashed with secure algorithms like BCrypt.
 */

const users = new Map();
const messages = [];
let items = [];
const messageCounter = null;

//FUNCTION ORIGINAL CODE
function addTestData () {
    const user1 = createUser("jon", "123");
    const user2 = createUser("jane", "123" );
    users.set(user1.id, user1);
    users.set(user2.id, user2);
    const item1 = createItem("charmander", 5);
    const item2 = createItem("bulbasaur", 4);
    items.push(item1);
    items.push(item2);
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

function getItemsList(){
    items.sort(compare);
    let itemArray = [];

    for (let i = 0; i < 5; i++) {
        itemArray.push(items[i])
    }
    return itemArray;
}

function compare(a, b) {
    const ratingA = a.avgRating;
    const ratingB = b.avgRating;

    let comparison = 0;
    if (ratingA > ratingB) {
        comparison = 1;
    } else if (ratingA < ratingB) {
        comparison = -1;
    }
    return comparison * -1;
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
    return true;
}

function setAvgRating(id) {
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

function createRating(userId, itemId, rating){

}

module.exports = {addTestUsers: addTestData, getUser, verifyUser, createUser, getItem, getItemsList, createItem};
