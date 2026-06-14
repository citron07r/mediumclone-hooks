import {Routes, Route} from 'react-router-dom'
import React from 'react'

import GlobalFeed from './pages/globalFeed'
import Article from './pages/article'
import Authentication from './pages/authentication'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<GlobalFeed />} />
      <Route path="/login" element={<Authentication />} />
      <Route path="/register" element={<Authentication />} />
      <Route path="/articles/:slug" element={<Article />} />
    </Routes>
  )
}

export default AppRoutes