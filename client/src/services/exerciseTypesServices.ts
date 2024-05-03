const API_ROOT = "https://my-sample-vue-app.onrender.com";

export async function computeStats(userID: number){
    let response = await fetch(`${API_ROOT}/statistics/${userID}`,
    {
        method:"POST"
    }
    );
    return response.json();
}