# Startup Validation for Environment Variables

## Overview

The chatbot application includes startup validation for critical environment variables to prevent runtime errors. This validation occurs when the application starts, ensuring that all required configuration is present before any services are initialized.

## Validated Environment Variables

### Required Variables

The following environment variables are **required** and must be set:

1. **`GEMINI_API_KEY`**
   - Purpose: API key for Google Gemini AI service
   - Used by: Chatbot Service for generating responses
   - Format: String (API key from Google Cloud Console)
   - Example: `AIzaSyD...`

2. **`MONGODB_URI`**
   - Purpose: Connection string for MongoDB database
   - Used by: Database Service for storing user profiles and chat sessions
   - Format: MongoDB connection URI
   - Example: `mongodb://localhost:27017/chatbot`

## Validation Behavior

### When Validation Occurs

Validation happens **immediately on module load** in `src/config/index.ts`, before any other application code runs. This ensures:

- Fast failure: Problems are caught at startup, not during user interactions
- Clear errors: Specific error messages indicate which variables are missing
- Prevents runtime errors: No risk of undefined API keys causing crashes during conversations

### Validation Rules

The validation checks for:

1. **Variable existence**: Environment variable must be defined
2. **Non-empty values**: Variable must not be an empty string
3. **No whitespace-only values**: Values like `"   "` are rejected

### Error Messages

When validation fails, the application:

1. Prints a clear error message to the console:
   ```
   ❌ Configuration Error:

     - GEMINI_API_KEY is required but not set in environment variables
     - MONGODB_URI is required but not set in environment variables

   Please set the required environment variables in your .env file or deployment configuration.
   See .env.example for reference.
   ```

2. Throws an error: `Error: Missing required configuration`
3. Exits the process: `process.exit(1)` (automatically handled by Node.js)

## Implementation Details

### Code Location

- **File**: `src/config/index.ts`
- **Function**: `validateConfig()`
- **Execution**: Runs automatically when the module is imported

### Implementation

```typescript
const validateConfig = () => {
  const errors: string[] = [];

  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY.trim() === '') {
    errors.push('GEMINI_API_KEY is required but not set in environment variables');
  }

  if (!process.env.MONGODB_URI || process.env.MONGODB_URI.trim() === '') {
    errors.push('MONGODB_URI is required but not set in environment variables');
  }

  if (errors.length > 0) {
    console.error('\n❌ Configuration Error:\n');
    errors.forEach(error => console.error(`  - ${error}`));
    console.error('\nPlease set the required environment variables in your .env file or deployment configuration.');
    console.error('See .env.example for reference.\n');
    throw new Error('Missing required configuration');
  }
};

// Validate configuration on module load
validateConfig();
```

## Testing the Validation

### Manual Test

To test that validation works:

1. Remove or comment out environment variables in `.env`:
   ```bash
   # GEMINI_API_KEY=your_key_here
   # MONGODB_URI=mongodb://localhost:27017/chatbot
   ```

2. Try to start the application:
   ```bash
   npm run dev
   ```

3. You should see the validation error immediately

### Automated Tests

Validation tests are included in `/tmp/test-validation.js`:

```bash
node /tmp/test-validation.js
```

This tests:
- Missing both variables
- Missing only GEMINI_API_KEY
- Missing only MONGODB_URI
- Both variables present (should succeed)
- Whitespace-only values (should fail)

## Benefits

1. **Early Error Detection**: Catches configuration problems before the app starts serving requests
2. **Clear Error Messages**: Developers know exactly what's missing
3. **Prevents Runtime Failures**: No risk of crashes during user interactions
4. **Better User Experience**: Server won't start in a broken state
5. **Production Safety**: Deployment failures are caught immediately

## Troubleshooting

### "Configuration Error: Missing required configuration"

**Solution:**
1. Create a `.env` file in the project root (copy from `.env.example`)
2. Add your Gemini API key:
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   ```
3. Add your MongoDB connection string:
   ```
   MONGODB_URI=mongodb://localhost:27017/chatbot
   ```

### Environment Variables Not Being Read

**Possible causes:**
1. `.env` file is in the wrong location (must be in project root)
2. Environment variables not exported in your shell
3. Using a different environment (production, staging) without proper config

**Solution:**
- For development: Use `.env` file
- For production: Set environment variables in your deployment platform (Heroku, Railway, etc.)
- For Docker: Use environment variables in `docker-compose.yml` or pass them with `-e` flag

## Future Enhancements

Potential improvements to validation:

1. **Format Validation**: Check that MONGODB_URI is a valid MongoDB connection string
2. **API Key Validation**: Verify that GEMINI_API_KEY is in the correct format
3. **Connection Testing**: Actually test connectivity to MongoDB and Gemini API at startup
4. **Warnings for Optional Variables**: Inform about optional config that's missing
5. **Configuration Schema**: Use a library like Joi or Zod for comprehensive validation

## Related Files

- `src/config/index.ts` - Main configuration and validation
- `.env.example` - Template with all environment variables
- `README.md` - Setup instructions
- `QUICKSTART.md` - Quick setup guide with troubleshooting
- `src/index.ts` - Main application entry point
