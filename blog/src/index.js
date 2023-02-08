import { Router } from 'itty-router';
import MarkdownIt from 'markdown-it';
import parseFrontMatter from 'front-matter';

import { indexLayout, postLayout, atomFeedLayout } from './templates';

// import hljs from "highlight.js";

let router = Router();

let md = new MarkdownIt();

function postFromRaw(name, rawPost) {
    let { attributes, body } = parseFrontMatter(rawPost);
    let post = {
        relativeURL: `/${name}`,
        data: attributes,
        summary: attributes.summary,
        content: md.render(body)
    }
    return post;
}

router.get('/', async () => {
    // FIXME: not listing more than 1000 posts
    let { keys } = await POSTS.list();
    let posts = await Promise.all(keys.map(async key => postFromRaw(key.name, await POSTS.get(key.name))));
    let site = {
        posts
    };
    return new Response(indexLayout(site), {
        headers: { 'Content-Type': 'text/html' },
    });
});

router.get('/feed.atom', async () => {
    let { keys } = await POSTS.list();
    let posts = await Promise.all(keys.map(async key => postFromRaw(key.name, await POSTS.get(key.name))));
    let site = {
        posts
    };
    return new Response(atomFeedLayout(site), {
        headers: { 'Content-Type': 'application/atom+xml' }
    });
});

router.get('/static/:slug', async request => {
    let data = await STATIC.get(request.params.slug, { type: 'stream' });
    if (data === null) {
        return new Response('Not Found', { status: 404 });
    }
    return new Response(data, {
        headers: { 'Content-Type': 'image/png' },
    });
});

router.get('/favicon.ico', () => new Response('Not Found', { status: 404 }));

router.get('/:slug', async request => {
    let rawPost = await POSTS.get(request.params.slug);
    if (rawPost === null) {
        return new Response('Not Found', { status: 404 });
    }
    let post = postFromRaw(request.params.slug, rawPost);
    return new Response(postLayout(null, post, post.content), {
        headers: { 'Content-Type': 'text/html' },
    });
});

router.all('*', () => new Response('Not Found', { status: 404 }));

addEventListener('fetch', event => {
    event.respondWith(router.handle(event.request));
});
