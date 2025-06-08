import React, { useState } from 'react'

const DropDownContainer = ({label = 'Select', options = [], onSelect}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState('')


  // * FUNCTIONS

  const handleSelect = (option) => {
    setSelected(option)
    onSelect(option)
    setIsOpen(false)
  }

  // * RENDER
  return (
    <div className='relative inline-block text-left'>
      <button
      onClick={() => setIsOpen((prev) => !prev)}
      className='w-full bg-gray-700 text-white px-3 py-2 rounded text-sm m-1'
      >
        {selected || label}
      </button>
      
      {isOpen && (
        <ul className='absolute z-10 mt-1 w-full bg-gray border border-gray-700 rounded shadow overflow-y-auto max-h-50'>
          {options.map((option, index) => (
            <li key={index}
            onClick={() => handleSelect(option)}
            className='px-3 py-2 text-sm hover:bg-purple-700 cursor-pointer bg-gray-900'
            >
              {option}
            </li>
          ))}

        </ul>
      )}

    </div>
  )
}

export default DropDownContainer