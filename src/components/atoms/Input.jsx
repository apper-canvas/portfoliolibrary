import { forwardRef } from 'react'

const Input = forwardRef(({ 
  label,
  error,
  className = '',
  type = 'text',
  ...props 
}, ref) => {
  const baseClasses = "w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 outline-none"
  const errorClasses = error ? "border-error focus:border-error focus:ring-error/20" : ""
  
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        className={`${baseClasses} ${errorClasses} ${className}`}
        {...props}
      />
      {error && (
        <p className="text-sm text-error">{error}</p>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input