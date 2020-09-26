module.exports = {
    pluginOptions: {
        s3Deploy: {
            region: 'eu-central-1',
            bucket: 'azaas-frontend',
            createBucket: true,
            staticHosting: true,
            registry: undefined,
            awsProfile: 'default',
            overrideEndpoint: false,
            staticIndexPage: 'index.html',
            staticErrorPage: 'index.html',
            assetPath: 'dist',
            assetMatch: '**',
            deployPath: '/',
            acl: 'public-read',
            pwa: false,
            enableCloudfront: false,
            pluginVersion: '4.0.0-rc3',
            uploadConcurrency: 5
        }
    },
    publicPath: process.env.NODE_ENV === 'production'
        ? '/azaas-frontend/'
        : '/'
};
