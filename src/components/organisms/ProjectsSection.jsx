import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ProjectCard from '@/components/molecules/ProjectCard'
import Button from '@/components/atoms/Button'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import projectsService from '@/services/api/projectsService'

const ProjectsSection = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('All')

  const categories = ['All', 'Web Testing', 'Mobile Testing', 'API Testing', 'Performance Testing']

const loadProjects = async (forceRefresh = false) => {
    try {
      setLoading(true)
      setError('')
      // Add slight delay for better UX, but allow immediate refresh when forced
      if (!forceRefresh) {
        await new Promise(resolve => setTimeout(resolve, 400))
      }
      const data = await projectsService.getAll()
      setProjects(data || [])
    } catch (err) {
      setError('Failed to load projects. Please try again.')
      // Auto-retry with force refresh on certain errors
      if (err.message?.includes('cache') || err.message?.includes('stale')) {
        setTimeout(() => loadProjects(true), 1000)
      }
    } finally {
      setLoading(false)
    }
  }

useEffect(() => {
    loadProjects()
    
    // Set up periodic refresh to catch external changes
    const refreshInterval = setInterval(() => {
      loadProjects(true)
    }, 30000) // Refresh every 30 seconds
    
    return () => clearInterval(refreshInterval)
  }, [])

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(project => project.category === filter)

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-lg text-secondary max-w-3xl mx-auto leading-relaxed">
            Explore my portfolio of testing projects that demonstrate expertise across 
            various platforms, technologies, and testing methodologies.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={filter === category ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setFilter(category)}
              className="transition-all duration-200"
            >
              {category}
            </Button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {loading && <Loading type="projects" />}
          
          {error && (
            <Error 
              message={error}
              onRetry={loadProjects}
            />
          )}
          
          {!loading && !error && filteredProjects.length === 0 && (
            <Empty 
              title="No Projects Found"
              description={filter === 'All' 
                ? "No projects are currently available." 
                : `No projects found in the "${filter}" category.`
              }
              icon="FolderOpen"
            />
          )}
          
          {!loading && !error && filteredProjects.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.Id} project={project} index={index} />
              ))}
            </div>
          )}
        </motion.div>

        {/* Call to Action */}
        {!loading && !error && projects.length > 0 && (
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <p className="text-secondary mb-6">
              Interested in seeing more of my work or discussing a project?
            </p>
            <Button
              variant="outline"
              size="lg"
              onClick={() => document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' })}
            >
              Let's Connect
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default ProjectsSection