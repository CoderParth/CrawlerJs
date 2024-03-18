const { test, expect } = require("@jest/globals");
const { normalizeURL, getURLsFromHTML } = require("./crawl.js");

/* Test for normalizeURL */
test('Normalize URL - Test 1', () => {
    expect(normalizeURL('https://google.com/path/')).toBe('google.com/path')
});

test('Normalize URL - Test 2', () => {
    expect(normalizeURL('https://google.com/path')).toBe('google.com/path')
});

test('Normalize URL - Test 3', () => {
    expect(normalizeURL('http://google.com/path/')).toBe('google.com/path')
});

test('Normalize URL - Test 4', () => {
    expect(normalizeURL('http://google.com/path')).toBe('google.com/path')
});

test('Normalize URL - Test 5', () => {
    expect(normalizeURL('https://www.google.dev/')).toBe('www.google.dev');
});


/* Test for getURLsFromHTML(htmlBody, baseURL) */
test('getURLsFromHTML - Test 1', () => {
    const htmlBody = '<html><body><a href="/relative/path">Link</a></body></html>';
    const baseURL = 'https://google.com';
    expect(getURLsFromHTML(htmlBody, baseURL)).toEqual(['https://google.com/relative/path']);
});

test('getURLsFromHTML - Test 2', () => {
    const htmlBody = '<html><body><a href="https://bing.com/absolute/path">Link</a></body></html>';
    const baseURL = 'https://google.com';
    expect(getURLsFromHTML(htmlBody, baseURL)).toEqual(['https://bing.com/absolute/path']);
});

test('getURLsFromHTML - Test 3', () => {
    const htmlBody = '<html><body><a href="/relative/path">Link</a><a href="https://bing.com/absolute/path">Link</a></body></html>';
    const baseURL = 'https://google.com';
    expect(getURLsFromHTML(htmlBody, baseURL)).toEqual(['https://google.com/relative/path', 'https://bing.com/absolute/path']);
});
