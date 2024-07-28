"use client"
import AdminSideBar from "@/components/AdminSideBar";
import React, { useEffect, useState } from "react";

const Page = () => {

  // const data = await getData()

  // if(!data){return null}

  // const {users} = data
  const [users, setUsers] = useState(null);

  useEffect(()=>{
    const getUsers = async ()=>{
        const result = await fetch('/api/user/getUsers');
        const res= await result.json();
        // console.log(res)
        if(res.success){
          setUsers(res.users)
        }

    }

    getUsers();

  }, [])

  return (
    <div className="flex">
      <AdminSideBar active={"users"} />
      <div className="w-full p-2 sm:p-6">
        <div>
          <h1 className="text-2xl font-bold">All Users</h1>
          <div className="my-2 space-y-4 text-sm font-semibold">

          <div className="flex font-bold gap-2 bg-[#fefefe] p-2">
            <p className="text-slate-400">sno</p>
            <div className="grid w-full grid-rows-4 gap-2 break-words text-left sm:grid-cols-4 sm:grid-rows-1">
              <p className="text-slate-400">Username</p>
              <p className="text-slate-400">Email</p>
              <p className="text-slate-400">Phone</p>
              <p className="text-slate-400">Address</p>
            </div>
          </div>

            {
              users?.map((u, i)=>{

                return (
                  <div key={i} className="hover:bg-slate-300 flex gap-2 rounded-lg bg-[#fefefe] p-2">
                    <p className="font-bold">{i+1}</p>
                    <div className="grid w-full grid-rows-4 gap-2 break-words text-left sm:grid-cols-4 sm:grid-rows-1">
                      <p>{u?.name}</p>
                      <p>{u?.email}</p>
                      <p>{u?.phone || "phone"}</p>
                      <p>{ u?.address ? `${u?.pincode} ${u?.address} ${u?.city} ${u?.state}` : "Pincode, Address, City, State"}</p>
                    </div>
                  </div>
                )

              })
            }

          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
