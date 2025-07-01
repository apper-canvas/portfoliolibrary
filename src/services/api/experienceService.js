import experienceData from '@/services/mockData/experience.json'

const experienceService = {
  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 300))
    return [...experienceData]
  },

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200))
    const experience = experienceData.find(exp => exp.Id === parseInt(id))
    if (!experience) {
      throw new Error('Experience not found')
    }
    return { ...experience }
  },

  async create(experienceData) {
    await new Promise(resolve => setTimeout(resolve, 400))
    const maxId = Math.max(...experienceData.map(exp => exp.Id), 0)
    const newExperience = {
      ...experienceData,
      Id: maxId + 1
    }
    experienceData.push(newExperience)
    return { ...newExperience }
  },

  async update(id, updates) {
    await new Promise(resolve => setTimeout(resolve, 400))
    const index = experienceData.findIndex(exp => exp.Id === parseInt(id))
    if (index === -1) {
      throw new Error('Experience not found')
    }
    experienceData[index] = { ...experienceData[index], ...updates }
    return { ...experienceData[index] }
  },

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 400))
    const index = experienceData.findIndex(exp => exp.Id === parseInt(id))
    if (index === -1) {
      throw new Error('Experience not found')
    }
    const deletedExperience = experienceData.splice(index, 1)[0]
    return { ...deletedExperience }
  }
}

export default experienceService