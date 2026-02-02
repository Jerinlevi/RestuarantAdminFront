import { useEffect, useState } from 'react'
import OrderCard from '../components/OrderCard'
import { API_URL } from '../api/config'
import './OrdersPage.css'

const OrdersPage = () => {
  const [orders, setOrders] = useState([])
  const [statusFilter, setStatusFilter] = useState('')

  const fetchOrders = async () => {
    const url = statusFilter
      ? `${API_URL}/orders?status=${statusFilter}`
      : `${API_URL}/orders`

    const res = await fetch(url)
    const data = await res.json()
    setOrders(data)
  }

  useEffect(() => {
    fetchOrders()
  }, [statusFilter])

  return (
    <div className="orders-page">
      <h2>Orders Dashboard</h2>

      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="">All</option>
        <option value="Pending">Pending</option>
        <option value="Preparing">Preparing</option>
        <option value="Ready">Ready</option>
        <option value="Delivered">Delivered</option>
        <option value="Cancelled">Cancelled</option>
      </select>

      <div className="orders-list">
        {orders.map(order => (
          <OrderCard
            key={order._id}
            order={order}
            refresh={fetchOrders}
          />
        ))}
      </div>
    </div>
  )
}

export default OrdersPage