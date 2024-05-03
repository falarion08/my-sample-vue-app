const API_ROOT = "https://my-vue-demo.onrender.com";

export async function computeStats(userID: number){
    let response = await fetch(`${API_ROOT}/statistics/${userID}`,
    {
        method:"POST"
    }
    );
    return response.json();
}