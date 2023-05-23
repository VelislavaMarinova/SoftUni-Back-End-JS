const fs = require('fs/promises');
const db = require('./db.json');
const bcrypt = require('bcrypt');

async function saveDb() {
    console.log(db);
    const data = JSON.stringify(db, null, 2)
    console.log(data);
    await fs.writeFile('./db.json', data);
}

exports.registerUser = async (username, password) => {
    console.log(db.users);
    if (db.users.some(x => x.username === username)) {
        throw 'User alredy exists!';
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    db.users.push({
        username,
        password: hash
    });

    await saveDb()
};

exports.loginUser = async (username, password) => {
    
    const user = db.users.find(x => x.username === username);

    if (!user) {
        throw 'Wrong user or password';
    }

    isAutenticated = await bcrypt.compare(password, user.password);

    if(!isAutenticated){
        throw 'Wrong user or password';

    }

    return user;

};
