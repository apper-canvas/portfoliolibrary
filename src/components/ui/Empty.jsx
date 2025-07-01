import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const Empty = ({ 
  title = "No items found", 
  description = "There are no items to display at the moment.",
  actionText,
  onAction,
  icon = "Inbox"
}) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-16 px-4"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-full p-8 mb-6">
        <ApperIcon 
          name={icon} 
          size={64} 
          className="text-primary"
        />
      </div>
      
      <h3 className="text-2xl font-semibold text-gray-900 mb-3">
        {title}
      </h3>
      
      <p className="text-secondary text-center mb-8 max-w-md">
        {description}
      </p>
      
      {actionText && onAction && (
        <Button
          onClick={onAction}
          className="flex items-center gap-2"
        >
          <ApperIcon name="Plus" size={16} />
          {actionText}
        </Button>
      )}
    </motion.div>
  )
}

export default Empty