/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains: [
            "127.0.0.1",
            "bookit.pythonanywhere.com"
        ],
        unoptimized:true,
    },
}

module.exports = nextConfig
