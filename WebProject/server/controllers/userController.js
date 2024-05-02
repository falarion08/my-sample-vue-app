const fs = require('fs');
const UPLOAD_FOLDER = process.cwd() + '\\uploads\\';
const activityController = require('./activityController');

function getAll(){
    const data = fs.readFileSync('data.json');
    const db_json = JSON.parse(data);

    if ("users" in db_json == false)
        db_json['users'] = []; 

    return db_json;
}

function save(jsonData){
    jsonString = JSON.stringify(jsonData);
    fs.writeFileSync('data.json',jsonString, 'utf-8');
}

function add(user){
    const db_json =  getAll();

    const existing_user = db_json['users'].filter((u)=>
        u.username === user.username);

    if(existing_user.length == 0){
        user = {'id':db_json['users'].length > 0 ? db_json['users'][db_json['users'].length-1].id + 1 : 0 ,
            ...user}
        
            db_json['users'].push(user);
        
        save(db_json);

    } 
    else
        throw new Error('Username already exists in the database'); 
}

function getByUsername(username){
    const db_json = getAll();
    const users = db_json.users;

    const user = users.filter((user)=>user.username === username);

    if (user.length > 0)
        return user[0];
    else
        return null;
}

function getAllUsers(){
    const db_json = getAll();
    return db_json['users'];
}

function updateUserByID(userID,data){
    db_json= getAll();
    users = db_json['users'];
    userFound = false; 
    
    for(i = 0; i < users.length && !userFound; ++i){
        if(users[i].id == userID)
        {
            userFound = true; 
            db_json['users'][i] = data
        }
    }

    save(db_json);
}

function deleteUserByID(userID){
    const db_json =getAll()
    let currentUsers = getAllUsers();
    const updatedUsers = currentUsers.filter((user)=>{
        if(user.id == userID)
           {
            try{
                fs.unlink(UPLOAD_FOLDER + user.profile_pic, (err)=>{
                    if(err){
                        throw err;
                    }
                });
            } catch(e){
                console.log(e);
            }
           }
        return user.id != userID
    });
    db_json['users'] = updatedUsers; 
    save(db_json); 
    activityController.deleteAllUserActivitiesByID(userID);

}


module.exports = {
    add,getByUsername,getAllUsers,updateUserByID,deleteUserByID
}