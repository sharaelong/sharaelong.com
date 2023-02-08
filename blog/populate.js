import { readdir, readFile } from "fs/promises";
import { basename, join } from "path";
import { Miniflare } from "miniflare";

let mf = new Miniflare({
  script: '',
  kvNamespaces: ["POSTS", "STATIC"],
  kvPersist: true,
});

let POSTS = await mf.getKVNamespace("POSTS");
let postsPathURL = new URL('posts', import.meta.url);
for (let postFileName of await readdir(postsPathURL)) {
    let postPathURL = new URL(join('posts', postFileName), import.meta.url)
    let postContents = await readFile(postPathURL);
    await POSTS.put(basename(postFileName, '.md'), postContents);
}

let STATIC = await mf.getKVNamespace("STATIC");
let filesPathURL = new URL('static', import.meta.url);
for (let fileName of await readdir(filesPathURL)) {
    let filePathURL = new URL(join('static', fileName), import.meta.url)
    let fileContents = await readFile(filePathURL);
    await STATIC.put(fileName, fileContents);
}
