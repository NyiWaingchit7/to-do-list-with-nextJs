import { ToDoList } from "@prisma/client";
import router from "next/router";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import UpdatList from "./UpdateList";
import { config } from "../../utils/config";
interface prop {
  data: ToDoList[];
  fetchData: () => Promise<void>;
}

const List = ({ data, fetchData }: prop) => {
  const [done, setDone] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState<number>(0);

  const handleDelete = async (id: number) => {
    const response = await fetch(`${config.apiBaseUrl}?id=${id}`, {
      method: "DELETE",
    });
    fetchData();
  };

  return (
    <div className="">
      <h1 className=" text-2xl text-center">Your To Do List</h1>
      {data?.map((d, index) => {
        return (
          <div key={d.id} className=" my-9">
            <div className=" flex  justify-around my-5 ">
              <div
                style={{ textDecoration: `${done}` }}
                className="flex text-xl w-40"
              >
                <div>{index + 1}.</div> <div>{d.description}</div>
              </div>

              <button
                onClick={() => {
                  setId(d.id);
                  setShowModal(true);
                }}
                className="bg-blue-500 hover:bg-blue-700  text-white font-bold py-2 px-4 rounded"
              >
                Update
              </button>

              <button
                onClick={() => {
                  handleDelete(d.id);
                }}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded  "
              >
                Done
              </button>
            </div>
            <div
              style={{
                height: "1px",
                maxWidth: "1300px",
                backgroundColor: "black",
                margin: "0 auto",
              }}
            ></div>
          </div>
        );
      })}
      <div className="">
        <UpdatList
          showModal={showModal}
          setShowModal={setShowModal}
          id={id}
          data={data}
          fetchData={fetchData}
        />
      </div>
    </div>
  );
};

export default List;
