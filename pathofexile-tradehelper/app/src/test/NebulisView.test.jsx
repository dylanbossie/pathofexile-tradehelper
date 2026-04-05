import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import NebulisView from '../components/NebulisView'
import { NEBULIS_SYNTH_IMPLICITS } from '../data/nebulisImplicits'

describe('NebulisView — acceptance criteria', () => {
  it('renders a dedicated Nebulis view', () => {
    render(<NebulisView />)
    expect(screen.getByRole('region', { name: /nebulis/i })).toBeInTheDocument()
  })

  it('lists all synth implicits as checkboxes', () => {
    render(<NebulisView />)
    const checkboxes = screen.getAllByRole('checkbox')
    expect(checkboxes.length).toBe(NEBULIS_SYNTH_IMPLICITS.length)
    expect(NEBULIS_SYNTH_IMPLICITS.length).toBeGreaterThan(0)
  })

  it('each checkbox has a visible label matching the implicit name', () => {
    render(<NebulisView />)
    NEBULIS_SYNTH_IMPLICITS.forEach((implicit) => {
      expect(screen.getByLabelText(implicit.label)).toBeInTheDocument()
    })
  })

  it('all checkboxes start unchecked', () => {
    render(<NebulisView />)
    const checkboxes = screen.getAllByRole('checkbox')
    checkboxes.forEach((checkbox) => {
      expect(checkbox).not.toBeChecked()
    })
  })

  it('renders a "Generate Trade Link" button', () => {
    render(<NebulisView />)
    expect(
      screen.getByRole('button', { name: /generate trade link/i })
    ).toBeInTheDocument()
  })

  it('"Generate Trade Link" button does not navigate or throw when clicked (inert)', () => {
    render(<NebulisView />)
    const button = screen.getByRole('button', { name: /generate trade link/i })
    // Should not throw
    expect(() => button.click()).not.toThrow()
  })
})

describe('NEBULIS_SYNTH_IMPLICITS data', () => {
  it('is a non-empty array', () => {
    expect(Array.isArray(NEBULIS_SYNTH_IMPLICITS)).toBe(true)
    expect(NEBULIS_SYNTH_IMPLICITS.length).toBeGreaterThan(0)
  })

  it('each entry has an id and label', () => {
    NEBULIS_SYNTH_IMPLICITS.forEach((implicit) => {
      expect(typeof implicit.id).toBe('string')
      expect(implicit.id.length).toBeGreaterThan(0)
      expect(typeof implicit.label).toBe('string')
      expect(implicit.label.length).toBeGreaterThan(0)
    })
  })

  it('all ids are unique', () => {
    const ids = NEBULIS_SYNTH_IMPLICITS.map((i) => i.id)
    const uniqueIds = new Set(ids)
    expect(uniqueIds.size).toBe(ids.length)
  })
})
