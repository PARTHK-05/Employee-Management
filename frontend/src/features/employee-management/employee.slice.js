import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchEmployeesApi, fetchEmployeesByDepartmentApi } from './services/employeeApi'

export const fetchEmployees = createAsyncThunk(
	'employee/fetchEmployees',
	async ({ search = '' } = {}, { rejectWithValue }) => {
		try {
			return await fetchEmployeesApi({ search, limit: 50, offset: 0 })
		} catch (error) {
			return rejectWithValue(error.message || 'Unable to load employees')
		}
	}
)

export const fetchEmployeesByDepartment = createAsyncThunk(
	'employee/fetchEmployeesByDepartment',
	async ({ department = '' } = {}, { rejectWithValue }) => {
		try {
			return await fetchEmployeesByDepartmentApi({ department, limit: 50, offset: 0 })
		} catch (error) {
			return rejectWithValue(error.message || 'Unable to load employees by department')
		}
	}
)

const employeeSlice = createSlice({
	name: 'employee',
	initialState: {
		employees: [],
		loading: false,
		error: null,
		search: '',
	},
	reducers: {
		setSearch: (state, action) => {
			state.search = action.payload
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchEmployees.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(fetchEmployees.fulfilled, (state, action) => {
				state.loading = false
				state.employees = Array.isArray(action.payload) ? action.payload : []
			})
			.addCase(fetchEmployees.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload || 'Something went wrong'
			})
			.addCase(fetchEmployeesByDepartment.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(fetchEmployeesByDepartment.fulfilled, (state, action) => {
				state.loading = false
				state.employees = Array.isArray(action.payload) ? action.payload : []
			})
			.addCase(fetchEmployeesByDepartment.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload || 'Something went wrong'
			})
	},
})

export const { setSearch } = employeeSlice.actions
export default employeeSlice.reducer
