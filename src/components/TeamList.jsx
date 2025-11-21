import React, { useEffect, useState } from 'react'

const API = 'https://www.balldontlie.io/api/v1'

export default function TeamList({ onSelectTeam, selectedTeam }) {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    fetch(`${API}/teams`)
      .then((r) => r.json())
      .then((data) => {
        if (mounted) setTeams(data.data || data)
      })
      .catch((e) => console.error('Teams fetch error', e))
      .finally(() => mounted && setLoading(false))

    return () => { mounted = false }
  }, [])

  return (
    <div>
      <h2>Teams</h2>
      {loading && <div>Loading teams…</div>}
      <ul className="list">
        <li key="all" className={!selectedTeam ? 'active' : ''} onClick={() => onSelectTeam(null)}>
          All Players
        </li>
        {teams.map((t) => (
          <li key={t.id} className={selectedTeam && selectedTeam.id === t.id ? 'active' : ''} onClick={() => onSelectTeam(t)}>
            <strong>{t.abbreviation}</strong> — {t.full_name}
          </li>
        ))}
      </ul>
    </div>
  )
}
