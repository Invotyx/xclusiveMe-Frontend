module.exports = {
  future: {
    webpack5: true,
  },
  publicRuntimeConfig: {
    backendUrl: process.env.BACKEND_URL,
    stripeKey: process.env.STRIPE_KEY,
  },
};
