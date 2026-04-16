# 📚 School Planner DevOps

## 📌 Descripción del proyecto

Este proyecto consiste en una aplicación web tipo *School Planner* que permite gestionar tareas escolares mediante operaciones CRUD (Crear, Leer, Actualizar y Eliminar).

El sistema permite registrar tareas con título, materia y fecha de entrega, así como editarlas o eliminarlas dinámicamente.

---

## 🧱 Arquitectura

La aplicación está basada en una arquitectura de tres capas, cada una ejecutándose en un contenedor Docker:

* **Frontend:** Interfaz web desarrollada con HTML y JavaScript, servida mediante Nginx.
* **Backend:** API REST desarrollada con Node.js y Express.
* **Base de datos:** MySQL para almacenamiento persistente.

Los contenedores se comunican a través de una red interna de Docker.

---

## ⚙️ Tecnologías utilizadas

* Node.js
* Express.js
* MySQL
* Docker
* Docker Compose
* AWS EC2
* HTML / JavaScript
* Nginx

---

## 💻 Instrucciones de ejecución local

1. Clonar el repositorio:

```bash
git clone <URL_DEL_REPO>
cd school-planner-devops
```

2. Levantar los contenedores:

```bash
docker-compose up -d --build
```

3. Acceder a la aplicación:

* Frontend: http://localhost
* Backend: http://localhost:3000

---

## ☁️ Instrucciones de despliegue en EC2

1. Conectarse a la instancia:

```bash
ssh -i devops-key.pem ec2-user@<IP_PUBLICA>
```

2. Instalar Docker (si no está instalado):

```bash
sudo yum update -y
sudo yum install docker -y
sudo systemctl start docker
sudo usermod -aG docker ec2-user
```

3. Clonar el repositorio:

```bash
git clone <URL_DEL_REPO>
cd school-planner-devops
```

4. Ejecutar contenedores:

```bash
docker-compose up -d
```

5. Acceder desde navegador:

* http://<IP_PUBLICA>

---

## 🔌 Puertos utilizados

* **80:** Frontend (Nginx)
* **3000:** Backend (API Node.js)
* **3307:** MySQL (mapeado desde el contenedor)

---

## CloudFormation

El archivo `cloudformation/template.yml` permite crear automáticamente:
- Instancia EC2
- Security Groups
- Configuración inicial del entorno

Para ejecutarlo:
aws cloudformation create-stack \
  --stack-name school-planner-stack \
  --template-body file://cloudformation/template.yml
