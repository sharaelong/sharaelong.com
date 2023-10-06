# Install and Usage
1. Install wrangler, miniflare. Also for the first time wrangler requires login to cloudflare. You don't need to initialize whole directory. Make sure `wrangler.toml` file placed in `/blog` beforehand.

```bash
cd blog
npm init
npm install wrangler
npm install -D miniflare
npx wrangler init
```

2. To run the test in the local environment, start local HTTP server. 

```bash
npm run dev
```

3. To add posts and static files, use `populate.js`. Every file format is attached at the end.
```bash
node populate.js
```

4. To upload posts to production KV storage,
```bash
for p in posts/*.md;
do 
    npx wrangler kv:key put --binding=POSTS "$(basename -s .md "$p")" --path "$p";
done
```
or individually,
```bash
npx wrangler kv:key put --binding=STATIC FFT-visualization.png --path static/FFT-visualization.png
```

To make new KV storage namespaces,
```bash
npx wrangler kv:namespace create POSTS
npx wrangler kv:namespace list # verify
```

5. To publish changes,
```bash
npx wrangler publish
```

# Useful methods

To convert image format of heic,
```bash
magick input.heic -quality 70% output.jpeg
```

To crop image,
```bash
convert original.jpg -crop 640x620+0+0 cropped.jpg
```
Syntax: width x height + originX + originY

To resize image,
```bash
convert original.jpg -resize 50% cropped.jpg
```


# List of non-intuitive features
1. Every image will be inserted in p tag which has align="center" attribute.
2. Any string inserted in the alt text of markdown syntax will be a caption of the corresponding image.
3. HTML option of markdown-it parser is enabled.
