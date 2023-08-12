import { useEffect, useState } from 'react'
import './App.css'
import { type User } from './types.d'
import { UserLists } from './components/UserList'

function App() {
  const [users, setUsers] = useState<User[]>([])
  useEffect(() =>{
    fetch('https://randomuser.me/api?results=100')
      .then(async res => await res.json())
      .then(res => {
        setUsers(res.results)
      })
      .catch(err => {
        console.error(err)
      })
  })
  

  return (
    <div className='App'>
      <h1>Prueba Tecnica</h1>
      <UserLists users={users} />
    </div>
  )
}

export default App
