CREATE TABLE Employees (
    employee_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    department_id INT,
    position VARCHAR(100),
    salary NUMERIC(10, 2),
    hire_date DATE
);

CREATE TABLE Departments (
    department_id SERIAL PRIMARY KEY,
    department_name VARCHAR(100)
);

CREATE TABLE Workshops (
    workshop_id SERIAL PRIMARY KEY,
    workshop_name VARCHAR(100)
);

CREATE TABLE Staffing (
    staffing_id SERIAL PRIMARY KEY,
    department_id INT,
    workshop_id INT,
    employee_id INT,
    position VARCHAR(100),
    FOREIGN KEY (department_id) REFERENCES Departments (department_id),
    FOREIGN KEY (workshop_id) REFERENCES Workshops (workshop_id),
    FOREIGN KEY (employee_id) REFERENCES Employees (employee_id)
);
