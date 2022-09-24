import path from "path";
import fs from "fs";

const readData = (filePath) => {
  const dataPath = path.join(__dirname, "../data/users" + filePath);

  const jsonData = fs.readFileSync(dataPath);

  const parseJSON = JSON.parse(jsonData);

  return parseJSON;
};

export default readData;
