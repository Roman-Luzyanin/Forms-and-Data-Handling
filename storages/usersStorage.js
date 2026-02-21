class UsersStorage {
    constructor() {
        this.storage = {};
        this.id = 0;
    }

    addUser({ firstName, lastName, age, email, bio }) {
        const id = this.id;
        this.storage[id] = {id, firstName, lastName, age, email, bio };
        this.id++;
    }

    getUsers() {
        return Object.values(this.storage);
    }

    getUser(id) {
        return this.storage[id];
    }

    updateUser(id, { firstName, lastName, age, email, bio }) {
        this.storage[id] = { id, firstName, lastName, age, email, bio };
    }

    deleteUser(id) {
        delete this.storage[id];
    }

    searchUser({ name, email }) {
        if (!name && !email) return [];
        if (name) name = name.split(' ').filter(i => i).join(' ').toLowerCase();
        return Object.values(this.storage).filter(user => 
            (!name || (user.firstName + ' ' + user.lastName).toLocaleLowerCase() === name) &&
            (!email || user.email.toLowerCase() === email.toLowerCase().trim())
        )
    }

    // searchUser({ firstName, email }) {
    //     if (!firstName && !email) return [];

    //     return Object.values(this.storage).filter(user => {
    //         if (firstName) {
    //             if (user.firstName.toLowerCase() !== firstName.toLowerCase().trim()) {
    //                 return false;
    //             }
    //         }

    //         if (email) {
    //             if (user.email.toLowerCase() !== email.toLowerCase().trim()) {
    //                 return false;
    //             }
    //         }

    //         return true;
    //     }) 
    // }
}

module.exports = new UsersStorage();

