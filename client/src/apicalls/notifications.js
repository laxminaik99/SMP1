import { axiosInstance } from "./axiosInstance";

//add a notification
export const AddNotification = async (data) =>{
    try {
        const response = await axiosInstance.post("/api/notifications/notify",data);
        return response.data;
    } catch (error) {
       return error.response.message ;
    }
};
//get all notifications by user
export const GetAllNotifications = async () =>{
    try {
        const response = await axiosInstance.get("/api/notifications/get-all-notifications");
        return response.data;
    } catch (error) {
       return error.response.message ;
    }
};

//delete notification
export const DeleteNotification = async (id) =>{
    try {
        const response = await axiosInstance.delete(`/api/notifications/delete-notifications/${id}`);
        return response.data;
    } catch (error) {
       return error.response.message ;
    }
};

//read all natifications
export const ReadAllNotifications = async () =>{
    try {
        const response = await axiosInstance.put("/api/notifications/read-all-notifications");
        return response.data;
    } catch (error) {
       return error.response.message ;
    }
};