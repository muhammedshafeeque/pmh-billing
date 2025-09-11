#!/bin/bash
set -e  # stop on error

SERVER="ubuntu@57.129.75.148"
REMOTE_DIR="/var/www/pmh-store.byzand.online"
BUILD_DIR="dist"

echo "👉 Building frontend..."
npm run build

echo "👉 Uploading build to server..."
scp -r $BUILD_DIR $SERVER:~

echo "👉 Deploying on server..."
ssh $SERVER << EOF
  set -e
  echo "🔹 Removing old files..."
  sudo rm -rf $REMOTE_DIR/*
  echo "🔹 Moving new build..."
  sudo mv ~/$BUILD_DIR/* $REMOTE_DIR/
  sudo rm -rf ~/$BUILD_DIR
  echo "🔹 Reloading Nginx..."
  sudo systemctl reload nginx
  echo "✅ Deployment complete!"
EOF
