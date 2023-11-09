// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../utils/db";
import { Meera_Inimai } from "next/font/google";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "GET") {
    const id = Number(req.query.id);

    if (id) {
      console.log(id);

      const data = await prisma.toDoList.findFirst({ where: { id } });
      return res.status(200).json({ data });
    } else {
      const data = await prisma.toDoList.findMany({ orderBy: { id: "asc" } });
      return res.status(200).json({ data });
    }
  } else if (method === "POST") {
    const { description } = req.body;
    if (!description) return res.status(405).send("bad request");
    const data = await prisma.toDoList.create({ data: { description } });
    return res.status(200).json({ data });
  } else if (method === "PUT") {
    const { description } = req.body;
    const id = Number(req.query.id);
    if (!description) return res.status(405).send("bad request");
    const exist = await prisma.toDoList.findFirst({ where: { id } });
    if (!exist) return res.status(405).send("this stuff could not be found");
    const data = await prisma.toDoList.update({
      data: { description },
      where: { id },
    });
    return res.status(200).json({ data });
  } else if (method === "DELETE") {
    const id = Number(req.query.id);

    const exist = await prisma.toDoList.findFirst({ where: { id } });
    if (!exist) return res.status(405).send("this stuff could not be found");
    await prisma.toDoList.delete({ where: { id } });
    return res.status(200).send("Deleted successfully");
  }
  res.send("bad method");
}
