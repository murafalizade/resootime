module.exports = {
    siteUrl: 'https://www.resootime.com',
    changefreq: 'daily',
    priority: 0.7,
    sitemapSize: 5000,
    generateRobotsTxt: true,
    exclude: ['/restaurant/**'],
    robotsTxtOptions: {
      policies: [
        {
          userAgent: '*',
          allow: '/',
        },
      ],
    },
    // Define any other options or rules for your sitemap here
  };
  