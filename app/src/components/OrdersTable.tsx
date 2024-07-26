import { AgGridReact } from 'ag-grid-react'
import { ColDef } from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'

interface Order {
	id: string
	sequence: number
	orderNumber: string
	client: string
	manager: string
}

interface OrdersTableProps {
	orders: Order[]
}

const OrdersTable: React.FC<OrdersTableProps> = ({ orders }) => {
	const columnDefs: ColDef<Order>[] = [
		{ headerName: 'Очередность', field: 'sequence', flex: 1 },
		{ headerName: 'Номер заказа', field: 'orderNumber', flex: 1 },
		{ headerName: 'Клиент', field: 'client', flex: 1 },
		{ headerName: 'Ответственный менеджер', field: 'manager', flex: 1 },
	]

	return (
		<div className='ag-theme-alpine' style={{ width: '100%' }}>
			<AgGridReact
				columnDefs={columnDefs}
				rowData={orders}
				domLayout='autoHeight'
				suppressHorizontalScroll={true}
			/>
		</div>
	)
}

export default OrdersTable
