import { DOMParser } from 'linkedom';
import { encodeXML } from 'entities';

import hljs from 'highlight.js/lib/core';
import cpp from 'highlight.js/lib/languages/cpp';
hljs.registerLanguage('cpp', cpp);

export function indexLayout(site, _resource, _content) {
  return String.raw`
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>@sharaelong&#x27;s Blog</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Hahmlet:wght@400;700&amp;family=IBM+Plex+Sans+KR:wght@400;700&amp;display=swap">
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = {
        theme: {
          extend: {
            fontFamily: {
              sans: [
                "IBM Plex Sans KR",
                ...tailwind.defaultTheme.fontFamily.sans
              ],
              serif: [
                "Hahmlet",
                ...tailwind.defaultTheme.fontFamily.serif
              ]
            },
            textUnderlineOffset: {
              6: "6px"
            }
          }
        },
        variants: {},
        plugins: []
      };
    </script>
  </head>
  <body class="min-h-screen">
    <header class="sticky top-0 z-10 bg-white border-2 border-b-indigo-700">
      <nav class="h-16 mx-auto w-11/12 lg:max-w-3xl flex gap-4 items-center">
        <span class="text-2xl font-bold"><a href="/">sharaelong's blog</a></span>
<!--
        <a class="align-middle font-bold text-indigo-700" href="/">All Posts</a>
        <a class="align-middle font-bold text-indigo-700" href="https://twitter.com/sharaelong" target="_blank" rel="noopener">
          <svg width="20" height="20" fill="currentColor" class="inline">
            <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"></path>
          </svg>
          sharaelong
        </a>
-->
      </nav>
    </header>
    <main class="mx-auto my-12 w-11/12 lg:max-w-3xl">
      <section class="leading-7">
        <h1 class="text-4xl mb-4 font-bold">All Posts</h1>
        <ul class="flex flex-col">
          ${site.posts.map(post => String.raw`
          <li>
            <a class="hover:text-indigo-800" href="${post.relativeURL}">
              <h2 class="mt-6 mb-2 text-2xl underline decoration-2 decoration-indigo-700 underline-offset-6">${post.data.title}</h2>
              <p>${post.summary}</p>
            </a>
          </li>
          `).join('')}
        </ul>
      </section>
    </main>
    <footer class="sticky top-[100vh] bg-white border-2 border-t-indigo-700">
      <nav class="h-16 mx-auto w-11/12 lg:max-w-3xl flex gap-4 items-center">
        <span class="text-slate-400">
          Design by: <a href="https://goranmoomin.dev">@goranmoomin</a>
          <br>
          Contact: <a href="mailto:sharaelong.shin@gmail.com">sharaelong.shin@gmail.com</a>
        </span>
      </nav>
    </footer>
  </body>
</html>
`;
}

export function postLayout(_site, resource, content) {
    let contentDocument = new DOMParser().parseFromString(`<html><body>${content}</body></html>`, 'text/html');

    // Preprocess backtick-equation
    for (let codeEl of contentDocument.querySelectorAll("code")) {
        if (codeEl.parentNode.tagName !== 'PRE' && codeEl.childElementCount === 0) {
            let text = codeEl.textContent;
            if (/^\$[^$]/.test(text) && /[^$]\$$/.test(text)) {
                text = text.replace(/^\$/, '\\(').replace(/\$$/, '\\)');
                codeEl.textContent = text;
            }
            if (/^\\\((.|\s)+\\\)$/.test(text) || /^\\\[(.|\s)+\\\]$/.test(text) ||
                /^\$(.|\s)+\$$/.test(text) ||
                /^\\begin\{([^}]+)\}(.|\s)+\\end\{[^}]+\}$/.test(text)) {
                codeEl.outerHTML = codeEl.innerHTML;  // remove <code></code>
                continue;
            }
        }
    }
    
    // Add tailwind classes to unstyled plain HTML tags.
    for (let mjxEl of contentDocument.querySelectorAll("mjx-container[jax='SVG']")) {
        if (mjxEl.getAttribute("display") === "true") {
            mjxEl.classList.add("block", "overflow-auto");
            mjxEl.querySelector("svg").classList.add("block", "mx-auto");
        } else {
            mjxEl.querySelector("svg").classList.add("inline");
        }
        mjxEl.querySelector("mjx-assistive-mml").classList.add("sr-only");
    }
    for (let codeEl of contentDocument.querySelectorAll("pre code")) {
        hljs.highlightElement(codeEl);
        codeEl.classList.add("hljs", "text-sm", "px-4", "py-3", "lg:-mx-4", "rounded-xl");
    }
    for (let headingEl of contentDocument.querySelectorAll("h1, h2, h3, h4, h5, h6")) {
        let headingSize = Number.parseInt(headingEl.tagName.substring(1)) - 1;
        headingEl.classList.add(["text-3xl", "text-2xl", "text-xl", "text-lg", "text-base"][headingSize], "font-serif", "mt-6", "mb-2", "font-bold");
    }
    for (let listEl of contentDocument.querySelectorAll("ul, ol")) {
        let listType = listEl.tagName.toLowerCase();
        listEl.classList.add({ ul: "list-disc", ol: "list-decimal" }[listType], "list-inside");
    }

    for (let paragraphEl of contentDocument.querySelectorAll("p")) {
        paragraphEl.classList.add("my-2");
    }

    for (let blockquoteEl of contentDocument.querySelectorAll("blockquote")) {
        blockquoteEl.classList.add("pl-4", "my-4", "border-l-4", "border-l-indigo-700");
    }
    for (let anchorEl of contentDocument.querySelectorAll("a")) {
        anchorEl.classList.add("text-indigo-700", "underline", "decoration-2", "underline-offset-4");
    }
    for (let imageEl of contentDocument.querySelectorAll("img")) {
        // Create a new <img> element
        let newImageEl = contentDocument.createElement("img");
        // Copy the src attribute from the original image
        newImageEl.setAttribute("src", imageEl.getAttribute("src"));
        newImageEl.classList.add("my-4");
        
        // Create a new <p> element
        let paragraphEl = contentDocument.createElement("p");
        // Set the align attribute to "center"
        paragraphEl.setAttribute("align", "center");

        // Append the original <img> element to the <p> element
        paragraphEl.appendChild(newImageEl);

        // Create a new <figure> element
        let figureEl = contentDocument.createElement("figure");

        // Append the <p> element to the <figure> element
        figureEl.appendChild(paragraphEl);

        // Create a new <figcaption> element
        let figcaptionEl = contentDocument.createElement("figcaption");
        // Set the align attribute to "center"
        figcaptionEl.setAttribute("align", "center");
        // Set the caption text as the alt attribute of the image
        figcaptionEl.textContent = imageEl.getAttribute("alt");
        figcaptionEl.classList.add("text-gray-400");

        // Append the <figcaption> element to the <figure> element
        figureEl.appendChild(figcaptionEl);

        // Replace the original image with the <figure> element
        imageEl.parentNode.replaceChild(figureEl, imageEl);

        // Set the margin to figure element
        figureEl.style.marginTop = "24px";
        figureEl.style.marginBottom = "24px";
    }

    let html = contentDocument.body.innerHTML;

  return String.raw`
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>@sharaelong&#x27;s Blog</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Hahmlet:wght@400;700&amp;family=IBM+Plex+Sans+KR:wght@400;700&amp;display=swap">
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
    MathJax = {
      tex: {
        inlineMath: [['$', '$'], ['\\(', '\\)']],
      }
    };
    </script>
    <script defer src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
    <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
    <script>
      tailwind.config = {
        theme: {
          extend: {
            fontFamily: {
              sans: [
                "IBM Plex Sans KR",
                ...tailwind.defaultTheme.fontFamily.sans
              ],
              serif: [
                "Hahmlet",
                ...tailwind.defaultTheme.fontFamily.serif
              ]
            },
            textUnderlineOffset: {
              6: "6px"
            }
          }
        },
        variants: {},
        plugins: []
      };
    </script>
    <style>
      pre code.hljs {
        display: block;
        overflow-x: auto;
      }

      .hljs {
        color: #c9d1d9;
        background: #0d1117;
      }

      .hljs-doctag,
      .hljs-keyword,
      .hljs-meta .hljs-keyword,
      .hljs-template-tag,
      .hljs-template-variable,
      .hljs-type,
      .hljs-variable.language_ {
        color: #ff7b72;
      }

      .hljs-title,
      .hljs-title.class_,
      .hljs-title.class_.inherited__,
      .hljs-title.function_ {
        color: #d2a8ff;
      }

      .hljs-attr,
      .hljs-attribute,
      .hljs-literal,
      .hljs-meta,
      .hljs-number,
      .hljs-operator,
      .hljs-selector-attr,
      .hljs-selector-class,
      .hljs-selector-id,
      .hljs-variable {
        color: #79c0ff;
      }

      .hljs-meta .hljs-string,
      .hljs-regexp,
      .hljs-string {
        color: #a5d6ff;
      }

      .hljs-built_in,
      .hljs-symbol {
        color: #ffa657;
      }

      .hljs-code,
      .hljs-comment,
      .hljs-formula {
        color: #8b949e;
      }

      .hljs-name,
      .hljs-quote,
      .hljs-selector-pseudo,
      .hljs-selector-tag {
        color: #7ee787;
      }

      .hljs-subst {
        color: #c9d1d9;
      }

      .hljs-section {
        color: #1f6feb;
        font-weight: 700;
      }

      .hljs-bullet {
        color: #f2cc60;
      }

      .hljs-emphasis {
        color: #c9d1d9;
        font-style: italic;
      }

      .hljs-strong {
        color: #c9d1d9;
        font-weight: 700;
      }

      .hljs-addition {
        color: #aff5b4;
        background-color: #033a16;
      }

      .hljs-deletion {
        color: #ffdcd7;
        background-color: #67060c;
      }
    </style>
  </head>
  <body>
    <header class="sticky top-0 z-10 bg-white border-2 border-b-indigo-700">
      <nav class="h-16 mx-auto w-11/12 lg:max-w-3xl flex gap-4 items-center">
        <span class="text-2xl font-bold"><a href="/">sharaelong's blog</a></span>
        <a class="align-middle font-bold text-indigo-700" href="/">All Posts</a>
<!--
        <a class="align-middle font-bold text-indigo-700" href="https://twitter.com/sharaelong" target="_blank" rel="noopener">
          <svg width="20" height="20" fill="currentColor" class="inline">
            <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"></path>
          </svg>
          sharaelong
        </a>
-->
      </nav>
    </header>
    <main class="mx-auto my-12 w-11/12 lg:max-w-3xl">
      <article class="flex flex-col leading-7">
        <h1 class="text-4xl mb-4 font-bold">${resource.data.title}</h1>
        <div class="text-sm uppercase">${new Date(resource.data.date).toDateString()}</div>
        <div>${html}</div>
      </article>
    </main>
    <footer class="sticky top-[100vh] bg-white border-2 border-t-indigo-700">
      <nav class="h-16 mx-auto w-11/12 lg:max-w-3xl flex gap-4 items-center">
        <span class="text-slate-400">
          Design by: <a href="https://goranmoomin.dev">@goranmoomin</a>
          <br>
          Contact: <a href="mailto:sharaelong.shin@gmail.com">sharaelong.shin@gmail.com</a>
        </span>
      </nav>
    </footer>
  </body>
</html>
`;
}

export function atomFeedLayout(site, _resource, _content) {
  return String.raw`
<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <author>
    <name>Kijun Shin</name>
    <uri>https://sharaelong.com</uri>
    <email>sharaelong.shin@gmail.com</email>
  </author>
  <id>https://sharaelong.com/</id>
  <link rel="self" href="https://sharaelong.com/feed.atom"/>
  <subtitle>Simple rants from @sharaelong</subtitle>
  <title>sharaelong's blog</title>
  <updated>${new Date(Math.max(...site.posts.map(post => post.data.date))).toISOString()}</updated>
  ${site.posts.map(post => String.raw`
  <entry>
    <content type="html">${encodeXML(post.content).trim()}</content>
    <id>https://sharaelong.dev${post.relativeURL}</id>
    <link rel="alternate" href="https://sharaelong.com${post.relativeURL}"/>
    <published>${new Date(post.data.date).toISOString()}</published>
    <summary>${encodeXML(post.summary)}</summary>
    <title>${encodeXML(post.data.title)}</title>
    <updated>${new Date(post.data.date).toISOString()}</updated>
  </entry>
  `).join('')}
</feed>`
    .trim();
}

export function sitemapLayout(site, _resource, _content) {
  return String.raw`
<?xml version="1.0" encoding="utf-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${site.posts.map(post => String.raw`
    <url>
      <loc>https://sharaelong.com${post.relativeURL}</loc>
      <lastmod>${new Date(post.data.date).toISOString()}</lastmod>
    </url>
  `).join('')}
</urlset>`
    .trim();
}
