import { toast } from 'react-toastify'

const skillsService = {
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
          { field: { Name: "category" } },
          { field: { Name: "proficiency" } },
          { field: { Name: "testingExpertiseCategory" } }
        ],
        includeDeletedRecords: false
      }
      
      const response = await apperClient.fetchRecords('skill', params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return []
      }
      
      return response.data || []
    } catch (error) {
if (error?.response?.data?.message) {
        console.error("Error fetching skills:", error?.response?.data?.message)  
      }      
      return []
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
          { field: { Name: "category" } },
          { field: { Name: "proficiency" } },
          { field: { Name: "testingExpertiseCategory" } }
        ],
        includeDeletedRecords: false
      }
      
      const response = await apperClient.getRecordById('skill', parseInt(id), params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }
      
      return response.data
    } catch (error) {
      console.error(`Error fetching skill with ID ${id}:`, error)
      throw error
    }
  },

  async create(skillData) {
    try {
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })
      
// Only include Updateable fields
      const updateableData = {
        Name: skillData.Name || skillData.name,
        Tags: skillData.Tags || "",
        Owner: skillData.Owner,
        category: skillData.category,
        proficiency: parseInt(skillData.proficiency),
        testingExpertiseCategory: skillData.testingExpertiseCategory
      }
      
      const params = {
        records: [updateableData]
      }
      
      const response = await apperClient.createRecord('skill', params)
      
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
      console.error("Error creating skill:", error)
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
        Name: updates.Name || updates.name,
        Tags: updates.Tags || "",
        Owner: updates.Owner,
        category: updates.category,
        proficiency: parseInt(updates.proficiency),
        testingExpertiseCategory: updates.testingExpertiseCategory
      }
      
      const params = {
        records: [updateableData]
      }
      
      const response = await apperClient.updateRecord('skill', params)
      
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
      console.error("Error updating skill:", error)
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
      
      const response = await apperClient.deleteRecord('skill', params)
      
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
      console.error("Error deleting skill:", error)
      throw error
    }
  },

  async deleteAll() {
    try {
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })
      
      // First, get all skill IDs
      const fetchParams = {
        fields: [
          { field: { Name: "Id" } }
        ],
        includeDeletedRecords: false
      }
      
      const fetchResponse = await apperClient.fetchRecords('skill', fetchParams)
      
      if (!fetchResponse.success) {
        console.error(fetchResponse.message)
        toast.error(fetchResponse.message)
        throw new Error(fetchResponse.message)
      }
      
      const skillIds = fetchResponse.data?.map(skill => skill.Id) || []
      
      if (skillIds.length === 0) {
        toast.info("No skills to delete")
        return true
      }
      
      // Delete all skills
      const deleteParams = {
        RecordIds: skillIds
      }
      
      const response = await apperClient.deleteRecord('skill', deleteParams)
      
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
        
        const successCount = response.results.filter(result => result.success).length
        if (successCount > 0) {
          toast.success(`Successfully deleted ${successCount} skill${successCount > 1 ? 's' : ''}`)
        }
        
        return successCount === skillIds.length
      }
    } catch (error) {
      console.error("Error deleting all skills:", error)
      throw error
    }
  }
}
export default skillsService