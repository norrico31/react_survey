import './index.css'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { routes } from './routes'
import { UserProvider, SurveyProvider, ToastProvider } from './contexts'

createRoot(document.getElementById('root') as HTMLElement).render(
	<UserProvider>
		<SurveyProvider>
			<ToastProvider>
				<RouterProvider router={routes} />
			</ToastProvider>
		</SurveyProvider>
	</UserProvider>
)
