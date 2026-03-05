const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "sonic-website"
const isGithubActions = process.env.GITHUB_ACTIONS === "true"
const basePath = isGithubActions ? `/${repoName}` : ""

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"]
  },
  ...(basePath
    ? {
        basePath,
        assetPrefix: `${basePath}/`
      }
    : {})
}

export default nextConfig
