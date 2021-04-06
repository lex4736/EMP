  
INSERT INTO department (dept_name) VALUES ('Back of House'), ('Front of House'), ('Management');
INSERT INTO company_role (title, salary, dept_id) VALUES
('Owner', 100.00, 1), 
('Chef', 10.00, 2),
('Host', 50.00, 3);


INSERT INTO employees (first_name, last_name, emp_role_id, manager_id) VALUES
('Eugene', 'Krabs', 1, null),
('Spongebob', 'Squarepants', 2, 1),
('Squidward', 'Tentacles', 3, 1);


