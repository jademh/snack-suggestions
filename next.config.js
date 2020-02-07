const glob = require("glob");

//next.config.js
module.exports = {
  webpack: function(config) {
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader"
    });
    return config;
  },
  exportTrailingSlash: true,
  exportPathMap: function() {
    // get all .md files in the posts dir
    const blogPostFiles = glob.sync("content/pages/**/*.md");

    // remove path and extension to leave filename only
    const blogPostSlugs = blogPostFiles.map(file =>
      file
        .split("/")[2]
        .replace(/ /g, "-")
        .slice(0, -3)
        .trim()
    );

    const createPathObject = (pathObject, slug) => {
      return {
        ...pathObject,
        [`/blog/${slug}`]: {
          page: "/blog/[slug]",
          query: { slug: slug }
        }
      };
    };
    const blogPostsPathMap = blogPostSlugs.reduce(createPathObject, {});

    return {
      "/": { page: "/" },
      ...blogPostsPathMap
    };
  }
};
