const sortPages = (pages) => {
    return Object.entries(pages).sort((a, b) => b[1] - a[1]);
}

const printReport = (pages) => {
    console.log('Starting report...');
    const sortedPages = sortPages(pages);
    sortedPages.forEach(([url, count]) => {
        console.log(`Found ${count} internal links to ${url}`);
    });
}

module.exports = {
    printReport
}
