#!/usr/bin/env bash
# exit on error
set -o errexit

pip install -r requirements.txt

if command -v npm >/dev/null 2>&1; then
  npm --prefix frontend ci
  npm --prefix frontend run build
fi
