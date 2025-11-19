# Settings Feature Documentation

## Overview
Comprehensive settings system for KVideo following the Liquid Glass design system principles.

## Features

### 1. Video Source Management
- **View all sources**: Display default and custom video sources with their URLs
- **Toggle sources**: Enable/disable sources with animated switches
- **Reorder sources**: Change priority using up/down arrows
- **Delete sources**: Remove custom sources (default sources can also be removed)
- **Add custom sources**: Add new video API sources with validation
- **Restore defaults**: One-click restore to default source configuration

### 2. Search Result Sorting
Users can select how search results should be sorted:
- **默认排序** (Default): Original order
- **按相关性** (By Relevance): Most relevant results first
- **延迟低到高** (Latency: Low to High): Fastest responding sources first
- **发布时间（新到旧）** (Release Date: Newest First)
- **发布时间（旧到新）** (Release Date: Oldest First)
- **按评分（高到低）** (By Rating: High to Low)
- **按名称（A-Z）** (By Name: A-Z)
- **按名称（Z-A）** (By Name: Z-A)

### 3. Data Management

#### Export Settings
- Export app configuration to JSON file
- Options to include:
  - Search history
  - Watch history
  - Source configuration (always included)
- Downloaded as timestamped JSON file

#### Import Settings
- Import previously exported configuration
- Automatic validation
- Auto-refresh after successful import

#### Reset All Data
- Clear all settings
- Clear search history
- Clear watch history
- Clear all cookies
- Clear all cache
- Restore to factory defaults

## Components

### Core Components
- `SourceManager.tsx` - Manage video sources with toggle, reorder, delete
- `AddSourceModal.tsx` - Modal dialog for adding custom sources
- `ExportModal.tsx` - Export settings with history options
- `ImportModal.tsx` - Import settings from JSON file
- `ConfirmDialog.tsx` - Reusable confirmation dialog (updated)

### Store
- `settings-store.ts` - Settings state management and persistence

## Design System Compliance

All components strictly follow the Liquid Glass design system:

### Visual Elements
- **Glass Effect**: `backdrop-blur-xl`, `saturate(180%)`
- **Border Radius**: Only `rounded-[var(--radius-2xl)]` and `rounded-[var(--radius-full)]`
- **Colors**: CSS variables for theme consistency
- **Shadows**: `shadow-[var(--shadow-sm)]` and `shadow-[var(--shadow-md)]`

### Animations
- **Modal Entry/Exit**: Fade + scale transforms with cubic-bezier easing
- **Switch Toggle**: 0.4s fluid transition with `cubic-bezier(0.2, 0.8, 0.2, 1)`
- **Button Hover**: Smooth color transitions with brightness changes
- **List Items**: Staggered animations for visual hierarchy

### Interactive Elements
- **Checkboxes**: Custom styled with smooth check animation
- **Switches**: Animated toggle with sliding thumb
- **Buttons**: Glass morphism with hover lift effects
- **Inputs**: Glass background with focus ring animation

## Technical Implementation

### State Management
```typescript
interface AppSettings {
  sources: VideoSource[];
  sortBy: SortOption;
  searchHistory: boolean;
  watchHistory: boolean;
}
```

### Local Storage Keys
- `kvideo-settings` - Main settings object
- `kvideo-search-history` - Search history array
- `kvideo-watch-history` - Watch history array

### Data Flow
1. Settings loaded from localStorage on mount
2. Changes immediately persisted to localStorage
3. Export creates downloadable JSON blob
4. Import validates and applies configuration
5. Reset clears all storage and reloads page

## Accessibility

- Semantic HTML structure
- ARIA labels on all interactive elements
- Keyboard navigation support
- Focus management in modals
- High contrast mode support
- Screen reader friendly

## Browser Compatibility

- Modern browsers with CSS backdrop-filter support
- LocalStorage API
- File API for export/import
- Cookie manipulation for reset

## Future Enhancements

- Cloud sync for settings across devices
- Source health monitoring
- Advanced filtering options
- Bulk source import from URL
- Settings backup scheduling
- Theme customization
