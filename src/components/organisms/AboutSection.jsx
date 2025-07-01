import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import SkillCard from "@/components/molecules/SkillCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ui/ApperIcon";
import skillsService from "@/services/api/skillsService";

const AboutSection = () => {
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadSkills = async () => {
    try {
      setLoading(true)
      setError('')
      await new Promise(resolve => setTimeout(resolve, 300))
      const data = await skillsService.getAll()
      setSkills(data)
    } catch (err) {
      setError('Failed to load skills. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadSkills()
  }, [])

  const stats = [
    { number: "5+", label: "Years Experience", icon: "Calendar" },
    { number: "150+", label: "Projects Tested", icon: "TestTube" },
    { number: "99.9%", label: "Bug Detection Rate", icon: "Target" },
    { number: "50+", label: "Tools Mastered", icon: "Wrench" }
  ]

  return (
    <section id="about" className="py-20 bg-surface">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About <span className="text-gradient">Me</span>
          </h2>
          <p className="text-lg text-secondary max-w-3xl mx-auto leading-relaxed">
            With over 5 years of experience in software quality assurance, I specialize in 
            creating comprehensive testing strategies that ensure exceptional user experiences. 
            My passion lies in breaking things to make them better.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl p-6 text-center shadow-card hover:shadow-card-hover transition-all duration-300"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <motion.div
                  initial={{ rotate: 0 }}
                  whileHover={{ rotate: 15 }}
                  className="text-primary"
                >
                  <ApperIcon name={stat.icon} size={24} />
                </motion.div>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-primary mb-2">{stat.number}</h3>
              <p className="text-secondary font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
            Technical <span className="text-gradient">Expertise</span>
          </h3>
          
          {loading && <Loading />}
          
          {error && (
            <Error 
              message={error}
              onRetry={loadSkills}
            />
          )}
          
          {!loading && !error && skills.length === 0 && (
            <Empty 
              title="No Skills Found"
              description="Skills data is currently unavailable."
              icon="Zap"
            />
          )}
          
          {!loading && !error && skills.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((skill, index) => (
                <SkillCard key={skill.Id} skill={skill} index={index} />
              ))}
            </div>
          )}
        </motion.div>

        {/* Personal Statement */}
        <motion.div
          className="mt-16 bg-white rounded-2xl p-8 md:p-12 shadow-card"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">My Approach to Quality</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-secondary leading-relaxed mb-4">
                  I believe that quality assurance is not just about finding bugs—it's about 
                  understanding user needs, preventing issues before they occur, and ensuring 
                  that every release exceeds expectations.
                </p>
                <p className="text-secondary leading-relaxed">
                  My methodology combines thorough manual testing with cutting-edge automation 
                  tools to create robust testing frameworks that scale with your product.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Core Values:</h4>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <ApperIcon name="CheckCircle" size={16} className="text-accent mr-3" />
                    <span className="text-secondary">Attention to Detail</span>
                  </li>
                  <li className="flex items-center">
                    <ApperIcon name="CheckCircle" size={16} className="text-accent mr-3" />
                    <span className="text-secondary">Continuous Learning</span>
                  </li>
                  <li className="flex items-center">
                    <ApperIcon name="CheckCircle" size={16} className="text-accent mr-3" />
                    <span className="text-secondary">Team Collaboration</span>
                  </li>
                  <li className="flex items-center">
                    <ApperIcon name="CheckCircle" size={16} className="text-accent mr-3" />
                    <span className="text-secondary">User-Centric Mindset</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default AboutSection