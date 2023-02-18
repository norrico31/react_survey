import './index.css'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { routes } from './routes'
import UserProvider from './contexts/UserContext'

createRoot(document.getElementById('root') as HTMLElement).render(
	<UserProvider>
		<RouterProvider router={routes} />
	</UserProvider>
)
