#!/usr/bin/env bash
# Run on the server after uploading insidefactory.tar.gz to /root/
set -euo pipefail

systemctl stop insidefactory || true

rm -rf /root/insidefactory
mkdir -p /root/insidefactory
tar -xzf /root/insidefactory.tar.gz -C /root/insidefactory

cat > /root/insidefactory/.env.local <<'EOF'
NEXT_PUBLIC_SITE_URL=https://auto-mateit.com/InsideFactory
NEXT_PUBLIC_BASE_PATH=/InsideFactory
PORT=3005
EOF

cd /root/insidefactory
npm ci
npm run build
systemctl restart insidefactory
systemctl status insidefactory --no-pager

echo ""
echo "Verify:"
curl -sI "http://127.0.0.1:3005/InsideFactory/logo/logo-transparent.png" | head -1
curl -sI "https://auto-mateit.com/InsideFactory/logo/logo-transparent.png" | head -1
