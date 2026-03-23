from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from typing import List, Optional

from app.repository.employee_repository import EmployeeRepository
from app.schemas.employee import EmployeeCreate
from app.models.employee import Employee
from app.exception.custom_exceptions import DatabaseConnectionError, ValidationError


class EmployeeService:
    """
    Service layer for employee-related business logic.
    Separates business logic from route handlers and database operations.
    """

    def __init__(self, db: Session):
        self.repository = EmployeeRepository(db)

    def search_employees(
        self,
        search: Optional[str] = None,
        limit: int = 50,
        offset: int = 0
    ) -> List[Employee]:
        """
        Search employees by name or department.
        
        Performance optimizations:
        1. Uses indexed columns (name, department) for searching
        2. Implements pagination to avoid fetching unnecessary data
        3. Centralizes search logic in repository for consistent query behavior
        """
        try:
            return self.repository.search(search=search, limit=limit, offset=offset)
        except SQLAlchemyError as e:
            raise DatabaseConnectionError("Failed to connect to database")

    def get_employee_by_id(self, employee_id: int) -> Optional[Employee]:
        """
        Get a single employee by their ID.
        """
        try:
            return self.repository.get_by_id(employee_id)
        except SQLAlchemyError as e:
            raise DatabaseConnectionError("Failed to connect to database")

    def create_employee(self, employee_data: EmployeeCreate) -> Employee:
        """
        Create a new employee record.
        """
        try:
            # Check if email already exists
            existing = self.repository.get_by_email(employee_data.email)
            if existing:
                raise ValidationError("An employee with this email already exists")
            
            return self.repository.create(employee_data)
        except SQLAlchemyError as e:
            raise DatabaseConnectionError("Failed to connect to database")

    def search_employees_by_department(
        self,
        department: str,
        limit: int = 50,
        offset: int = 0
    ) -> List[Employee]:
        """
        Search employees by department.
        """
        try:
            if not department or not department.strip():
                raise ValidationError("Department query cannot be empty")

            return self.repository.search_by_department(
                department=department,
                limit=limit,
                offset=offset,
            )
        except SQLAlchemyError as e:
            raise DatabaseConnectionError("Failed to connect to database")