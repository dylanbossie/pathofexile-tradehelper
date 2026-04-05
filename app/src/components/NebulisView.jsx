import { NEBULIS_SYNTH_IMPLICITS } from '../data/nebulisImplicits'

/**
 * NebulisView — dedicated view for the Nebulis trade use case.
 *
 * Renders all possible synthesised implicits as labeled checkboxes.
 * All checkboxes start unchecked.
 * The "Generate Trade Link" button is visible but inert (no handler yet —
 * that is implemented in a follow-up issue).
 */
function NebulisView() {
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
                defaultChecked={false}
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
