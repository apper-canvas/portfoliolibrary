import { useState, useEffect, useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSelector } from 'react-redux'
import ApperIcon from '@/components/ApperIcon'
import NavigationLink from '@/components/molecules/NavigationLink'
import Button from '@/components/atoms/Button'
import { AuthContext } from '../../App'
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const { logout } = useContext(AuthContext)
  const { isAuthenticated } = useSelector((state) => state.user)
  const navigationItems = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Projects' },
    { href: '#resume', label: 'Resume' },
    { href: '#contact', label: 'Contact' }
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      
      // Update active section based on scroll position
      const sections = ['home', 'about', 'projects', 'resume', 'contact']
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      
      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'glass-effect shadow-lg' : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <ApperIcon name="TestTube" size={20} className="text-white" />
              </div>
              <span className="text-xl font-bold text-gradient">QA Pro</span>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navigationItems.map((item) => (
                <NavigationLink
                  key={item.href}
                  href={item.href}
                  isActive={activeSection === item.href.substring(1)}
                >
                  {item.label}
                </NavigationLink>
              ))}
            </nav>

{/* CTA Button */}
            <div className="hidden md:block">
              {isAuthenticated ? (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={logout}
                >
                  Logout
                </Button>
              ) : (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' })}
                >
                  Hire Me
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              onClick={handleMobileMenuToggle}
              aria-label="Toggle mobile menu"
            >
              <ApperIcon 
                name={isMobileMenuOpen ? "X" : "Menu"} 
                size={24} 
                className="text-gray-700"
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div 
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={closeMobileMenu}
            />
            <motion.div
              className="absolute top-16 left-0 right-0 bg-white shadow-xl rounded-b-2xl"
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <nav className="px-4 py-6 space-y-2">
                {navigationItems.map((item) => (
                  <NavigationLink
                    key={item.href}
                    href={item.href}
                    isActive={activeSection === item.href.substring(1)}
                    mobile={true}
                    onClick={closeMobileMenu}
                  >
                    {item.label}
                  </NavigationLink>
                ))}
<div className="pt-4 border-t border-gray-200">
                  {isAuthenticated ? (
                    <Button
                      variant="primary"
                      className="w-full"
                      onClick={() => {
                        logout()
                        closeMobileMenu()
                      }}
                    >
                      Logout
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      className="w-full"
                      onClick={() => {
                        document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' })
                        closeMobileMenu()
                      }}
                    >
                      Hire Me
                    </Button>
                  )}
                </div>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Header