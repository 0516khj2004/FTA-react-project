import http from "./server-http"

class ServerStart{
    
    serviceStart(username, userport){
        return http.post("/run?user=" + username + "&userport=" + userport)
    }
    serverDown(username){
        return http.post("/delete?user=" + username)
    }
}

export default new ServerStart();