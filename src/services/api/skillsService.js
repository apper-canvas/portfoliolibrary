import skillsData from '@/services/mockData/skills.json'

const skillsService = {
  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 300))
    return [...skillsData]
  },

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200))
    const skill = skillsData.find(skill => skill.Id === parseInt(id))
    if (!skill) {
      throw new Error('Skill not found')
    }
    return { ...skill }
  },

  async create(skillData) {
    await new Promise(resolve => setTimeout(resolve, 300))
    const maxId = Math.max(...skillsData.map(skill => skill.Id), 0)
    const newSkill = {
      ...skillData,
      Id: maxId + 1
    }
    skillsData.push(newSkill)
    return { ...newSkill }
  },

  async update(id, updates) {
    await new Promise(resolve => setTimeout(resolve, 300))
    const index = skillsData.findIndex(skill => skill.Id === parseInt(id))
    if (index === -1) {
      throw new Error('Skill not found')
    }
    skillsData[index] = { ...skillsData[index], ...updates }
    return { ...skillsData[index] }
  },

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 300))
    const index = skillsData.findIndex(skill => skill.Id === parseInt(id))
    if (index === -1) {
      throw new Error('Skill not found')
    }
    const deletedSkill = skillsData.splice(index, 1)[0]
    return { ...deletedSkill }
  }
}

export default skillsService