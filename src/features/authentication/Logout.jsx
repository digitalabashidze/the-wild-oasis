import { HiArrowRightOnRectangle } from 'react-icons/hi2'
import ButtonIcon from '../../ui/ButtonIcon'
import { useLogout } from './useLogout'
import SpinnerMini from '../../ui/SpinnerMini'

function Logout() {
	const { logout, isloading } = useLogout()

	return (
		<ButtonIcon disabled={isloading} onClick={logout}>
			{!isloading ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
		</ButtonIcon>
	)
}

export default Logout
