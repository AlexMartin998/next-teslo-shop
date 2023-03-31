import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';

import { db } from '@/api/db';

type HandlreData = { message: string };

// like middleware in nextjs: No hace el parce de la data xq no es text, sino images
export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<HandlreData>
) {
  switch (req.method) {
    case 'POST':
      return uploadImage(req, res);

    default:
      return res.status(400).json({ message: 'Bad request' });
  }
}

// // avoid storing in fs
const saveFile = async (file: formidable.File) => {
  const data = fs.readFileSync(file.filepath);
  fs.writeFileSync(`./public/${file.originalFilename}`, data);

  // delete from temp
  return fs.unlinkSync(file.filepath);
};

const parseFiles = async (req: NextApiRequest) => {
  return new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      console.log({ err, fields, files });
      if (err) return reject(err);

      await saveFile(files.file as formidable.File);
      resolve(true);
    });
  });
};

const uploadImage = async (
  req: NextApiRequest,
  res: NextApiResponse<HandlreData>
) => {
  await parseFiles(req);

  await db.connect();
  await db.disconnect();

  return res.status(200).json({ message: 'Successful request' });
};
