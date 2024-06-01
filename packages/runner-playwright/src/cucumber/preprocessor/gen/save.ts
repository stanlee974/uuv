import path from "node:path";
import fs from "node:fs";
import { PWFile } from "./generate";

export function saveFiles(files: PWFile[], outputDir: string) {
  clearDir(outputDir);
  const paths = files.map((file) => {
    const filePath = path.join(outputDir, `${file.doc.uri}.spec.js`);
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, file.content);
    return filePath;
  });
  return paths;
}

function clearDir(dir: string) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true });
  }
}
