const { DateTime } = require("luxon");
const markdownIt = require("markdown-it");
const { execSync } = require('child_process')


module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("css");
    eleventyConfig.addPassthroughCopy("media");
    eleventyConfig.addPassthroughCopy("admin/config.yml");

    eleventyConfig.addFilter("formatDate", (dateObj) => {
        return DateTime.fromJSDate(dateObj).toISODate();
    });     

    let markdownOptions = {
        html: true,
        breaks: true,
        linkify: true
    };
    let markdownLib = new markdownIt(markdownOptions);

    //Add div around tables
    markdownLib.renderer.rules.table_open = () => '<div class="table-wrapper">\n<table>\n',
    markdownLib.renderer.rules.table_close = () => '</table>\n</div>',

    eleventyConfig.setLibrary("md", markdownLib);

    eleventyConfig.on('eleventy.after', () => {
        execSync(`npx pagefind --site _site --glob \"**/*.html\"`, { encoding: 'utf-8' })
    })

    return {
    }


};