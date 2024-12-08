# Token Worthy News Network - Modern News Aggregator

Create a modern, responsive news aggregation platform with the following features and specifications:

## Core Features

### RSS Feed Integration
- Integrate multiple RSS feeds categorized by content type:
  ```javascript
  const FEED_URLS = {
    youtube: 'https://rss.app/feeds/_QMNSWWasV0pYiplZ.xml',
    tiktok: 'https://rss.app/feeds/_RzIpPUPxV5agJIii.xml',
    news: 'https://rss.app/feeds/_jczZ1hO4gaPMTWCW.xml',
    xFeed: 'https://rss.app/feeds/_GCTyu2hjdrYeS0ro.xml',
    animalNews: 'https://rss.app/feeds/_TPRWBDHmKVslJDDK.xml',
    coinmarketcap: 'https://rss.app/feeds/_Fmld27By0HrCxAVr.xml',
    instagram: 'https://rss.app/feeds/_dHJ74cpg6yd41Cqi.xml',
    targetedSearch: 'https://rss.app/feeds/_VGJUutruPHhFZoDk.xml',
    marketAnalysis: 'https://rss.app/feeds/_2JHkJmCr5N3R0tin.xml'
  }
  ```

### Layout & Design
1. **Responsive Layout**
   - Mobile-first design with collapsible sidebar
   - Smooth transitions and animations
   - Dark theme with gradient accents

2. **Hero Section**
   - Featured articles based on views/engagement
   - Main article takes 50% width on tablet and up
   - Side articles in grid layout

3. **Feed Sections**
   - Horizontal scrolling with smooth drag functionality
   - 3 columns on tablet, 4 on desktop, 1 on mobile
   - Show/hide toggle for hidden articles
   - Section-specific refresh buttons

### Article Cards
1. **Features**
   - Age indicator with color coding:
     - Green: < 6 hours
     - Yellow: 6-12 hours
     - Orange: 12-18 hours
     - Red: > 18 hours
   - Favorite functionality
   - Hide/show functionality with 50% opacity
   - Token search integration
   - Comments section

2. **Design**
   - Glass-effect buttons
   - Truncated descriptions (4 lines)
   - Smooth hover animations
   - Consistent card heights

### Navigation
1. **Header**
   - Sticky positioning
   - Mobile menu toggle
   - Notifications button
   - Profile dropdown with avatar

2. **Sidebar**
   - Collapsible on mobile
   - Alphabetically sorted sections
   - Token Worthy News Network branding

## Technical Requirements

### State Management
- Use Zustand for global state
- Manage feed data, favorites, and user preferences

### Performance
- Implement lazy loading
- Optimize image loading
- Smooth animations and transitions

### Dependencies
```json
{
  "dependencies": {
    "@radix-ui/react-*": "latest",
    "class-variance-authority": "latest",
    "clsx": "latest",
    "date-fns": "latest",
    "fast-xml-parser": "latest",
    "lucide-react": "latest",
    "react-router-dom": "latest",
    "tailwind-merge": "latest",
    "zustand": "latest"
  }
}
```

### Styling
- Tailwind CSS with custom configuration
- CSS variables for theme colors
- Custom animations and transitions

## Implementation Notes

1. Use ShadcnUI components for consistent design
2. Implement proper error handling for RSS feeds
3. Ensure accessibility compliance
4. Add proper TypeScript types
5. Follow React best practices and hooks guidelines
6. Implement proper loading states
7. Add error boundaries
8. Ensure responsive images
9. Add proper SEO meta tags