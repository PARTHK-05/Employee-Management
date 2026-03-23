import React, { useEffect } from 'react'
import EmployeeToolbar from '../components/EmployeeToolbar'
import EmployeeStats from '../components/EmployeeStats'
import EmployeeTable from '../components/EmployeeTable'
import { useEmployees } from '../hooks/useEmployees'
import { useEmployeeSearch } from '../hooks/useEmployeeSearch'

const EmployeeDashboard = () => {
	const {
		employees,
		loading,
		error,
		search,
		loadEmployees,
		loadEmployeesByDepartment,
		updateSearch,
	} = useEmployees()
	const { sortedEmployees, departmentSuggestions, handleSearchChange, handleSearchSubmit, handleQuickSearch, handleClearSearch } = useEmployeeSearch({
		employees,
		search,
		loadEmployees,
		loadEmployeesByDepartment,
		updateSearch,
	})

	useEffect(() => {
		loadEmployees('')
	}, [])

	return (
		<main className="min-h-screen bg-linear-to-b from-white to-yellow-50 py-8">
			<section className="mx-auto w-full  px-4 sm:px-6 lg:px-8">
                    <div className='flex justify-between items-center mb-6'>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Employee Directory</h1>
                            <p className="mt-2 text-sm text-gray-600">
                                Search is live now.
                            </p>
                        </div>
                        <div >
                            <EmployeeStats total={sortedEmployees.length} />
                        </div>
                    </div>

					<div className="mb-6">
						<EmployeeToolbar
							search={search}
							suggestions={departmentSuggestions}
							onSearchChange={handleSearchChange}
							onSearchSubmit={handleSearchSubmit}
							onQuickSearch={handleQuickSearch}
							onClearSearch={handleClearSearch}
							loading={loading}
							total={sortedEmployees.length}
						/>
					</div>

					<EmployeeTable
						employees={sortedEmployees}
						loading={loading}
						error={error}
					/>
			</section>
		</main>
	)
}

export default EmployeeDashboard
