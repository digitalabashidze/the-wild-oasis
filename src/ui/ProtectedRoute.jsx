import styled from 'styled-components'
import { useUser } from '../features/authentication/useUser'
import Spinner from './Spinner'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const FullPage = styled.div`
	height: 100vh;
	background-color: var(--color-gray-50);
	display: flex;
	align-items: center;
	justify-content: center;
`

function ProtectedRoute({ children }) {
	const navigate = useNavigate()
	// 1. load the authenticated user
	const { isLoading, user, isAuthenticated } = useUser()

	//3. if there is No authenticated user redirect to the login page
	useEffect(() => {
		if (!isAuthenticated && !isLoading) navigate('/login')
	}, [isAuthenticated, isLoading, navigate])
	//4 if there is a user, render the app

	//2. while loading show a spinner

	if (isLoading)
		return (
			<FullPage>
				<Spinner />
			</FullPage>
		)

	if (isAuthenticated) return children
}

export default ProtectedRoute
