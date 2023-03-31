import type { NextApiRequest, NextApiResponse } from 'next';
import { v2 as cloudinary } from 'cloudinary';
import formidable from 'formidable';

cloudinary.config(process.env.CLOUDINARY_URL || '');

type HandlreData = { message: string } | { filePath: string };

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

// upload to cloudinary
const saveFile = async (file: formidable.File): Promise<string> => {
  const { secure_url } = await cloudinary.uploader.upload(file.filepath, {
    folder: 'next-teslo-shop',
  });

  return secure_url;
};

const parseFiles = async (req: NextApiRequest): Promise<string> => {
  return new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      // console.log({ err, fields, files });
      if (err) return reject(err);
      if ((files.file as formidable.File).size > 3 * 1024 * 1024)
        return reject({
          type: 'sizeError',
          message: 'Image exceeds the 2 MB allowed',
        });

      const filePath = await saveFile(files.file as formidable.File);
      resolve(filePath);
    });
  });
};

const uploadImage = async (
  req: NextApiRequest,
  res: NextApiResponse<HandlreData>
) => {
  try {
    const filePath = await parseFiles(req);

    return res.status(200).json({ filePath });
  } catch (error: any) {
    console.log(error);
    if (error?.type === 'sizeError')
      return res.status(400).json({
        message: error.message,
      });

    return res.status(500).json({
      message: 'Something went wrong',
    });
  }
};

/* fs: Not Recommended
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
  
*/
