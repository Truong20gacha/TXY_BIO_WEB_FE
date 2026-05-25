import { lazy } from 'react'
import { Routes, Route } from 'react-router-dom'

import { MainLayout } from '@/layouts/MainLayout'
import { HomePage } from '@/pages/HomePage'
import { NotFoundPage } from '@/pages/NotFoundPage'

const ProductsListPage = lazy(() =>
  import('@/pages/ProductsListPage').then(m => ({ default: m.ProductsListPage })),
)
const ProductDetailPage = lazy(() =>
  import('@/pages/ProductDetailPage').then(m => ({ default: m.ProductDetailPage })),
)
const AboutPage = lazy(() =>
  import('@/pages/AboutPage').then(m => ({ default: m.AboutPage })),
)
const ContactPage = lazy(() =>
  import('@/pages/ContactPage').then(m => ({ default: m.ContactPage })),
)
const RequestSamplePage = lazy(() =>
  import('@/pages/RequestSamplePage').then(m => ({ default: m.RequestSamplePage })),
)
const RequestQuotePage = lazy(() =>
  import('@/pages/RequestQuotePage').then(m => ({ default: m.RequestQuotePage })),
)
const RequestDatasheetPage = lazy(() =>
  import('@/pages/RequestDatasheetPage').then(m => ({ default: m.RequestDatasheetPage })),
)
const NewsListPage = lazy(() =>
  import('@/pages/NewsListPage').then(m => ({ default: m.NewsListPage })),
)
const NewsDetailPage = lazy(() =>
  import('@/pages/NewsDetailPage').then(m => ({ default: m.NewsDetailPage })),
)
const PrivacyPage = lazy(() =>
  import('@/pages/PrivacyPage').then(m => ({ default: m.PrivacyPage })),
)
const TermsPage = lazy(() =>
  import('@/pages/TermsPage').then(m => ({ default: m.TermsPage })),
)

export function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsListPage />} />
        <Route path="/products/:slug" element={<ProductDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/request-sample" element={<RequestSamplePage />} />
        <Route path="/request-quote" element={<RequestQuotePage />} />
        <Route path="/request-datasheet" element={<RequestDatasheetPage />} />
        <Route path="/news" element={<NewsListPage />} />
        <Route path="/news/:slug" element={<NewsDetailPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
