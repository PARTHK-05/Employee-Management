import { useState, useCallback } from 'react'
import { fetchEmployeesApi, fetchEmployeesByDepartmentApi } from '../services/employeeApi'

export const useEmployees = () => {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')

  const loadEmployees = useCallback(async (searchValue = '') => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchEmployeesApi({ search: searchValue, limit: 50, offset: 0 })
      setEmployees(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(err.message || 'Unable to load employees')
      setEmployees([])
    } finally {
      setLoading(false)
    }
  }, [])

  const loadEmployeesByDepartment = useCallback(async (departmentValue) => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchEmployeesByDepartmentApi({ department: departmentValue, limit: 50, offset: 0 })
      setEmployees(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(err.message || 'Unable to load employees by department')
      setEmployees([])
    } finally {
      setLoading(false)
    }
  }, [])

  const updateSearch = useCallback((value) => {
    setSearch(value)
  }, [])

  return {
    employees,
    loading,
    error,
    search,
    loadEmployees,
    loadEmployeesByDepartment,
    updateSearch,
  }
}
