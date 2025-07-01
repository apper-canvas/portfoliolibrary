import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Footer = () => {
  const socialLinks = [
    { name: 'LinkedIn', icon: 'Linkedin', href: 'https://linkedin.com/in/sarahjohnsonqa' },
    { name: 'GitHub', icon: 'Github', href: 'https://github.com/sarahjohnsonqa' },
    { name: 'Twitter', icon: 'Twitter', href: 'https://twitter.com/sarahjohnsonqa' },
    { name: 'Email', icon: 'Mail', href: 'mailto:sarah.johnson@email.com' }
  ]

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Resume', href: '#resume' },
    { name: 'Contact', href: '#contact' }
  ]

  const handleLinkClick = (href) => {
    if (href.startsWith('#')) {
      document.querySelector(href).scrollIntoView({ behavior: 'smooth' })
    } else {
      window.open(href, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand & Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <ApperIcon name="TestTube" size={20} className="text-white" />
              </div>
              <span className="text-xl font-bold">Sarah Johnson</span>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              Quality Assurance Engineer passionate about delivering exceptional 
              software experiences through comprehensive testing strategies and 
              continuous improvement.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <motion.button
                  key={link.name}
                  onClick={() => handleLinkClick(link.href)}
                  className="w-10 h-10 bg-gray-800 hover:bg-primary rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                  whileHover={{ y: -2 }}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  aria-label={link.name}
                >
                  <ApperIcon name={link.icon} size={18} />
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={link.name}>
                  <motion.button
                    onClick={() => handleLinkClick(link.href)}
                    className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center group"
                    whileHover={{ x: 5 }}
                  >
                    <ApperIcon 
                      name="ChevronRight" 
                      size={16} 
                      className="mr-2 group-hover:text-primary transition-colors duration-200" 
                    />
                    {link.name}
                  </motion.button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-lg font-semibold mb-6">Get in Touch</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <ApperIcon name="Mail" size={18} className="text-primary" />
                <span className="text-gray-400">sarah.johnson@email.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <ApperIcon name="Phone" size={18} className="text-primary" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <ApperIcon name="MapPin" size={18} className="text-primary" />
                <span className="text-gray-400">San Francisco, CA</span>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg">
              <p className="text-sm text-gray-300 mb-2">Available for:</p>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Full-time opportunities</li>
                <li>• Contract projects</li>
                <li>• Consulting services</li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Sarah Johnson. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 text-sm text-gray-400">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hover:text-white transition-colors duration-200 flex items-center"
            >
              <ApperIcon name="ArrowUp" size={16} className="mr-1" />
              Back to Top
            </button>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer