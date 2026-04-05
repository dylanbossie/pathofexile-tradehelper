import { useState } from 'react'
import { NEBULIS_SYNTH_IMPLICITS } from '../data/nebulisImplicits'

/**
 * NebulisView — dedicated view for the Nebulis trade use case.
 *
 * Renders all possible synthesised implicits as labeled checkboxes.
 * Selection state is tracked locally via useState.
 * The "Generate Trade Link" button is visible but inert (no handler yet —
 * that is implemented in a follow-up issue).
 */
function NebulisView() {
  const [selectedIds, setSelectedIds] = useState(new Set())

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

  return (
    <section aria-label="Nebulis">
      <h1>Nebulis</h1>
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
      <button type="button">Generate Trade Link</button>
    </section>
  )
}

export default NebulisView
