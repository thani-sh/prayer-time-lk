# Prayer Times for Sri Lanka - Developer Documentation

## Introduction

This repository provides Islamic prayer times for Sri Lanka through multiple applications and platforms. The project delivers prayer time information using a core JavaScript library for various Sri Lankan cities. The repository includes a core JavaScript library, a web API, a website, and native mobile applications for both iOS and Android platforms.

## Repository Structure

```
prayer-time-lk/
├── apps/                     # Application implementations
│   ├── android/              # Android native app (Kotlin + Jetpack Compose)
│   ├── iphone/               # iOS/iPadOS/macOS native app (Swift + SwiftUI)
│   ├── webapi/               # REST API service (Cloudflare Workers)
│   └── website/              # Web application (SvelteKit)
├── libs/                     # Shared libraries
│   └── prayer-time-lk/       # Core JavaScript library for prayer times
└── data/                     # Prayer time datasets (JSON files)
```

## Libraries and Tools

### Core Libraries

- **`@thani-sh/prayer-time-lk`** - Core JavaScript/TypeScript library providing prayer time calculations and data access for Sri Lankan cities

### Web Technologies

- **SvelteKit** - Full-stack framework for the website application
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework for styling
- **DaisyUI** - Component library for Tailwind CSS
- **Hono** - Lightweight web framework for the API service
- **Wrangler** - Development and deployment tool for Cloudflare Workers

### Mobile Development

- **Jetpack Compose** - Modern UI toolkit for Android
- **SwiftUI** - Declarative UI framework for iOS/iPadOS/macOS
- **Kotlin** - Primary language for Android development
- **Swift** - Primary language for iOS development

### Data Processing

- **date-fns** - Date utility library
- **Lodash** - JavaScript utility library

### Development Tools

- **TypeScript** - Type-safe JavaScript development
- **Prettier** - Code formatting
- **Vitest** - Unit testing framework

## Web APIs

### Internal REST API
- **Prayer Times API (v1)** - RESTful API providing prayer time data for Sri Lankan cities, hosted on Cloudflare Workers with R2 bucket storage

## Applications

### Web Application (`apps/website`)

**Technology**: SvelteKit + Tailwind CSS + DaisyUI

**Capabilities**:
- Display daily prayer times for selected Sri Lankan cities
- Select prayer time calculation methods
- Select Sri Lankan cities
- Progressive Web App (PWA) with service worker support
- Settings configuration
- Privacy documentation page
- Responsive design for mobile and desktop
- Qibla compass

**Missing Features**:
- Hijri calendar display
- 12/24 hour format switch
- Prayer time notifications

### iOS/iPadOS/macOS Application (`apps/iphone`)

**Technology**: Swift + SwiftUI

**Capabilities**:
- Display daily prayer times
- Hijri calendar display with adjustable offset
- Qibla compass with real-time heading and location services
- Prayer time notifications with configurable offsets
- Prayer time method selection
- City selection for Sri Lankan locations
- Location-based services integration
- Adaptive UI for iPhone, iPad, and Mac
- Dark mode support
- Background notification scheduling

**Missing Features**:
- Home widget
- 12/24 hour format switch

### Android Application (`apps/android`)

**Technology**: Kotlin + Jetpack Compose + Material Design 3

**Capabilities**:
- Display daily prayer times
- Material Design 3 UI
- Navigation with bottom bar
- Background notification scheduling (WorkManager)
- Location services integration
- Home widget support (Glance)
- Settings configuration
- Qibla compass
- 12/24 hour format toggle
- Hijri calendar display

**Missing Features**:
- None identified

### Web API (`apps/webapi`)

**Technology**: Hono + Cloudflare Workers + R2 Storage

**Capabilities**:
- RESTful API endpoints for prayer times
- List available calculation methods
- List available Sri Lankan cities
- Retrieve prayer times for specific city and date
- Retrieve full year prayer times dataset
- CORS support for cross-origin requests
- ETag caching
- Request logging

**Endpoints**:
- `GET /v1/ping` - Health check
- `GET /v1/version` - API version information
- `GET /v1/methods` - List calculation methods
- `GET /v1/method/:method/cities` - List cities for method
- `GET /v1/method/:method/city/:city/times` - Get full year times
- `GET /v1/method/:method/city/:city/times/:date` - Get times for specific date
