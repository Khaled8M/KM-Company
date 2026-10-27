#!/bin/sh
# Usage: ./set-domain.sh https://your-domain.com
D="${1%/}"
find . -type f \( -name "*.html" -o -name "*.xml" -o -name "*.txt" \) -exec sed -i "s|__SITE_URL__|$D|g" {} +
echo "Done: $D"
