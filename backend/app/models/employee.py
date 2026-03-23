from sqlalchemy import Column, Integer, String, Date, Index
from app.database.connection import Base


class Employee(Base):
    """
    Employee model representing the employees table.

    Indexing Strategy:
    - Individual indexes on 'name', 'email', and 'department'
    - Composite index on (name, department) for faster search queries

    This improves performance when filtering large datasets.
    """

    __tablename__ = "employees"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(100), nullable=False, index=True)
    email = Column(String(100), unique=True, nullable=False, index=True)
    department = Column(String(50), nullable=False, index=True)
    designation = Column(String(100), nullable=False)
    date_of_joining = Column(Date, nullable=False)

    # Composite index for optimized search queries
    __table_args__ = (
        Index('idx_name_department', 'name', 'department'),
    )

    def __repr__(self):
        return f"<Employee(id={self.id}, name={self.name}, department={self.department})>"