module.exports = {
  apps: [
    {
      name: 'txn-matcher-ui',
      script: 'server.mjs',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
}
