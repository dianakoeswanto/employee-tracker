DROP DATABASE IF EXISTS employee_tracker;
CREATE DATABASE employee_tracker;

USE employee_tracker;

/* ---- Create Department Table & insert sample data ---- */
CREATE TABLE department(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
)

INSERT INTO department (name) VALUES ("Engineering");
INSERT INTO department (name) VALUES ("Sales");
INSERT INTO department (name) VALUES ("Finance");


/* ---- Create Role Table & insert sample data ---- */
CREATE TABLE role(
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department (id)
)

INSERT INTO role (title, salary, department_id) 
VALUES ("Software Engineer", 150000, 1);

INSERT INTO role (title, salary, department_id) 
VALUES ("Engineering Manager", 200000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Account Manager", 80000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Manager", 85000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 90000, 3);

INSERT INTO role (title, salary, department_id)
VALUES ("Finance Manager", 100000, 3);


/* ---- Create Employee Table & insert sample data ---- */
CREATE TABLE employee(
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (role_id) REFERENCES role (id),
  FOREIGN KEY (manager_id) REFERENCES employee (id)
);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Sam", "Benson", 2);