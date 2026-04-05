import { useState } from 'react'
import { NEBULIS_SYNTH_IMPLICITS } from '../data/nebulisImplicits'
import nebulisImage from '../assets/nebulis.png'

/**
 * NebulisView — dedicated view for the Nebulis trade use case.
 *
 * Renders all possible synthesised implicits as labeled checkboxes.
 * Selection state is tracked locally via useState.
 * The "Generate Trade Link" button builds a PoE trade count query payload
 * from the selected implicits and displays it below the button.
 */
function NebulisView() {
  const [selectedIds, setSelectedIds] = useState(new Set())
  const [generatedQuery, setGeneratedQuery] = useState(null)

  function handleChange(id, checked) {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (checked) {
        next.add(id)
      } else {
        next.delete(id)
      }
      return next
    })
  }

  function handleGenerateTradeLink() {
    if (selectedIds.size === 0) {
      return
    }

    const filters = Array.from(selectedIds).map((id) => ({
      id: `implicit.stat_${id}`,
    }))

    const min = Math.min(3, selectedIds.size)

    const payload = {
      query: {
        stats: [
          {
            type: 'count',
            filters,
            value: { min },
          },
        ],
      },
    }

    setGeneratedQuery(JSON.stringify(payload, null, 2))
  }

  return (
    <section aria-label="Nebulis">
      <h1>Nebulis</h1>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
        <div>
          <h2>Synth Implicits</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {NEBULIS_SYNTH_IMPLICITS.map((implicit) => (
              <li key={implicit.id}>
                <label>
                  <input
                    type="checkbox"
                    id={implicit.id}
                    name={implicit.id}
                    checked={selectedIds.has(implicit.id)}
                    onChange={(e) => handleChange(implicit.id, e.target.checked)}
                  />
                  {' '}
                  {implicit.label}
                </label>
              </li>
            ))}
          </ul>
          <button type="button" onClick={handleGenerateTradeLink}>Generate Trade Link</button>
          {generatedQuery !== null && (
            <section aria-label="Generated Trade Query">
              <pre>{generatedQuery}</pre>
            </section>
          )}
        </div>
        <img
          src={nebulisImage}
          alt="Nebulis"
          width={156}
          style={{ flexShrink: 0 }}
        />
      </div>
    </section>
  )
}

export default NebulisView
