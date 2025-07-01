import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const SkillCard = ({ skill, index }) => {
  const getIconName = (skillName) => {
    const iconMap = {
      'Manual Testing': 'TestTube',
      'Automation Testing': 'Bot',
      'API Testing': 'Network',
      'Performance Testing': 'Gauge',
      'Security Testing': 'Shield',
      'Mobile Testing': 'Smartphone',
      'Selenium': 'Code',
      'Cypress': 'Circle',
      'Jest': 'Check',
      'Postman': 'Send',
      'JIRA': 'Bug',
      'TestRail': 'List',
      'SQL': 'Database',
      'Python': 'FileCode',
      'JavaScript': 'Braces',
      'Java': 'Coffee'
    }
    return iconMap[skillName] || 'Zap'
  }

  return (
    <motion.div
      className="bg-white rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -4 }}
    >
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center group-hover:from-primary/30 group-hover:to-accent/30 transition-all duration-300">
            <ApperIcon name={getIconName(skill.name)} size={24} className="text-primary" />
          </div>
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{skill.name}</h3>
          <p className="text-sm text-secondary">{skill.category}</p>
        </div>
        <div className="flex-shrink-0">
          <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${skill.proficiency}%` }}
              transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
            />
          </div>
          <p className="text-xs text-secondary mt-1 text-center">{skill.proficiency}%</p>
        </div>
      </div>
    </motion.div>
  )
}

export default SkillCard