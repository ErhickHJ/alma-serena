#!/bin/bash
# Backup semanal de Supabase
# Ejecutar: bash scripts/backup-db.sh

set -e
BACKUP_DIR="backups"
mkdir -p "$BACKUP_DIR"
DATE=$(date +%Y-%m-%d_%H-%M)
FILE="$BACKUP_DIR/alma-serena-$DATE.sql"

DB_URL="postgresql://postgres:1sLMvsznDIQkcklX@db.vpwrveuezfdokabkwvhe.supabase.co:6543/postgres"

pg_dump "$DB_URL" --no-owner --no-acl > "$FILE"
gzip "$FILE"
echo "Backup creado: $FILE.gz"
