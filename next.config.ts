import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // 75 是預設；90 給照片用（來源 jpg 已經壓過一次，再壓 75 會糊）
  images: { qualities: [75, 90] },
  // 換頁用瀏覽器原生 View Transitions（layout 包 <ViewTransition>）；不支援的瀏覽器直接切
  experimental: { viewTransition: true },
}

export default nextConfig
