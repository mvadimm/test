import { useState } from 'react'
import { useMutation, gql } from '@apollo/client'
import { Button, TextField, Grid } from '@mui/material'

const ADD_ORDER = gql`
	mutation AddOrder(
		$sequence: Int!
		$orderNumber: String!
		$client: String!
		$manager: String!
	) {
		addOrder(
			sequence: $sequence
			orderNumber: $orderNumber
			client: $client
			manager: $manager
		) {
			id
			sequence
			orderNumber
			client
			manager
		}
	}
`

interface AddOrderFormProps {
	onOrderAdded: () => void
}

const AddOrderForm: React.FC<AddOrderFormProps> = ({ onOrderAdded }) => {
	const [sequence, setSequence] = useState<number | ''>('')
	const [orderNumber, setOrderNumber] = useState<string>('')
	const [client, setClient] = useState<string>('')
	const [manager, setManager] = useState<string>('')

	const [addOrder, { loading, error }] = useMutation(ADD_ORDER, {
		onCompleted: () => {
			onOrderAdded()
			setSequence('')
			setOrderNumber('')
			setClient('')
			setManager('')
		},
	})

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		addOrder({
			variables: {
				sequence: parseInt(sequence as string),
				orderNumber,
				client,
				manager,
			},
		})
	}

	return (
		<form onSubmit={handleSubmit}>
			<Grid container spacing={2} direction='column'>
				<Grid item>
					<TextField
						type='number'
						label='Очередность'
						value={sequence}
						onChange={e => setSequence(Number(e.target.value))}
						fullWidth
						required
					/>
				</Grid>
				<Grid item>
					<TextField
						type='text'
						label='Номер заказа'
						value={orderNumber}
						onChange={e => setOrderNumber(e.target.value)}
						fullWidth
						required
					/>
				</Grid>
				<Grid item>
					<TextField
						type='text'
						label='Клиент'
						value={client}
						onChange={e => setClient(e.target.value)}
						fullWidth
						required
					/>
				</Grid>
				<Grid item>
					<TextField
						type='text'
						label='Ответственный менеджер'
						value={manager}
						onChange={e => setManager(e.target.value)}
						fullWidth
						required
					/>
				</Grid>
				<Grid item>
					<Button type='submit' variant='contained' color='primary'>
						Добавить заказ
					</Button>
				</Grid>
			</Grid>
			{loading && <p>Submitting...</p>}
			{error && <p>Error: {error.message}</p>}
		</form>
	)
}

export default AddOrderForm
