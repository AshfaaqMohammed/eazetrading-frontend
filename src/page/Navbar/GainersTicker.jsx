import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getTop50CoinList } from '@/State/Coin/Action'
import './GainersTicker.css'

const GainersTicker = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { coin } = useSelector((store) => store)

  useEffect(() => {
    // Fetch once if the list isn't already populated (Home may have loaded it).
    if (!coin.top50 || coin.top50.length === 0) {
      dispatch(getTop50CoinList())
    }
  }, [dispatch])

  // Top 10 gainers by 24h % change, sorted high -> low.
  const gainers = useMemo(() => {
    return [...(coin.top50 || [])]
      .filter((c) => c?.price_change_percentage_24h != null)
      .sort(
        (a, b) =>
          b.price_change_percentage_24h - a.price_change_percentage_24h
      )
      .slice(0, 10)
  }, [coin.top50])

  // Nothing to show yet — render nothing so we don't reserve empty space.
  if (gainers.length === 0) return null

  // Duplicate the list so the CSS -50% translate loops seamlessly.
  const items = [...gainers, ...gainers]

  return (
    <div
      className='ticker-viewport border-b border-gray-800 bg-[#0b0f17] text-white'
      style={{ height: 38 }}
      role='marquee'
      aria-label='Top 10 gaining coins in the last 24 hours'
    >
      <div className='ticker-track h-full'>
        {items.map((c, i) => {
          const pct = c.price_change_percentage_24h
          const up = pct >= 0
          const rank = (i % gainers.length) + 1
          return (
            <span
              key={`${c.id}-${i}`}
              className='ticker-item'
              onClick={() => navigate(`/market/${c.id}`)}
              title={c.name}
            >
              <span className='ticker-rank'>#{rank}</span>
              <img
                src={c.image}
                alt=''
                className='h-4 w-4 rounded-full'
                loading='lazy'
              />
              <span>{c.symbol?.toUpperCase()}</span>
              <span className={up ? 'ticker-up' : 'ticker-down'}>
                {up ? '\u25B2' : '\u25BC'}
                {Math.abs(pct).toFixed(2)}%
              </span>
            </span>
          )
        })}
      </div>
    </div>
  )
}

export default GainersTicker
