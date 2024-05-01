import { Request, Response } from "express";
import TextLoader from "./textloader";

export const inMemoryChat = async (req: Request, res: Response) => {
  const question = req.query.question as string;
  const filePath = "files/romeo&juliet.docx";

  const result = await TextLoader(question, filePath);

  res.status(200).json({
    question,
    answer: result,
  });
};
