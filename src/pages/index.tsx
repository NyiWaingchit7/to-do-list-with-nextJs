import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import List from "./component/List";
import { ToDoList } from "@prisma/client";
import { config } from "../utils/config";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [description, setDescription] = useState<string>("");
  const [serverdata, setServerdata] = useState<ToDoList[]>([]);

  const handleCreateList = async () => {
    const response = await fetch(`${config.apiBaseUrl}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ description }),
    });
    const { data } = await response.json();
    setDescription("");
    fetchData();
  };
  const fetchData = async () => {
    const response = await fetch(`${config.apiBaseUrl}`);

    const { data } = await response.json();

    setServerdata(data);
    console.log(data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="">
      <div className=" h-56 flex justify-center items-center">
        <input
          type="text"
          className=" form-control w-72 border-2 p-2 rounded-lg "
          placeholder="Create your to do list ...."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleCreateList}
          disabled={!description}
        >
          Add
        </button>
      </div>

      <List data={serverdata} fetchData={fetchData} />
    </div>
  );
}
