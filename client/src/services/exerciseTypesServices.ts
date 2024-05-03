const API_ROOT = "http://localhost:3000";

export async function computeStats(userID: number){
    let response = await fetch(`${API_ROOT}/statistics/${userID}`,
    {
        method:"POST"
    }
    );
    return response.json();
}