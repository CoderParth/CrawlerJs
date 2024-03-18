# CrawlerJS

CrawlerJS is a simple web crawler written in JavaScript. It starts from a given URL and recursively crawls all internal links found on the same domain.

## Installation

Before you start, make sure you have Node.js installed on your machine.

1. Clone the repository:
    ```
    git clone https://github.com/CoderParth/CrawlerJs
    ```
2. Navigate to the project directory:
    ```
    cd crawlerjs
    ```
3. Install the dependencies:
    ```
    npm install
    ```

## Usage

To start the crawler, run the following command, replacing `https://get.dev/` with the URL you want to crawl:

    ```
    npm run start "https://get.dev/"
    ```

## This is Not an amazing crawler, just a simple one

After crawling, it prints a simple report on the console.

    ```
    Deploying CrawlerJs at: https://get.dev/
    Crawling https://get.dev/
    Crawling https://get.dev/videos/
    Crawling https://get.dev/[[domainSearchCtrl.getString(partner.url)]]
    Got HTTP error, status code: 404
    Starting report...
    Found 17 internal links to get.dev
    Found 4 internal links to get.dev/videos
    Found 2 internal links to get.dev/[[domainSearchCtrl.getString(partner.url)]]
    ```