import './styles/main.css';

import { Provider } from 'react-redux'

import { store } from './store'

import { Router } from './routes'

export const App = () => {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  )
}