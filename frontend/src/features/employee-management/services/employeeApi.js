import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const fetchEmployeesApi = async ({ search = '', limit = 50, offset = 0 }) => {
  try {
    const { data } = await apiClient.get('/employees', {
      params: {
        search: search.trim() || undefined,
        limit,
        offset,
      },
    })

    return data
  } catch (error) {
    const message = error?.response?.data?.detail || 'Failed to fetch employees'
    throw new Error(message)
  }
}

export const fetchEmployeesByDepartmentApi = async ({ department = '', limit = 50, offset = 0 }) => {
  try {
    const { data } = await apiClient.get('/employees/department-search', {
      params: {
        department: department.trim(),
        limit,
        offset,
      },
    })

    return data
  } catch (error) {
    const message = error?.response?.data?.detail || 'Failed to fetch employees by department'
    throw new Error(message)
  }
}
