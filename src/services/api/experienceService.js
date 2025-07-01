import { toast } from 'react-toastify'

const experienceService = {
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
          { field: { Name: "company" } },
          { field: { Name: "role" } },
          { field: { Name: "duration" } },
          { field: { Name: "description" } },
          { field: { Name: "achievements" } }
        ]
      }
      
      const response = await apperClient.fetchRecords('experience', params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return []
      }
      
      return response.data || []
    } catch (error) {
      console.error("Error fetching experience:", error)
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
          { field: { Name: "company" } },
          { field: { Name: "role" } },
          { field: { Name: "duration" } },
          { field: { Name: "description" } },
          { field: { Name: "achievements" } }
        ]
      }
      
      const response = await apperClient.getRecordById('experience', parseInt(id), params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }
      
      return response.data
    } catch (error) {
      console.error(`Error fetching experience with ID ${id}:`, error)
      throw error
    }
  },

  async create(expData) {
    try {
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })
      
      // Only include Updateable fields
      const updateableData = {
        Name: expData.Name || expData.role,
        Tags: expData.Tags || "",
        Owner: expData.Owner,
        company: expData.company,
        role: expData.role,
        duration: expData.duration,
        description: expData.description,
        achievements: Array.isArray(expData.achievements) ? expData.achievements.join('\n') : expData.achievements
      }
      
      const params = {
        records: [updateableData]
      }
      
      const response = await apperClient.createRecord('experience', params)
      
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
        return successfulRecords.length > 0 ? successfulRecords[0].data : null
      }
    } catch (error) {
      console.error("Error creating experience:", error)
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
      
      // Only include Updateable fields
      const updateableData = {
        Id: parseInt(id),
        Name: updates.Name || updates.role,
        Tags: updates.Tags || "",
        Owner: updates.Owner,
        company: updates.company,
        role: updates.role,
        duration: updates.duration,
        description: updates.description,
        achievements: Array.isArray(updates.achievements) ? updates.achievements.join('\n') : updates.achievements
      }
      
      const params = {
        records: [updateableData]
      }
      
      const response = await apperClient.updateRecord('experience', params)
      
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
        return successfulRecords.length > 0 ? successfulRecords[0].data : null
      }
    } catch (error) {
      console.error("Error updating experience:", error)
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
      
      const response = await apperClient.deleteRecord('experience', params)
      
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
      console.error("Error deleting experience:", error)
      throw error
    }
  }
}

export default experienceService