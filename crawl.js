const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const normalizeURL = (url) => {
    const parsedURL = new URL(url);
    let pathname = parsedURL.pathname;
    if (pathname === '/' || pathname.endsWith('/')) {
        pathname = pathname.slice(0, -1);
    }
    return `${parsedURL.hostname}${pathname}`;
}

const getURLsFromHTML = (htmlBody, baseURL) => {
    const dom = new JSDOM(`${htmlBody}`);
    const links = Array.from(dom.window.document.querySelectorAll('a'));
    const urls = links.map(link => new URL(link.href, baseURL).href);
    return urls;
}

const crawlPage = async (baseURL, currentURL, pages) => {
    const base = new URL(baseURL);
    const current = new URL(currentURL);

    // Base case: Make sure the currentURL is on the same domain as the baseURL
    if (base.hostname !== current.hostname) {
        return pages;
    }

    const normalizedURL = normalizeURL(currentURL);
    // If the pages object already has an entry for the normalized version of the current URL,
    // just increment the count and return the current pages
    if (pages[normalizedURL]) {
        pages[normalizedURL]++;
        return pages;
    }

    // Otherwise, set the count to 1
    pages[normalizedURL] = 1;

    console.log(`Crawling ${currentURL}`);
    let htmlBody;
    try {
        const res = await fetch(currentURL);
        if (res.status > 399) {
            console.error(`Got HTTP error, status code: ${res.status}`)
            return pages
        }
        const contentType = res.headers.get('content-type')
        if (!contentType.includes('text/html')) {
            console.error(`Got non-html response: ${contentType}`)
            return pages
        }
        htmlBody = await res.text();
    } catch (err) {
        console.error(`${err.message}`);
    }

    // get all the URLs from the response body HTML
    const urls = getURLsFromHTML(htmlBody, baseURL);

    // Recursively crawl each URL found on the page 
    for (const url of urls) {
        pages = await crawlPage(baseURL, url, pages);
    }

    return pages;
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}