import React from 'react'

const EmployeeToolbar = ({ search, suggestions = [], onSearchChange, onSearchSubmit, onQuickSearch, onClearSearch, loading, total }) => {
	const handleSubmit = (e) => {
		e.preventDefault()
		onSearchSubmit?.()
	}

	return (
		<div className="space-y-3">
			<form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-center">
				<div className="relative flex-1">
					<input
						type="text"
						value={search}
						onChange={(e) => onSearchChange(e.target.value)}
						placeholder="Type name and click Search"
						className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 pr-28 text-sm text-gray-800 outline-none transition focus:border-yellow-500 focus:ring-4 focus:ring-yellow-100"
					/>
					<div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">
						{loading ? 'Searching...' : 'Ready'}
					</div>
				</div>
				<button
					type="submit"
					disabled={loading}
					className="rounded-2xl bg-yellow-400 px-5 py-3 text-sm font-semibold text-gray-900 transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-60"
				>
					Search
				</button>
				<button
					type="button"
					onClick={onClearSearch}
					disabled={loading || !search.trim()}
					className="rounded-2xl border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
				>
					Clear
				</button>
			</form>

			<div className="flex flex-wrap items-center gap-2">
				<span className="text-xs font-medium text-gray-500">Quick search:</span>
				{suggestions.map((item) => (
					<button
						key={item}
						type="button"
						onClick={() => onQuickSearch(item)}
						className="rounded-full border border-yellow-200 bg-yellow-50 px-3 py-1 text-xs font-semibold text-yellow-800 transition hover:bg-yellow-100"
					>
						{item}
					</button>
				))}
				{suggestions.length === 0 && (
					<span className="text-xs text-gray-400">No departments found</span>
				)}
			</div>

			<p className="text-xs text-gray-500">
				Click Search to fetch from backend API. Showing <span className="font-semibold text-gray-700">{total}</span> employees.
			</p>
		</div>
	)
}

export default EmployeeToolbar
