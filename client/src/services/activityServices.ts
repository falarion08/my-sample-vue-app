const API_ROOT = "http://localhost:3000";
 
 
export async function createActivityAPI(data:any){
    /*
        Content-Type left blank as it will prevent an error in multer. The browser will automaitcally assign the content-type
    
        source: https://stackoverflow.com/questions/35192841/how-do-i-post-with-multipart-form-data-using-fetch

    */
    let response =  await fetch(`${API_ROOT}/Activity`,{
        method:"POST",
        headers:{
            "Accept":'image/*',
        },
        body:data,
    })

    return response.json();
}

export async function getActivitiesAPI(){
    /*
        Content-Type left blank as it will prevent an error in multer. The browser will automaitcally assign the content-type
    
        source: https://stackoverflow.com/questions/35192841/how-do-i-post-with-multipart-form-data-using-fetch

    */
    let response =  await fetch(`${API_ROOT}/Activity`)

    return response.json();
}

export async function deleteActivityAPI(postID:number){
    let response = await fetch(`${API_ROOT}/activity/delete/${postID}`,{
        method:"POST",
        headers:{
            'Content-Type': 'application/json'
        }
    })

    return response.json();
}
