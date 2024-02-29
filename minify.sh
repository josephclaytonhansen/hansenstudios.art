#!/bin/bash

postcss dist/assets/*.css -u cssnano -d dist/assets

for file in dist/assets/*.js; do
  uglifyjs "$file" -o "${file%.js}.min.js"
  mv "${file%.js}.min.js" "$file"
done