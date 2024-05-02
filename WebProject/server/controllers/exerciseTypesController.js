const activityController = require('./activityController');

function getStatistics(ownerID){
    const activities = activityController.getAllActivites()
    let caloriesBurned = 0, duration = 0;

    activities.forEach((activity)=>{
        if(ownerID == activity.ownerID){
            caloriesBurned += parseInt(activity.caloriesBurned);
            duration += parseFloat(activity.duration);
        }

    });

    return {'caloriesBurned':caloriesBurned, 'duration':duration};
}

module.exports = {
    getStatistics
}