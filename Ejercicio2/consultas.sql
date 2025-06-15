-- •	Mostrar los nombres de los empleados ordenados alfabéticamente (Z...A)  -- 
select nombres from EMPLEADOS order by nombres DESC;

-- •	Seleccionar el nombre, el puesto y la localidad donde trabajan los empleados con puesto de ‘Soporte’. --
select e.nombres, p.puesto, l.localidad
from EMPLEADOS as e
	inner join PUESTOS as p on e.puesto_id = p.id
	inner join DEPARTAMENTOS as d on e.departamento_id = d.id
	inner join LOCALIDADES as l on d.localidad_id = l.id
where p.puesto like 'Soporte'

-- •	Listar los nombres de los empleados cuyo nombre termine con la letra ‘o’. --
select nombres from EMPLEADOS 
where nombres like '%o';

-- •	Seleccionar el nombre, el puesto y sueldo de los empleados que trabajan en la localidad Carlos Paz. --
select e.nombres, p.puesto, e.sueldo
from EMPLEADOS as e
	inner join PUESTOS as p on e.puesto_id = p.id
	inner join DEPARTAMENTOS as d on e.departamento_id = d.id
	inner join LOCALIDADES as l on d.localidad_id = l.id
where l.localidad like 'Carlos Paz'

-- •	Seleccionar el nombre, sueldo y localidad donde trabajan de los empleados que tengan un sueldo entre 10000 y 13000. --
select e.nombres, e.sueldo, l.localidad
from EMPLEADOS as e
	inner join DEPARTAMENTOS as d on e.departamento_id = d.id
	inner join LOCALIDADES as l on d.localidad_id = l.id
where e.sueldo between 10000 and 13000

-- •	Visualizar los departamentos con más de 5 empleados --
select d.denominacion 
from DEPARTAMENTOS as d
where d.id in (
	select departamento_id from EMPLEADOS
	group by departamento_id
	having COUNT(departamento_id) > 5
);

-- •	Nombre de los empleados que trabajan en Córdoba y cuyo puesto sea ‘Analista’ o ‘Programador’. --
select e.nombres
from EMPLEADOS as e
	inner join PUESTOS as p on e.puesto_id = p.id
	inner join DEPARTAMENTOS as d on e.departamento_id = d.id
	inner join LOCALIDADES as l on d.localidad_id = l.id
where p.puesto in ('Analista', 'Programador') and l.localidad = 'Córdoba'

-- •	Calcula el sueldo medio de todos los empleados. --
select avg(sueldo) from EMPLEADOS

-- •	¿Cuál es el máximo sueldo de los empleados del departamento 10? --
select max(sueldo) from EMPLEADOS
where departamento_id = 10

-- •	Calcula el sueldo mínimo de los empleados del departamento ‘Soporte’. --
select min(sueldo)
from EMPLEADOS as e
	inner join DEPARTAMENTOS as d on e.departamento_id = d.id
where d.DENOMINACION like 'Soporte'

-- •	Para cada puesto obtener la suma de sueldos. --
select p.puesto, sum(e.sueldo)
from EMPLEADOS as e
	inner join PUESTOS as p on e.puesto_id = p.id
GROUP BY p.id







