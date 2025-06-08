#!/bin/sh

host=${DB_HOST:-mysql}
port=${DB_PORT:-3306}
max_wait=30

echo "⏳ Waiting for MySQL to be ready at $host:$port..."

i=0
while ! nc -z "$host" "$port"; do
  i=$((i+1))
  if [ "$i" -ge "$max_wait" ]; then
    echo "❌ Timed out waiting for MySQL after ${max_wait}s"
    exit 1
  fi
  echo "⏳ [$i/${max_wait}] still waiting..."
  sleep 1
done

echo "✅ MySQL is ready, starting backend..."
exec npm run dev
