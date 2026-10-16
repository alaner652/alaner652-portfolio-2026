import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // 75 是預設；90 給照片用（來源 jpg 已經壓過一次，再壓 75 會糊）
  images: { qualities: [75, 90] },
}

export default nextConfig
