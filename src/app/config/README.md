# Configuration Directory

This directory contains all centralized configuration files for the Noble Wave application.

## Files

### `app.constants.ts`
Contains all application-wide constants including:
- **APP_CONFIG**: Application name, tagline, description
- **COMPANY_INFO**: Contact details (email, phone, address)
- **SOCIAL_LINKS**: Social media URLs
- **NAVIGATION_LINKS**: Navigation menu structure
- **SCROLL_CONFIG**: Scroll behavior settings
- **ANIMATION_CONFIG**: AOS animation settings
- **EMAIL_CONFIG**: Email-related configurations

### `lucide-icons.config.ts`
Centralized configuration for all Lucide icons used in the application.
All icons are imported here and exported as a single object for consistency.

### `index.ts`
Barrel export file for convenient imports throughout the application.

## Usage

```typescript
// Import specific constants
import { COMPANY_INFO, SOCIAL_LINKS } from './config';

// Or import everything
import * as Config from './config';
```

## Benefits

1. **Single Source of Truth**: All configuration in one place
2. **Easy Maintenance**: Update values once, reflect everywhere
3. **Type Safety**: TypeScript ensures type consistency
4. **Consistency**: No hardcoded values scattered across components
5. **Easy Testing**: Mock configurations easily in tests
