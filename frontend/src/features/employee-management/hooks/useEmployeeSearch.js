import { useMemo, useRef } from 'react'

export const useEmployeeSearch = ({ employees, search, loadEmployees, loadEmployeesByDepartment, updateSearch }) => {
  const searchModeRef = useRef('name')

  const sortedEmployees = useMemo(() => {
    return [...employees].sort((a, b) => a.name.localeCompare(b.name))
  }, [employees])

  const departmentSuggestions = useMemo(() => {
    const setDs = new Set(
      employees
        .map((item) => item?.department?.trim())
        .filter(Boolean)
    )

    return Array.from(setDs).sort((a, b) => a.localeCompare(b))
  }, [employees])

  const handleSearchChange = (value) => {
    searchModeRef.current = 'name'
    updateSearch(value)
  }

  const handleSearchSubmit = () => {
    const value = search?.trim() || ''

    if (!value) {
      loadEmployees('')
      return
    }

    if (searchModeRef.current === 'department') {
      loadEmployeesByDepartment(value)
      return
    }

    loadEmployees(value)
  }

  const handleQuickSearch = (value) => {
    searchModeRef.current = 'department'
    updateSearch(value)
  }

  const handleClearSearch = () => {
    searchModeRef.current = 'name'
    updateSearch('')
    loadEmployees('')
  }

  return {
    sortedEmployees,
    departmentSuggestions,
    handleSearchChange,
    handleSearchSubmit,
    handleQuickSearch,
    handleClearSearch,
  }
}
