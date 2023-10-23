import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'

import { UserList } from './components/UserList'
import { type User } from './types'

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  const [sortByCountry, setSortByCountry] = useState(false)
  const originalUsers = useRef<User[]>([])
  const [filterCountry, setFilterCountry] = useState<string | null>(null)

  const toggleColors = () => {
    setShowColors(!showColors) 
  }

  const toggleSortByCountry = () => {
    setSortByCountry(prevState => !prevState)
  }

  const handleReset = () => {
    setUsers(originalUsers.current);
  }

  const handleDelete = (email: string) => {
    const filteredUsers = users.filter((user) => user.email !== email) 
    setUsers(filteredUsers)
    
  }


  useEffect(() =>{
    fetch('https://randomuser.me/api?results=100')
      .then(async res => await res.json())
      .then(res => {
        setUsers(res.results)
        originalUsers.current = res.results
      })
      .catch(err => {
        console.error(err)
      })
    }, [])
  
  const filteredUsers = useMemo(() =>{
    return filterCountry
      ? users.filter(user => {
        return user.location.country.toLowerCase().includes(filterCountry.toLowerCase())
      })
  : users
  }, [users, filterCountry]);
  
    
  const sortedUsers = useMemo(() => {
    return sortByCountry
      ? [...filteredUsers].sort((a, b) => {
          return a.location.country.localeCompare(b.location.country);
        })
      : filteredUsers
  }, [filteredUsers, sortByCountry]);
  
  


  return (
    <div className='App'>
      <h1>API PERSON</h1>
      <header>
        <button onClick={toggleColors}>
          Colorear files
        </button>

        <button onClick={toggleSortByCountry}>
          {sortByCountry ? 'No ordenar por pais' : 'Ordenar por pais'}
        </button>
        <button onClick={handleReset}>
          Resetear estado
        </button>
        <input type="text" placeholder='Filtra por pais' onChange={(e) => {
          setFilterCountry(e.target.value)
        }} />
      </header>

      <main>
      <UserList deleteUser={handleDelete} showColors = {showColors} users={sortedUsers} />
      </main>
    </div>
  )
}

export default App
