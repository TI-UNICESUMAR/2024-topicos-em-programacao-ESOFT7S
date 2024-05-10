import { promises } from 'node:fs'

const filename = "big-file.txt";

//await promises.readFile(filename)


try {
  const file = await promises.readFile(filename)
  console.log("file size", file.byteLength / 1e9, "GB", "\n")
  console.log("fileBuffer", file)
} catch (error) {
  console.log("error: max 2GB reached..", error.message)
}