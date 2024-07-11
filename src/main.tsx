import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { store } from '@/store'
import ReactDOM from 'react-dom/client'

import { App } from './App'

import './index.css'

const rootElement: HTMLElement = document.getElementById('root')!
const root = ReactDOM.createRoot(rootElement)

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
)
