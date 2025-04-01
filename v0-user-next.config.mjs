/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    "@department-of-veterans-affairs/component-library",
    "@department-of-veterans-affairs/formation",
    "@department-of-veterans-affairs/web-components"
  ],
  webpack: (config) => {
    // This is needed for the VA component library
    config.resolve.alias = {
      ...config.resolve.alias,
      'react/jsx-runtime': require.resolve('react/jsx-runtime')
    };
    
    return config;
  }
};

export default nextConfig;

