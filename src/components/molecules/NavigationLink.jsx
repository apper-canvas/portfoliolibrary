import { motion } from 'framer-motion'

const NavigationLink = ({ href, children, isActive, onClick, mobile = false }) => {
  const handleClick = (e) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    if (onClick) onClick()
  }

  const baseClasses = mobile 
    ? "block px-3 py-2 text-base font-medium transition-colors duration-200"
    : "px-4 py-2 text-sm font-medium transition-colors duration-200 relative"

  const activeClasses = mobile
    ? "text-primary bg-primary/10 rounded-lg"
    : "text-primary"

  const inactiveClasses = mobile
    ? "text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg"
    : "text-gray-700 hover:text-primary"

  return (
    <motion.a
      href={href}
      onClick={handleClick}
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
      whileHover={{ scale: mobile ? 1 : 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
      {!mobile && isActive && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
          layoutId="activeIndicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.a>
  )
}

export default NavigationLink