import React from 'react'

const EmployeeStats = ({ total }) => {
	return (
		<div className="flex justify-center items-center text-center">
			<div className="rounded-2xl border border-yellow-200 bg-white p-5 shadow-sm">
				<p className="text-sm text-gray-500">Total Employees</p>
				<p className="mt-2 text-3xl font-bold text-gray-900 text-center">{total}</p>
			</div>
		</div>
	)
}

export default EmployeeStats
