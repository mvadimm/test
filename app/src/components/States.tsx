import { useState } from 'react'
import {
	Button,
	Grid,
	Tab,
	Tabs,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
} from '@mui/material'
import AddOrderForm from './AddOrderForm'

interface StatesProps {
	onOrderAdded: () => void
}

const States: React.FC<StatesProps> = ({ onOrderAdded }) => {
	const [currentTab, setCurrentTab] = useState(1)
	const [openDialog, setOpenDialog] = useState(false)

	const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
		setCurrentTab(newValue)
	}

	const handleOpenDialog = () => {
		setOpenDialog(true)
	}

	const handleCloseDialog = () => {
		setOpenDialog(false)
	}

	return (
		<Grid
			container
			spacing={2}
			justifyContent='space-between'
			alignItems='center'
		>
			<Grid item>
				<Tabs value={currentTab} onChange={handleTabChange}>
					<Tab label='Заявки' />
					<Tab label='В работе' />
					<Tab label='Завершенные' />
				</Tabs>
			</Grid>
			<Grid item>
				<Button variant='contained' color='primary' onClick={handleOpenDialog}>
					Добавить заказ
				</Button>
				<Dialog
					open={openDialog}
					onClose={handleCloseDialog}
					maxWidth='sm'
					fullWidth
				>
					<DialogTitle>Добавить новый заказ</DialogTitle>
					<DialogContent>
						<AddOrderForm
							onOrderAdded={() => {
								onOrderAdded()
								handleCloseDialog()
							}}
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleCloseDialog} color='primary'>
							Закрыть
						</Button>
					</DialogActions>
				</Dialog>
			</Grid>
		</Grid>
	)
}

export default States
