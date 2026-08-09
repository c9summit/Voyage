import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { HubConnectionBuilder, HubConnectionState, type HubConnection } from '@microsoft/signalr'
import { getLeaderboard, type LeaderboardEntry } from '../api'
import { useAuthStore } from '../store/useAuthStore'
import './Leaderboard.css'

export default function Leaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [live, setLive] = useState(false)
  const connectionRef = useRef<HubConnection | null>(null)

  async function refresh() {
    try {
      const data = await getLeaderboard()
      setEntries(data)
    } catch (err) {
      console.error('Failed to load leaderboard', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refresh()

    const connection = new HubConnectionBuilder()
      .withUrl('http://127.0.0.1:5000/hubs/leaderboard', {
        accessTokenFactory: () => useAuthStore.getState().token ?? '',
      })
      .withAutomaticReconnect()
      .build()

    connection.on('LeaderboardUpdated', () => {
      refresh()
    })

    connection.onreconnected(() => setLive(true))
    connection.onreconnecting(() => setLive(false))
    connection.onclose(() => setLive(false))

    connection
      .start()
      .then(() => setLive(true))
      .catch((err) => console.error('SignalR connection failed', err))

    connectionRef.current = connection

    return () => {
      if (connectionRef.current?.state === HubConnectionState.Connected) {
        connectionRef.current.stop()
      }
    }
  }, [])

  return (
    <div className="leaderboard-page">
      <div className="leaderboard-page__card">
        <div className="leaderboard-page__header">
          <h1 className="leaderboard-page__title">The Fellowship's Ledger</h1>
          <span className={`leaderboard-page__status ${live ? 'is-live' : ''}`}>
            {live ? '● Live' : '○ Connecting...'}
          </span>
        </div>

        {loading ? (
          <p className="leaderboard-page__loading">Consulting the ledger...</p>
        ) : (
          <table className="leaderboard-page__table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Traveller</th>
                <th>Lands Charted</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, i) => (
                <tr key={entry.displayName}>
                  <td>{i + 1}</td>
                  <td>{entry.displayName}</td>
                  <td>{entry.countriesVisited}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <Link to="/map" className="leaderboard-page__back">
          ← Back to the Map
        </Link>
      </div>
    </div>
  )
}