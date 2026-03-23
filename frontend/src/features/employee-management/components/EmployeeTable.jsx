import React from 'react'

const EmployeeTable = ({ employees, loading, error }) => {
	if (loading) {
		return (
			<div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-gray-600 shadow-sm">
				<div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-yellow-200 border-t-yellow-500" />
				<p className="mt-3 text-sm">Loading employees...</p>
			</div>
		)
	}

	if (error) {
		return (
			<div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
				{error}
			</div>
		)
	}

	if (!employees.length) {
		return (
			<div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-gray-600 shadow-sm">
				<p className="font-medium">No employees found.</p>
				<p className="mt-1 text-xs text-gray-500">Try another keyword like "engineering", or "hr".</p>
			</div>
		)
	}

	return (
		<div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
			{employees.map((employee) => (
				<article
					key={employee.id}
					className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-yellow-200 hover:shadow-md"
				>
					<div className="flex items-start justify-between gap-3">
						<h3 className="text-lg font-semibold text-gray-900">{employee.name}</h3>
						<span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800">
							#{employee.id}
						</span>
					</div>

					<p className="mt-3 truncate text-sm text-gray-600">{employee.email}</p>

					<div className="mt-4 space-y-2 text-sm text-gray-700">
						<p>
							<span className="font-medium text-gray-900">Department:</span> {employee.department}
						</p>
						<p>
							<span className="font-medium text-gray-900">Designation:</span> {employee.designation}
						</p>
						<p>
							<span className="font-medium text-gray-900">Joined:</span> {employee.date_of_joining}
						</p>
					</div>

				</article>
			))}
		</div>
	)
}

export default EmployeeTable
