import axios from "axios";

//separate the api service as we can use api request interceptors
//in the future
export async function get(params={}, url) {
    let response={};
    try {
        response = await axios.get(url, params);
    } catch(e) {
        //fallback
        return response;
    }
    return response;
}
