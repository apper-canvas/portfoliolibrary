import { toast } from 'react-toastify'

const projectsService = {
  async getAll() {
    try {
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title" } },
          { field: { Name: "description" } },
          { field: { Name: "image" } },
          { field: { Name: "technologies" } },
          { field: { Name: "testing_tools" } },
          { field: { Name: "link" } },
          { field: { Name: "github" } },
          { field: { Name: "category" } }
        ]
      }
      
      const response = await apperClient.fetchRecords('project', params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return []
      }
      
      // Transform data to match UI expectations
      const transformedData = (response.data || []).map(project => ({
        ...project,
        technologies: project.technologies ? project.technologies.split(',') : [],
        testingTools: project.testing_tools ? project.testing_tools.split(',') : []
      }))
      
      return transformedData
    } catch (error) {
      console.error("Error fetching projects:", error)
      throw error
    }
  },

  async getById(id) {
    try {
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title" } },
          { field: { Name: "description" } },
          { field: { Name: "image" } },
          { field: { Name: "technologies" } },
          { field: { Name: "testing_tools" } },
          { field: { Name: "link" } },
          { field: { Name: "github" } },
          { field: { Name: "category" } }
        ]
      }
      
      const response = await apperClient.getRecordById('project', parseInt(id), params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }
      
      // Transform data to match UI expectations
      const project = response.data
      return {
        ...project,
        technologies: project.technologies ? project.technologies.split(',') : [],
        testingTools: project.testing_tools ? project.testing_tools.split(',') : []
      }
    } catch (error) {
      console.error(`Error fetching project with ID ${id}:`, error)
      throw error
    }
  },

  async create(projectData) {
    try {
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })
      
      // Only include Updateable fields and format MultiPicklist fields
      const updateableData = {
        Name: projectData.Name || projectData.title,
        Tags: projectData.Tags || "",
        Owner: projectData.Owner,
        title: projectData.title,
        description: projectData.description,
        image: projectData.image || "",
        technologies: Array.isArray(projectData.technologies) ? projectData.technologies.join(',') : projectData.technologies || "",
        testing_tools: Array.isArray(projectData.testingTools) ? projectData.testingTools.join(',') : projectData.testing_tools || "",
        link: projectData.link || "",
        github: projectData.github || "",
        category: projectData.category
      }
      
      const params = {
        records: [updateableData]
      }
      
      const response = await apperClient.createRecord('project', params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        throw new Error(response.message)
      }
      
      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success)
        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} records:${JSON.stringify(failedRecords)}`)
          failedRecords.forEach(record => {
            if (record.message) toast.error(record.message)
          })
        }
        
        const successfulRecords = response.results.filter(result => result.success)
        if (successfulRecords.length > 0) {
          const project = successfulRecords[0].data
          return {
            ...project,
            technologies: project.technologies ? project.technologies.split(',') : [],
            testingTools: project.testing_tools ? project.testing_tools.split(',') : []
          }
        }
      }
    } catch (error) {
      console.error("Error creating project:", error)
      throw error
    }
  },

  async update(id, updates) {
    try {
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })
      
      // Only include Updateable fields and format MultiPicklist fields
      const updateableData = {
        Id: parseInt(id),
        Name: updates.Name || updates.title,
        Tags: updates.Tags || "",
        Owner: updates.Owner,
        title: updates.title,
        description: updates.description,
        image: updates.image || "",
        technologies: Array.isArray(updates.technologies) ? updates.technologies.join(',') : updates.technologies || "",
        testing_tools: Array.isArray(updates.testingTools) ? updates.testingTools.join(',') : updates.testing_tools || "",
        link: updates.link || "",
        github: updates.github || "",
        category: updates.category
      }
      
      const params = {
        records: [updateableData]
      }
      
      const response = await apperClient.updateRecord('project', params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        throw new Error(response.message)
      }
      
      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success)
        if (failedRecords.length > 0) {
          console.error(`Failed to update ${failedRecords.length} records:${JSON.stringify(failedRecords)}`)
          failedRecords.forEach(record => {
            if (record.message) toast.error(record.message)
          })
        }
        
        const successfulRecords = response.results.filter(result => result.success)
        if (successfulRecords.length > 0) {
          const project = successfulRecords[0].data
          return {
            ...project,
            technologies: project.technologies ? project.technologies.split(',') : [],
            testingTools: project.testing_tools ? project.testing_tools.split(',') : []
          }
        }
      }
    } catch (error) {
      console.error("Error updating project:", error)
      throw error
    }
  },

  async delete(id) {
    try {
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })
      
      const params = {
        RecordIds: [parseInt(id)]
      }
      
      const response = await apperClient.deleteRecord('project', params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        throw new Error(response.message)
      }
      
      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success)
        if (failedRecords.length > 0) {
          console.error(`Failed to delete ${failedRecords.length} records:${JSON.stringify(failedRecords)}`)
          failedRecords.forEach(record => {
            if (record.message) toast.error(record.message)
          })
        }
        
        return response.results.filter(result => result.success).length > 0
      }
    } catch (error) {
      console.error("Error deleting project:", error)
      throw error
    }
  }
}

export default projectsService