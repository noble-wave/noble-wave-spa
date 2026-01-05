# Noble Wave SPA - Architecture Documentation

## Project Structure

This Angular application follows industry best practices and Angular style guide recommendations for a professional, scalable architecture.

```
src/app/
├── config/                    # Application configuration
│   ├── app.constants.ts      # Centralized constants (company info, social links, etc.)
│   ├── lucide-icons.config.ts # Lucide icon imports
│   ├── index.ts              # Barrel export
│   └── README.md             # Configuration documentation
│
├── core/                      # Singleton services and app-wide logic
│   ├── services/             # Core application services
│   │   ├── theme.service.ts
│   │   ├── counter-animation.service.ts
│   │   └── index.ts          # Barrel export
│   └── index.ts              # Core module barrel export
│
├── shared/                    # Reusable components, directives, pipes
│   ├── components/           # Shared UI components
│   │   ├── header/
│   │   ├── footer/
│   │   └── index.ts          # Barrel export
│   └── index.ts              # Shared module barrel export
│
├── features/                  # Feature modules
│   ├── pages/                # Page components
│   │   ├── home/
│   │   ├── about/
│   │   ├── main/
│   │   ├── details/
│   │   └── index.ts          # Barrel export
│   └── index.ts              # Features module barrel export
│
├── models/                    # Data models (prepared for future use)
├── interfaces/                # TypeScript interfaces (prepared for future use)
├── guards/                    # Route guards (prepared for future use)
├── interceptors/              # HTTP interceptors (prepared for future use)
│
├── app.component.ts          # Root component
├── app.module.ts             # Root module
└── app-routing.module.ts     # Root routing
```

## Architecture Principles

### 1. **Separation of Concerns**
- **Core**: Application-wide singleton services
- **Shared**: Reusable UI components used across features
- **Features**: Business logic organized by feature/page
- **Config**: Centralized configuration and constants

### 2. **Barrel Exports (index.ts)**
All folders use barrel exports for clean imports:
```typescript
// Instead of:
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';

// Use:
import { HeaderComponent, FooterComponent } from './shared/components';
```

### 3. **Centralized Configuration**
All constants are in `config/app.constants.ts`:
- `APP_CONFIG`: Application metadata
- `COMPANY_INFO`: Company contact information
- `SOCIAL_LINKS`: Social media links
- `NAVIGATION_LINKS`: Navigation menu items
- `SCROLL_CONFIG`: Scroll behavior settings
- `ANIMATION_CONFIG`: AOS animation configuration
- `EMAIL_CONFIG`: Email templates and subjects

### 4. **Lucide Icons Configuration**
All Lucide icons are centralized in `config/lucide-icons.config.ts`:
```typescript
import { Cloud, Star, Cpu, Mail, Phone, MapPin, Award, Users, Headphones, Shield, Clock } from 'lucide-angular';

export const lucideIcons = {
  Cloud, Star, Cpu, Mail, Phone, MapPin,
  Award, Users, Headphones, Shield, Clock
};
```

## Import Guidelines

### Core Services
```typescript
import { ThemeService, CounterAnimationService } from './core/services';
```

### Shared Components
```typescript
import { HeaderComponent, FooterComponent } from './shared/components';
```

### Feature Components
```typescript
import { HomeComponent, AboutComponent, MainComponent, DetailsComponent } from './features/pages';
```

### Configuration
```typescript
import { APP_CONFIG, COMPANY_INFO, SOCIAL_LINKS } from './config';
import { lucideIcons } from './config';
```

## SCSS Import Paths

Components in nested folders must use correct relative paths:
```scss
// In src/app/features/pages/details/details.component.scss
@import '../../../../styles/colors.scss';
```

## Module Organization

### app.module.ts Structure
1. Angular core imports
2. Third-party library imports
3. Feature component imports (from barrel exports)
4. Shared component imports (from barrel exports)
5. Configuration imports
6. Module declarations and providers

### Component Organization
Each component follows this structure:
```
component-name/
├── component-name.component.ts
├── component-name.component.html
├── component-name.component.scss
└── component-name.component.spec.ts
```

## Best Practices

1. **Always use barrel exports** for imports
2. **Keep constants in config/** folder
3. **Services go in core/services/** (singleton services only)
4. **Reusable components go in shared/components/**
5. **Page components go in features/pages/**
6. **Use relative imports** for SCSS files
7. **Follow Angular naming conventions**
8. **One component per folder**

## Future Enhancements

Prepared folders for scaling:
- **models/**: Data models and entity definitions
- **interfaces/**: TypeScript interfaces
- **guards/**: Route guards (auth, permissions)
- **interceptors/**: HTTP interceptors (auth tokens, error handling)

## Technologies Used

- **Angular**: 16.2.12
- **TypeScript**: 5.1.3
- **Lucide Angular**: Icon library
- **AOS**: Animate on Scroll
- **Lottie-web**: Animation library
- **SCSS**: Styling
- **Tailwind CSS**: Utility classes

## Build Configuration

Budget limits configured in `angular.json`:
- Initial bundle: 500kb warning, 1mb error
- Component styles: 30kb warning, 40kb error

## Development Guidelines

1. Follow the folder structure strictly
2. Use barrel exports for all new modules
3. Add constants to config folder, not hardcoded
4. Write unit tests for all components
5. Keep components focused and single-purpose
6. Use services for shared logic
7. Maintain consistent naming conventions

## Contact

For questions about the architecture, refer to this document or consult the Angular style guide: https://angular.io/guide/styleguide
