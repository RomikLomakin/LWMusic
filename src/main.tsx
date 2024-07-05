import { BrowserRouter } from 'react-router-dom'

import ReactDOM from 'react-dom/client'

import { App } from './App'

import './index.css'

const rootElement: HTMLElement = document.getElementById('root')!
const root = ReactDOM.createRoot(rootElement)

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
