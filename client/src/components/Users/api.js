import axios from "axios";

const getUsers = (params) => {
    return axios({
      method: "post",
      url: "/user/get",
      headers: {
        "Content-Type": "application/json",
      },
      data:params
    });
  };

  const addUser = (params) => {
    return axios({
      method: "post",
      url: "/user/add",
      headers: {
        "Content-Type": "application/json",
      },
      data:params
    });
  };
  const updateUser = (params) => {
    return axios({
      method: "put",
      url: "/user/update",
      headers: {
        "Content-Type": "application/json",
      },
      data:params
    });
  };
  const deleteUser = (id) => {
    return axios({
      method: "delete",
      url: "/user/delete/"+id,
      headers: {
        "Content-Type": "application/json",
      }
    });
  };
  const imageUpload = (params)=>{
    return axios({
      method:"post",
      url:"https://api.cloudinary.com/v1_1/dkksm7fzn/image/upload",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data:params
    })
  }

export default {
    getUsers:getUsers,
    addUser:addUser,
    updateUser:updateUser,
    deleteUser:deleteUser,
    imageUpload:imageUpload
}