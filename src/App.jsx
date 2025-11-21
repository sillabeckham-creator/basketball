import React, { useState } from 'react'
import TeamList from './components/TeamList'
import PlayerList from './components/PlayerList'
import PlayerDetail from './components/PlayerDetail'

export default function App() {
  const [selectedTeam, setSelectedTeam] = useState(null)
  const [selectedPlayer, setSelectedPlayer] = useState(null)

  return (
    <div className="app">
      <header className="header">
        <h1>NBA Stats — Teams & Players</h1>
      </header>
      <main className="main">
        <aside className="sidebar">
          <TeamList onSelectTeam={(t) => { setSelectedTeam(t); setSelectedPlayer(null); }} selectedTeam={selectedTeam} />
        </aside>
        <section className="content">
          <PlayerList
            team={selectedTeam}
            onSelectPlayer={(p) => setSelectedPlayer(p)}
          />
        </section>
        <aside className="detail">
          <PlayerDetail player={selectedPlayer} />
        </aside>
      </main>
    </div>
  )
}
