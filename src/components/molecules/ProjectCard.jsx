import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
    >
      <div className="relative h-48 bg-gradient-to-br from-primary/10 to-accent/10 overflow-hidden">
        {project.image ? (
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ApperIcon name="TestTube" size={64} className="text-primary/40" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary transition-colors duration-200">
            {project.title}
          </h3>
          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
            {project.category}
          </span>
        </div>
        
        <p className="text-secondary mb-4 leading-relaxed">
          {project.description}
        </p>
        
        <div className="space-y-3 mb-6">
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Technologies:</h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, i) => (
                <span key={i} className="text-xs bg-surface text-secondary px-2 py-1 rounded-full">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Testing Tools:</h4>
            <div className="flex flex-wrap gap-2">
              {project.testingTools.map((tool, i) => (
                <span key={i} className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex gap-3">
          {project.link && (
            <Button
              variant="primary"
              size="sm"
              className="flex-1 text-sm"
              onClick={() => window.open(project.link, '_blank')}
            >
              <ApperIcon name="ExternalLink" size={16} className="mr-2" />
              View Project
            </Button>
          )}
          {project.github && (
            <Button
              variant="outline"
              size="sm"
              className="flex-1 text-sm"
              onClick={() => window.open(project.github, '_blank')}
            >
              <ApperIcon name="Github" size={16} className="mr-2" />
              Code
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default ProjectCard