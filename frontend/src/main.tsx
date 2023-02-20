import './index.css'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { routes } from './routes'
import { UserContext, SurveyContext } from './contexts'

createRoot(document.getElementById('root') as HTMLElement).render(
	<UserContext>
		<SurveyContext>
			<RouterProvider router={routes} />
		</SurveyContext>
	</UserContext>
)
