import http from "./http-common"


class UploadFilesService {
    upload(userkey,username,file, onUploadProgress) {
      let formData = new FormData();
      
      formData.append("file", file);
      formData.append("user", username );
      formData.append("userkey", userkey );
    

      return http.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress,
        username
      });
    }
  
    getFiles(username) {
     
      return http.get("/files?user="+username)
    }

    delete(username){
      return http.delete("/delete?user="+username)
      ,username
    }
  }
  
  export default new UploadFilesService();
