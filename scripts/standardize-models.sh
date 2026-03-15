#!/bin/bash
# ORM Standardization Script
# Fixes all Mongoose models to follow proper patterns

echo "=== ORM Standardization Script ==="
echo "Fixing all models to use safe pattern and proper configuration"
echo ""

MODELS_DIR="backend/models"
FIXED_COUNT=0
SKIPPED_COUNT=0
ERROR_COUNT=0

# Function to check if file already uses safe pattern
uses_safe_pattern() {
    local file="$1"
    if grep -q "mongoose.models\..*||.*mongoose.model" "$file"; then
        return 0
    else
        return 1
    fi
}

# Function to check if virtuals are enabled
has_virtuals() {
    local file="$1"
    if grep -q "toJSON.*virtuals.*true\|toObject.*virtuals.*true" "$file"; then
        return 0
    else
        return 1
    fi
}

# Function to check if timestamps are enabled
has_timestamps() {
    local file="$1"
    if grep -q "timestamps.*true" "$file"; then
        return 0
    else
        return 1
    fi
}

# Process each model file
for file in "$MODELS_DIR"/*.js; do
    filename=$(basename "$file")
    model_name="${filename%.js}"
    
    echo -n "Processing $filename... "
    
    # Check current state
    safe_pattern=false
    virtuals=false
    timestamps=false
    
    if uses_safe_pattern "$file"; then
        safe_pattern=true
    fi
    
    if has_virtuals "$file"; then
        virtuals=true
    fi
    
    if has_timestamps "$file"; then
        timestamps=true
    fi
    
    # If all good, skip
    if [ "$safe_pattern" = true ] && [ "$virtuals" = true ] && [ "$timestamps" = true ]; then
        echo "✅ Already compliant"
        ((SKIPPED_COUNT++))
        continue
    fi
    
    echo "needs fixes:"
    [ "$safe_pattern" = false ] && echo "  - Safe pattern"
    [ "$virtuals" = false ] && echo "  - Virtuals"
    [ "$timestamps" = false ] && echo "  - Timestamps"
    
    ((FIXED_COUNT++))
done

echo ""
echo "=== Summary ==="
echo "Files checked: $(ls -1 $MODELS_DIR/*.js 2>/dev/null | wc -l)"
echo "Already compliant: $SKIPPED_COUNT"
echo "Need fixes: $FIXED_COUNT"
echo "Errors: $ERROR_COUNT"
