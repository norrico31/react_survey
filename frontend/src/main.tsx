import './index.css'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { routes } from './routes'
import { UserContext, SurveyContext } from './contexts'
import ToastProvider from './contexts/ToastContext'

createRoot(document.getElementById('root') as HTMLElement).render(
	<UserContext>
		<SurveyContext>
			<ToastProvider>
				<RouterProvider router={routes} />
			</ToastProvider>
		</SurveyContext>
	</UserContext>
)
