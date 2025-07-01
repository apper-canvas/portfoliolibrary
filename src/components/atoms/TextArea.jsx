import { forwardRef } from 'react'

const TextArea = forwardRef(({ 
  label,
  error,
  className = '',
  rows = 4,
  ...props 
}, ref) => {
  const baseClasses = "w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 outline-none resize-vertical"
  const errorClasses = error ? "border-error focus:border-error focus:ring-error/20" : ""
  
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        rows={rows}
        className={`${baseClasses} ${errorClasses} ${className}`}
        {...props}
      />
      {error && (
        <p className="text-sm text-error">{error}</p>
      )}
    </div>
  )
})

TextArea.displayName = 'TextArea'

export default TextArea