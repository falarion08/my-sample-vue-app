const fs = require('fs');
const UPLOAD_FOLDER = process.cwd() + '\\uploads\\';

function getAll(){
    const data = fs.readFileSync('data.json');
    const db_json = JSON.parse(data);

    if ("activities" in db_json == false)
        db_json['activities'] = []; 

    return db_json;
}

function save(jsonData){
    jsonString = JSON.stringify(jsonData);
    fs.writeFileSync('data.json',jsonString, 'utf-8');
}

function addActivity(activity){
    const db_json =  getAll();


        const new_activity = {'id':db_json['activities'].length > 0 ? db_json['activities'][db_json['activities'].length-1].id + 1 : 0 ,
            ...activity}
        
            db_json['activities'].push(new_activity);
        
        save(db_json);
}

function getAllActivites(){
    const db_json = getAll();

    return db_json['activities'];
}

function deleteActivityByID(activityID){
    const db_json = getAll();
    var im_url = ''; 

    db_json['activities'] = db_json['activities'].filter((activity,index) =>{ 
        if(activity.id == activityID)
            im_url = activity.filename
        return activity.id != activityID
    });
    try{
        fs.unlink(UPLOAD_FOLDER + im_url, (err)=>{
            if(err){
                throw err;
            }
        });
    } catch(e){
        console.log(e);
    }

    save(db_json);
}

function deleteAllUserActivitiesByID(userID){
    let db_json = getAll();
    let currentActivites = getAllActivites();

    let updatedActivities = currentActivites.filter((activity)=>{
        if(activity.ownerID == userID)
        {

            try{
                fs.unlinkSync(UPLOAD_FOLDER + activity.filename, (err)=>{
                    if(err){
                        throw err;
                    }
                });
            } catch(e){
                console.log(e);
            }
        }
        return activity.ownerID != userID
    });
    db_json['activities'] = updatedActivities;

    save(db_json);
}

module.exports = {
    addActivity,
    getAllActivites,
    deleteActivityByID,
    deleteAllUserActivitiesByID
}