#!/bin/sh

# Recreate config file
rm -rf /app/public/env-config.js
touch /app/public/env-config.js

# Add assignment
echo "window._env_ = {" >> /app/public/env-config.js

# Read specific environment variables and write them to the config file
echo "  NEXT_PUBLIC_URL_SQL_RECOMMENDER: \"$NEXT_PUBLIC_URL_SQL_RECOMMENDER\"," >> /app/public/env-config.js
echo "  NEXT_PUBLIC_URL_VALIDATA: \"$NEXT_PUBLIC_URL_VALIDATA\"," >> /app/public/env-config.js
echo "  NEXT_PUBLIC_URL_DATA_QUALITY_FORM: \"$NEXT_PUBLIC_URL_DATA_QUALITY_FORM\"," >> /app/public/env-config.js
echo "  NEXT_PUBLIC_URL_DATA_DEFINITIONS: \"$NEXT_PUBLIC_URL_DATA_DEFINITIONS\"," >> /app/public/env-config.js
echo "  NEXT_PUBLIC_URL_DATA_GLOSSARY: \"$NEXT_PUBLIC_URL_DATA_GLOSSARY\"," >> /app/public/env-config.js
echo "  NEXT_PUBLIC_URL_SOP_DOCS: \"$NEXT_PUBLIC_URL_SOP_DOCS\"," >> /app/public/env-config.js
echo "  NEXT_PUBLIC_URL_GITREPO: \"$NEXT_PUBLIC_URL_GITREPO\"," >> /app/public/env-config.js
echo "  NEXT_PUBLIC_CHAINLIT_URL: \"$NEXT_PUBLIC_CHAINLIT_URL\"," >> /app/public/env-config.js

echo "};" >> /app/public/env-config.js

# Execute Command
exec "$@"
