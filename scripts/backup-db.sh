#!/bin/bash
# Backup de Supabase — ejecutar desde la raíz del proyecto
# Usa DATABASE_URL del archivo .env (ignorado por git)
# Ejemplo: bash scripts/backup-db.sh

set -e

if [ -z "$DATABASE_URL" ]; then
  # Intentar cargar desde .env.local o .env
  if [ -f .env.local ]; then
    source .env.local 2>/dev/null
  elif [ -f .env ]; then
    source .env 2>/dev/null
  fi
fi

if [ -z "$DATABASE_URL" ]; then
  echo "Error: DATABASE_URL no definida"
  echo "Ejecuta: export DATABASE_URL='postgresql://...'"
  exit 1
fi

BACKUP_DIR="backups"
mkdir -p "$BACKUP_DIR"
DATE=$(date +%Y-%m-%d_%H-%M)
FILE="$BACKUP_DIR/alma-serena-$DATE.sql"

pg_dump "$DB_URL" --no-owner --no-acl > "$FILE"
gzip "$FILE"
echo "Backup creado: $FILE.gz"
