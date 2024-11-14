import { useState, Fragment } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { routes } from './routes/routes'
import Default from './components/Default/Default'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Router>
        <Routes>
          {routes.map((route, idx) => {
            const Page = route.page
            const isCheckAdmin = !route.isPrivate || user.isAdmin
            const Layout = route.isShowHeader ? Default : Fragment
            return (
              <Route key={idx} path={isCheckAdmin && route.path} element={
                <Layout>
                  <Page />
                </Layout>
              } />
            )
          })}
        </Routes>
      </Router>
    </div>
  )
}

export default App
