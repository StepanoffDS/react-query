import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Demo from './Demo'
import React from 'react'

const queryClient = new QueryClient()

const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<Demo />
		</QueryClientProvider>
	)
}

export default App
