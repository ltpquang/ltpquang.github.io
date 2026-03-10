const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function (eleventyConfig) {
    // Plugins
    eleventyConfig.addPlugin(pluginRss);
    eleventyConfig.addPlugin(pluginSyntaxHighlight);

    // Passthrough
    eleventyConfig.addPassthroughCopy("./src/css");
    eleventyConfig.addPassthroughCopy("./src/img");
    eleventyConfig.addWatchTarget("./src/css/");

    // Collections
    eleventyConfig.addCollection("posts", function (collectionApi) {
        return collectionApi.getFilteredByGlob("./src/blog/*.md")
            .sort((a, b) => b.date - a.date);
    });

    eleventyConfig.addCollection("tagList", function (collectionApi) {
        const tagSet = new Set();
        collectionApi.getAll().forEach((item) => {
            (item.data.tags || []).forEach((tag) => {
                if (!["posts", "all"].includes(tag)) tagSet.add(tag);
            });
        });
        return [...tagSet].sort();
    });

    // Filters
    eleventyConfig.addFilter("readableDate", (date, locale = "vi-VN") => {
        return new Date(date).toLocaleDateString(locale, {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    });

    eleventyConfig.addFilter("isoDate", (date) => {
        return new Date(date).toISOString();
    });

    eleventyConfig.addFilter("limit", (arr, n) => arr.slice(0, n));

    return {
        dir: {
            input: "src",
            output: "public",
            includes: "_includes",
            data: "_data",
        },
        markdownTemplateEngine: "njk",
        htmlTemplateEngine: "njk",
    };
};
