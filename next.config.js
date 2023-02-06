const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
});

module.exports = (phase, { defaultConfig }) => {
    const config = withBundleAnalyzer({
        ...defaultConfig,
        images: {
            unoptimized: true
        }
    });

    // @next/bundle-analyzer adds values which next complains about
    delete config.webpackDevMiddleware;
    delete config.configOrigin;
    delete config.target;

    // next itself adds some defaults that it complains about
    delete config.amp.canonicalBase;
    delete config.assetPrefix;
    delete config.experimental.outputFileTracingRoot;
    delete config.i18n;
    delete config.reactStrictMode;

    return config;
};
