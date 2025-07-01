import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const ExperienceItem = ({ experience, index, isLast }) => {
  return (
    <motion.div
      className="relative pl-8"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
    >
      {/* Timeline dot */}
      <div className="absolute left-0 top-0 w-4 h-4 bg-primary rounded-full border-4 border-white shadow-lg" />
      
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-2 top-4 w-0.5 h-full bg-gradient-to-b from-primary to-primary/20" />
      )}
      
      <div className="bg-white rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
          <h3 className="text-xl font-semibold text-gray-900">{experience.role}</h3>
          <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full font-medium mt-2 sm:mt-0 self-start">
            {experience.duration}
          </span>
        </div>
        
        <div className="flex items-center mb-4">
          <ApperIcon name="Building" size={16} className="text-secondary mr-2" />
          <p className="text-secondary font-medium">{experience.company}</p>
        </div>
        
        <p className="text-gray-700 mb-4 leading-relaxed">
          {experience.description}
        </p>
        
        {experience.achievements && experience.achievements.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Achievements:</h4>
            <ul className="space-y-2">
              {experience.achievements.map((achievement, i) => (
                <li key={i} className="flex items-start">
                  <ApperIcon name="CheckCircle" size={16} className="text-accent mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default ExperienceItem