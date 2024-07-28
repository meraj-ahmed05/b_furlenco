import AuthState from '@/context/AuthState'
import Footer from '../components/Footer'
import Header from '../components/Header'
import CartState from '../context/CartState'
import './globals.css'
import { Inter } from 'next/font/google'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Bhati Furniture',
  description: 'Premium Quality Furniture',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthState>
          <CartState>
            <Header/>
            {children}
            <Footer/>
            <ToastContainer/>
          </CartState>
        </AuthState>
      </body>
    </html>
  )
}
