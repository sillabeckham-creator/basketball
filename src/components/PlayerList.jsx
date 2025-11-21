import React, { useEffect, useState } from 'react'

const API = 'https://www.balldontlie.io/api/v1'

export default function PlayerList({ team, onSelectPlayer }) {
  const [players, setPlayers] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [perPage] = useState(25)
  const [search, setSearch] = useState('')

  useEffect(() => {
    setPage(1)
  }, [team])

  useEffect(() => {
    let mounted = true
    setLoading(true)
    const params = new URLSearchParams()
    params.set('per_page', perPage)
    params.set('page', page)
    if (search) params.set('search', search)
    if (team) params.append('team_ids[]', team.id)

    fetch(`${API}/players?${params.toString()}`)
      .then((r) => r.json())
      .then((data) => {
        if (mounted) setPlayers(data.data || [])
      })
      .catch((e) => console.error('Players fetch error', e))
      .finally(() => mounted && setLoading(false))

    return () => { mounted = false }
  }, [team, page, perPage, search])

  return (
    <div>
      <div className="player-header">
        <h2>{team ? `${team.full_name} Players` : 'All Players'}</h2>
        <div>
          <input
            placeholder="Search players by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div>Loading players…</div>
      ) : (
        <ul className="list players">
          {players.map((p) => (
            <li key={p.id} onClick={() => onSelectPlayer(p)}>
              <div className="player-row">
                <div>
                  <strong>{p.first_name} {p.last_name}</strong>
                  <div className="meta">{p.team ? p.team.abbreviation : ''} • {p.position || 'N/A'}</div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="pagination">
        <button onClick={() => setPage((s) => Math.max(1, s - 1))}>Prev</button>
        <span>Page {page}</span>
        <button onClick={() => setPage((s) => s + 1)}>Next</button>
      </div>
    </div>
  )
}
