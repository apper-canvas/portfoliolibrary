import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ExperienceItem from '@/components/molecules/ExperienceItem'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import experienceService from '@/services/api/experienceService'

const ResumeSection = () => {
  const [experiences, setExperiences] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadExperiences = async () => {
    try {
      setLoading(true)
      setError('')
      await new Promise(resolve => setTimeout(resolve, 300))
      const data = await experienceService.getAll()
      setExperiences(data)
    } catch (err) {
      setError('Failed to load experience data. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadExperiences()
  }, [])

  const handleDownloadResume = () => {
    // In a real application, this would download the actual resume
    const link = document.createElement('a')
    link.href = '/resume.pdf'
    link.download = 'Sarah_Johnson_QA_Resume.pdf'
    link.click()
  }

  const education = [
    {
      degree: "Bachelor of Science in Computer Science",
      school: "University of Technology",
      year: "2018",
      details: "Specialized in Software Engineering and Quality Assurance"
    },
    {
      degree: "ISTQB Certified Tester",
      school: "International Software Testing Qualifications Board",
      year: "2020",
      details: "Foundation Level Certification"
    }
  ]

  return (
    <section id="resume" className="py-20 bg-surface">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            My <span className="text-gradient">Journey</span>
          </h2>
          <p className="text-lg text-secondary max-w-3xl mx-auto leading-relaxed mb-8">
            A comprehensive overview of my professional experience, education, and career progression 
            in quality assurance and software testing.
          </p>
          <Button
            variant="primary"
            size="lg"
            onClick={handleDownloadResume}
            className="flex items-center gap-2 mx-auto"
          >
            <ApperIcon name="Download" size={20} />
            Download Full Resume
          </Button>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Experience Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 flex items-center">
              <ApperIcon name="Briefcase" size={28} className="text-primary mr-3" />
              Professional Experience
            </h3>
            
            {loading && <Loading />}
            
            {error && (
              <Error 
                message={error}
                onRetry={loadExperiences}
              />
            )}
            
            {!loading && !error && experiences.length === 0 && (
              <Empty 
                title="No Experience Found"
                description="Experience data is currently unavailable."
                icon="Briefcase"
              />
            )}
            
            {!loading && !error && experiences.length > 0 && (
              <div className="relative">
                {experiences.map((experience, index) => (
                  <ExperienceItem 
                    key={experience.Id} 
                    experience={experience} 
                    index={index}
                    isLast={index === experiences.length - 1}
                  />
                ))}
              </div>
            )}
          </motion.div>

          {/* Education & Certifications */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 flex items-center">
              <ApperIcon name="GraduationCap" size={28} className="text-primary mr-3" />
              Education & Certifications
            </h3>
            
            <div className="space-y-6">
              {education.map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="text-lg font-semibold text-gray-900">{item.degree}</h4>
                    <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                      {item.year}
                    </span>
                  </div>
                  <p className="text-secondary font-medium mb-2">{item.school}</p>
                  <p className="text-sm text-gray-600">{item.details}</p>
                </motion.div>
              ))}
            </div>

            {/* Skills Summary */}
            <div className="mt-12">
              <h4 className="text-xl font-bold text-gray-900 mb-6">Core Competencies</h4>
              <div className="grid grid-cols-2 gap-4">
                {[
                  "Test Planning & Strategy",
                  "Manual Testing",
                  "Test Automation",
                  "API Testing",
                  "Performance Testing",
                  "Security Testing",
                  "Bug Tracking & Reporting",
                  "Agile/Scrum Methodology"
                ].map((skill, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-2"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <ApperIcon name="Check" size={16} className="text-accent" />
                    <span className="text-sm text-gray-700">{skill}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ResumeSection