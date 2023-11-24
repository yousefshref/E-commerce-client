import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import AuthContext from '@/context/AuthContext'
import CategoryContext from '@/context/CategoryContext'
import StateContext from '@/context/StateContext'
import ProductContext from '@/context/ProductContext'
import CartContext from '@/context/CartContext'
import OrderContext from '@/context/OrderContext'
import BrandContext from '@/context/BrandContext'
import App from '../App'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ebda3 | System',
  // description: 'اختاري الشقة التي تناسبك لحجزها في اي وقت تريد وبالغرب والسعر الذي تريدة, الان يمكنك رؤيةافضل الشقق والفيلات في المناطق المصرية الاكثر حيوية',
  // icons: '/brand-logo-white.png'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head>
        <title>E-commerce system</title>
      </Head>
      <body>
        <AuthContext>
          <CategoryContext>
            <StateContext>
              <ProductContext>
                <CartContext>
                  <OrderContext>
                    <BrandContext>
                      <App children={children} />
                    </BrandContext>
                  </OrderContext>
                </CartContext>
              </ProductContext>
            </StateContext>
          </CategoryContext>
        </AuthContext>
      </body>
    </html>
  )
}
