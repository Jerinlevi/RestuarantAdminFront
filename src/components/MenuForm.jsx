import { useEffect, useState } from 'react'
import { API_URL } from '../api/config'

const MenuForm = ({ editingItem, setEditingItem, refresh }) => {
  const [form, setForm] = useState({
    name: '',
    category: '',
    price: '',
    imageUrl:''
  })

  useEffect(() => {
    if (editingItem) {
      setForm(editingItem)
    }
  }, [editingItem])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const method = editingItem ? 'PUT' : 'POST'
    const url = editingItem
      ? `${API_URL}/menu/${editingItem._id}`
      : `${API_URL}/menu`

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })

    setForm({ name: '', category: '', price: '' ,imageUrl:''})
    setEditingItem(null)
    refresh()
    fetchMenu()
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
      <input name="category" placeholder="Category" value={form.category} onChange={handleChange} />
      <input name="price" placeholder="Price" value={form.price} onChange={handleChange} />
      <input
  name="imageUrl"
  placeholder="Image URL"
  value={form.imageUrl || ""}
  onChange={handleChange}
/>
      <button type="submit">{editingItem ? "Update" : "Add"} Item</button>
    </form>
  )
}

export default MenuForm