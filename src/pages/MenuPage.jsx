import { useEffect, useState } from "react"
import { useDebounce } from "../hooks/userDebounce"
import { API_URL } from "../api/config"
import MenuCard from "../components/MenuCard"
import MenuForm from "../components/MenuForm"
import "./MenPage.css"

const MenuPage = () => {
  const [menu, setMenu] = useState([])
  const [search, setSearch] = useState("")
  const debouncedSearch = useDebounce(search)

  const fetchMenu = async () => {
    const url = debouncedSearch
      ? `${API_URL}/menu/search?q=${debouncedSearch}`
      : `${API_URL}/menu`

    const res = await fetch(url)
    const data = await res.json()
    setMenu(data)
  }

  useEffect(() => {
    fetchMenu()
  }, [debouncedSearch])

  const deleteItem = async (id) => {
    await fetch(`${API_URL}/menu/${id}`, { method: "DELETE" })
    fetchMenu()
  }

  return (
    <div className="menu-page">
      <div className="menu-header">
        <h2>Menu Management</h2>
        <input
          className="search-input"
          placeholder="Search menu..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <MenuForm refresh={fetchMenu} />

      <div className="menu-grid">
        {menu.map(item => (
          <MenuCard
            key={item._id}
            item={item}
            menu={menu}
            setMenu={setMenu}
            onDelete={deleteItem}
          />
        ))}
      </div>
    </div>
  )
}

export default MenuPage