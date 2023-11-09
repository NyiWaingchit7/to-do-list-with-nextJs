import { ToDoList } from "@prisma/client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { config } from "../../utils/config";
interface prop {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
  data: ToDoList[];
  fetchData: () => Promise<void>;
}
export default function UpdatList({
  showModal,
  setShowModal,
  id,
  data,
  fetchData,
}: prop) {
  const [updateDescription, setDescription] = useState<string | undefined>();
  const fetchOneData = async () => {
    const response = await fetch(`${config.apiBaseUrl}?id=${id}`);

    const { data } = await response.json();
    console.log(data);

    setDescription(data?.description);
  };

  const handleUpdate = async () => {
    console.log("success click");

    const response = await fetch(`${config.apiBaseUrl}?id=${id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ description: updateDescription }),
    });
    fetchData();
  };

  useEffect(() => {
    fetchOneData();
  }, [id]);

  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-lg">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-xl font-semibold">
                    Update List Description
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <input
                    type="text"
                    className=" form-control w-72 border-2 p-2 rounded-lg "
                    placeholder="Update your to do list ...."
                    value={updateDescription}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                    }}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      handleUpdate();
                      setShowModal(false);
                    }}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
