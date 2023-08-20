import { useEffect, useState } from 'react'
import './App.css'

import { UserList } from './components/UserList'
import { type User } from './types'

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  const [sortByCountry, setSortByCountry] = useState(false)

  const toggleColors = () => {
    setShowColors(!showColors) 
  }

  const toggleSortByCountry = () => {
    setSortByCountry(prevState => !prevState)
  }


  useEffect(() =>{
    fetch('https://randomuser.me/api?results=100')
      .then(async res => await res.json())
      .then(res => {
        setUsers(res.results)
      })
      .catch(err => {
        console.error(err)
      })
    }, [])
  
  const sortedUsers = sortByCountry
  ? [...users].sort((a, b) => {
    return a.location.country.localeCompare(b.location.country)
  })
  : users 


  return (
    <div className='App'>
      <h1>Prueba Tecnica</h1>
      <header>
        <button onClick={toggleColors}>
          Colorear files
        </button>

        <button onClick={toggleSortByCountry}>
          {sortByCountry ? 'No ordenar por pais' : 'Ordenar por pais'}
        </button>
      </header>

      <main>
      <UserList showColors = {showColors} users={sortedUsers} />
      </main>
    </div>
  )
}

export default App