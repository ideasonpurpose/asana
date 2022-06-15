import { basename, dirname, resolve } from "path";
import { stat } from "fs/promises";
import fastGlob from "fast-glob";

import sharp from "sharp";
import makeDir from "make-dir";
import chalk from "chalk";
import bytes from "bytes";
import prettyHrtime from "pretty-hrtime";
import readline from 'readline';

const src = "./src/assets/img";
const dist = "./dist/assets/img";
const maxWidth = 3840;
const maxHeight = maxWidth * 3;

let srcBytes = 0;
const startTime = process.hrtime();

fastGlob(["**/*"], { cwd: src, onlyFiles: true })
  .then((fileList) => {
    const img_s = fileList.length === 1 ? "image" : "images";

    console.log(
      "🔍",
      chalk.yellow("Found"),
      chalk.magenta(fileList.length),
      chalk.yellow(`${img_s}. Optimizing...`)
    );

    const allImages = fileList.map((filepath) => {
      const dir = dirname(filepath);
      const file = basename(filepath);

      stat(resolve(src, filepath)).then((stat) => (srcBytes += stat.size));

      return makeDir(resolve(dist, dir))
        .then(() =>
          sharp(resolve(src, filepath))
            .resize(maxWidth, maxHeight, {
              fit: sharp.fit.inside,
              withoutEnlargement: true,
            })
            .jpeg({
              quality: 77,
              mozjpeg: true,
              force: false,
            })
            .png({ force: false })
            .toFile(resolve(dist, dir, file))
        )
        .then((result) => {
          readline.clearLine(process.stdout);
          readline.cursorTo(process.stdout, 0);
          process.stdout.write("⏳ " + chalk.blue(filepath));
          return result;
        });
    });

    return Promise.all(allImages);
  })

  .then((result) => {
    const end = process.hrtime(startTime);
    const distBytes = result.reduce((total, img) => {
      total += img.size;
      return total;
    }, 0);
    const savedBytes = bytes(srcBytes - distBytes);
    const savedPercent = ((1 - distBytes / srcBytes) * 100).toFixed(2) + "%";

    readline.clearLine(process.stdout);
    readline.cursorTo(process.stdout, 0);

    console.log(
      "🎁",
      chalk.yellow("Completed in"),
      chalk.magenta(prettyHrtime(end)),
      chalk.gray(`(Saved ${savedBytes}, ${savedPercent})`)
    );
  });
