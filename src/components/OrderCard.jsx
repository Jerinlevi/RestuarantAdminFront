import { useState } from 'react'
import { API_URL } from '../api/config'
import './OrderCard.css'

const OrderCard = ({ order, refresh }) => {
  const [expanded, setExpanded] = useState(false)

  const updateStatus = async (status) => {
    await fetch(`${API_URL}/orders/${order._id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    })
    refresh()
  }

  return (
    <div className="order-card">
      <div className="order-header">
        <div>
          <strong>{order.orderNumber}</strong>
          <p>{order.customerName} • Table {order.tableNumber}</p>
        </div>

        <span className={`badge ${order.status}`}>
          {order.status}
        </span>
      </div>

      <p>Total: ₹{order.totalAmount}</p>

      <select
        value={order.status}
        onChange={(e) => updateStatus(e.target.value)}
      >
        <option>Pending</option>
        <option>Preparing</option>
        <option>Ready</option>
        <option>Delivered</option>
        <option>Cancelled</option>
      </select>

      <button onClick={() => setExpanded(!expanded)}>
        {expanded ? 'Hide Items' : 'View Items'}
      </button>

      {expanded && (
        <ul className="items">
          {order.items.map(item => (
            <li key={item._id}>
              {item.menuItem.name} × {item.quantity}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default OrderCard