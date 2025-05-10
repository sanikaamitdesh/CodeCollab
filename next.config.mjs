/** @type {import('next').NextConfig} */
const nextConfig = {};
// module.exports = {
//     experimental: { appDir: true },
//   };
module.exports = {
    output: 'export',
    images: { unoptimized: true }, // optional: if you're using Next.js images
  };
  
export default nextConfig;
