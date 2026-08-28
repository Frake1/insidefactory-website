#!/usr/bin/env bash
# Pack project for server deploy (archive root = project files, no wrapper folder).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="${1:-$ROOT/../insidefactory.tar.gz}"
cd "$ROOT"
tar -czf "$OUT" \
  --exclude=node_modules \
  --exclude=.next \
  --exclude=.git \
  --exclude='*.tar.gz' \
  .
echo "Created $OUT"
