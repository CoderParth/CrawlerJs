const { crawlPage } = require("./crawl");
const { printReport } = require("./report");

const main = async () => {
    if (process.argv.length != 3) { // Node.js's built-in api to access command line arguments
        throw new Error("Please provide one argument for the base url");
    }
    const baseURL = process.argv[2];
    console.log(`Deploying CrawlerJs at: ${baseURL}`);
    const pages = await crawlPage(baseURL, baseURL, {});
    printReport(pages);
}

main();