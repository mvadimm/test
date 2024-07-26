import { useQuery, gql } from '@apollo/client'
import OrdersTable from './components/OrdersTable'
import States from './components/States'
import { Typography } from '@mui/material'

const GET_ORDERS = gql`
	query GetOrders {
		orders {
			id
			sequence
			orderNumber
			client
			manager
		}
	}
`

const App = () => {
	const { data, refetch } = useQuery(GET_ORDERS)

	const handleOrderAdded = () => {
		refetch()
	}

	return (
		<div style={{ padding: '20px' }}>
			<Typography variant='h5'>Продажи</Typography>
			<States onOrderAdded={handleOrderAdded} />
			<OrdersTable orders={data ? data.orders : []} />
		</div>
	)
}

export default App
