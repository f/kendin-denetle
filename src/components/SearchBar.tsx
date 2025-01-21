import { ChangeEvent } from 'react'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

const SearchBar = ({ value, onChange, placeholder = 'Kontrol listelerinde ara...' }: SearchBarProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      onChange('')
    }
  }

  return (
    <div className="relative w-full" role="search">
      <label htmlFor="search-input" className="sr-only">
        Kontrol listelerinde ara
      </label>
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none" aria-hidden="true">
        <i className="fas fa-search text-gray-400" />
      </div>
      <input
        id="search-input"
        type="search"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/20"
        aria-label="Kontrol listelerinde ara"
        aria-describedby="search-description"
        autoComplete="off"
        spellCheck="false"
      />
      <span id="search-description" className="sr-only">
        Kontrol listelerinde arama yapmak için yazın. Aramayı temizlemek için ESC tuşuna basın.
      </span>
    </div>
  )
}

export default SearchBar
