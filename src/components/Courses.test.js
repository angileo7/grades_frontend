import { render, screen } from '@testing-library/react'
import Courses from './Courses'

describe('Logo', () => {
    it('renders appropriately', () => {
        render(<Courses />)
        expect(screen.getByText(/Courses/i)).toBeInTheDocument()
    })
})