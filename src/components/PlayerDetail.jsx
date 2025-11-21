import React, { useEffect, useState } from 'react'

const API = 'https://www.balldontlie.io/api/v1'

export default function PlayerDetail({ player }) {
  const [averages, setAverages] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!player) return
    setLoading(true)
    setAverages(null)
    // fetch season averages for latest season (example: 2024)
    const season = new Date().getFullYear() - 1
    fetch(`${API}/season_averages?season=${season}&player_ids[]=${player.id}`)
      .then((r) => r.json())
      .then((data) => {
        setAverages((data.data && data.data[0]) || null)
      })
      .catch((e) => console.error('Averages fetch error', e))
      .finally(() => setLoading(false))
  }, [player])

  if (!player) return <div>Select a player to see details</div>

  return (
    <div>
      <h3>{player.first_name} {player.last_name}</h3>
      <div className="meta">{player.team ? player.team.full_name : ''} • {player.position || 'N/A'}</div>

      {loading ? (
        <div>Loading averages…</div>
      ) : averages ? (
        <div className="stats">
          <div><strong>PTS:</strong> {averages.pts}</div>
          <div><strong>REB:</strong> {averages.reb}</div>
          <div><strong>AST:</strong> {averages.ast}</div>
          <div><strong>STL:</strong> {averages.stl}</div>
          <div><strong>BLK:</strong> {averages.blk}</div>
          <div><strong>FG%:</strong> {averages.fg_pct !== null ? averages.fg_pct : 'N/A'}</div>
          <div><strong>3P%:</strong> {averages.fg3_pct !== null ? averages.fg3_pct : 'N/A'}</div>
          <div><strong>FT%:</strong> {averages.ft_pct !== null ? averages.ft_pct : 'N/A'}</div>
        </div>
      ) : (
        <div>No season averages available for the most recent season.</div>
      )}
    </div>
  )
}
