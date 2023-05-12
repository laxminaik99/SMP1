import {  Table, message } from "antd";
import React, { useEffect } from "react";
//import ProductsForm from "./ProductsForm";
import { useDispatch } from "react-redux";
import {  UpdateProductStatus, UploadProductStatus } from "../../apicalls/products";
import moment from "moment";
import { SetLoader } from "../../redux/loadersSlice";
import { GetAllUser, UpdateUserStatus } from "../../apicalls/users";
//import { text } from "express";



function Users() {
  const [users ,setUsers ]= React.useState([]);
//   const [products, setProducts] = React.useState([]);
 
  const dispatch = useDispatch();

  
  const getData=async()=>{
    try {
      dispatch(SetLoader(true));
      const response=await GetAllUser(null);
      dispatch(SetLoader(false));
      if(response.success){
        setUsers(response.data);

      }
      
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };



  const onStatusUpdate=async(id,status)=>{
    try {
        dispatch(SetLoader(true));
        const response=await UpdateUserStatus(id,status);
        dispatch(SetLoader(false));
        if(response.success){
         message.success(response.message);
         getData();
        }else{
            throw new Error(response.message);
        }
        
      } catch (error) {
        dispatch(SetLoader(false));
        message.error(error.message);
      }

  }
 

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
        title: "Email",
        dataIndex: "email",
      },
      {
        title: "Role",
        dataIndex: "role",
        render : (text,record)=>{
            return record.role.toUpperCase();
          }
      },
      {
        title: "Created At",
        dataIndex: "created at",
        render : (text,record)=>
            moment(record.createdAt).format("DD-MM-YYYY hh:mm A"),
    
    },
    {
      title: "Status",
      dataIndex: "status",
      render : (text,record)=>{
        return record.status.toUpperCase();
      }
    },
    {
      title: "Action",
      dataIndex: "action",
      render:(text,record)=>{
        const { status,_id }=record;
        return (
        <div className="flex gap-3">
          {status==='active' && (<span className="underline cursor-pointer"
          onClick={()=>onStatusUpdate(_id,"blocked")}>
            Block</span>)}

            {status==='blocked' && (<span className="underline cursor-pointer"
          onClick={()=>onStatusUpdate(_id,"active")}>
            Unblock</span>)}

           

        </div>);
      },
    },
  ];
   

 
  useEffect(() => {
    getData();
  }, []);
  
  return (
    <div>
      
      <Table columns={columns} dataSource={users} />
      
      
    </div>
  );
}

export default Users;
