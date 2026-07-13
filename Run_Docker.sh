#!/bin/bash

# 1. Start the containers
echo "🚀 Starting containers..."
docker compose up -d

# 2. Wait for Garage to be ready and get Node ID
echo "⏳ Waiting for Garage to initialize..."
NODE_ID=""
MAX_RETRIES=15
RETRY_COUNT=0

while [ -z "$NODE_ID" ] && [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
    # Attempt to get the Node ID
    NODE_ID=$(docker exec narsunstream-garage garage node id 2>/dev/null)
    
    if [ -z "$NODE_ID" ]; then
        echo "   (Still waiting for Garage process...)"
        sleep 3
        ((RETRY_COUNT++))
    fi
done

if [ -z "$NODE_ID" ]; then
    echo "❌ Error: Garage failed to start within 45 seconds."
    echo "Check logs with: docker logs narsunstream-garage"
    exit 1
fi

echo "✅ Garage is up! Node ID: $NODE_ID"

# 3. Assign the node role
echo "📍 Assigning node role and capacity..."
docker exec narsunstream-garage garage layout assign "$NODE_ID" \
    --capacity 10G \
    --role storage \
    --tag local

# 4. Apply the layout
echo "💾 Applying layout (Version 1)..."
docker exec narsunstream-garage garage layout apply --version 1

echo "------------------------------------------------"
echo "✨ Garage and Postgres are ready!"
echo "Postgres: localhost:5432"
echo "Garage S3 API: http://localhost:9000"
echo "Garage Web UI: http://localhost:9001"
echo "------------------------------------------------"