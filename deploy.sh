#!/bin/bash

echo "🚀 Desplegando aplicación..."

# Construir contenedores
docker compose build

# Levantar contenedores
docker compose up -d

echo "✅ Aplicación desplegada correctamente"

echo "📤 Subiendo logs a S3..."
aws s3 cp backend/logs/app.log s3://school-planner-logs-al03072223/
