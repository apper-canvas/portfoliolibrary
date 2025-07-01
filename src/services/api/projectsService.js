import projectsData from '@/services/mockData/projects.json'

const projectsService = {
  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 400))
    return [...projectsData]
  },

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200))
    const project = projectsData.find(project => project.Id === parseInt(id))
    if (!project) {
      throw new Error('Project not found')
    }
    return { ...project }
  },

  async create(projectData) {
    await new Promise(resolve => setTimeout(resolve, 400))
    const maxId = Math.max(...projectsData.map(project => project.Id), 0)
    const newProject = {
      ...projectData,
      Id: maxId + 1
    }
    projectsData.push(newProject)
    return { ...newProject }
  },

  async update(id, updates) {
    await new Promise(resolve => setTimeout(resolve, 400))
    const index = projectsData.findIndex(project => project.Id === parseInt(id))
    if (index === -1) {
      throw new Error('Project not found')
    }
    projectsData[index] = { ...projectsData[index], ...updates }
    return { ...projectsData[index] }
  },

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 400))
    const index = projectsData.findIndex(project => project.Id === parseInt(id))
    if (index === -1) {
      throw new Error('Project not found')
    }
    const deletedProject = projectsData.splice(index, 1)[0]
    return { ...deletedProject }
  }
}

export default projectsService