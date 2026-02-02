import { API_URL } from "../api/config"
import "./MenuCard.css"

const MenuCard = ({ item, menu, setMenu, onDelete }) => {
  const toggleAvailability = async () => {
    const prev = [...menu]

    setMenu(menu =>
      menu.map(m =>
        m._id === item._id
          ? { ...m, isAvailable: !m.isAvailable }
          : m
      )
    )

    try {
      await fetch(`${API_URL}/menu/${item._id}/availability`, {
        method: "PATCH"
      })
    } catch {
      setMenu(prev)
    }
  }

  return (
    <div className="menu-card">
      <img src={item.imageUrl} alt={item.name} />

      <h4>{item.name}</h4>
      <p className="price">₹{item.price}</p>

      <span className={item.isAvailable ? "available" : "unavailable"}>
        {item.isAvailable ? "Available" : "Unavailable"}
      </span>

      <div className="actions">
        <button onClick={toggleAvailability}>Toggle</button>
        <button onClick={() => onDelete(item._id)}>Delete</button>
      </div>
    </div>
  )
}

export default MenuCard