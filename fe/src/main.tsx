import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import { rootReducer } from './store/RootReducer'
import { configureStore } from '@reduxjs/toolkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const store = configureStore({
  reducer: rootReducer
})

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <Provider store={store}>
        <App/>
        </Provider>
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
