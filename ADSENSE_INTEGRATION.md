# Google AdSense Integration

This project has been integrated with Google AdSense for monetization. The integration includes strategic ad placements throughout the website.

## AdSense Script

The Google AdSense script has been added to `index.html` in the `<head>` section:

```html
<script
  async
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1763845209260560"
  crossorigin="anonymous"
></script>
```

## Ad Components

### AdSense Component (`src/components/AdSense.tsx`)

A reusable AdSense component that handles ad creation and management:

- **AdSense**: Main component for creating ads with custom slots and formats
- **TopBannerAd**: Banner ad for top of pages
- **SidebarAd**: Sidebar ad for tool pages
- **InContentAd**: In-content ad for strategic placement
- **BottomBannerAd**: Bottom banner ad

### Ad Formats Supported

- `auto` - Automatic sizing
- `fluid` - Fluid responsive
- `rectangle` - Rectangle format
- `banner` - Banner format
- `leaderboard` - Leaderboard format
- `sidebar` - Sidebar format

## Ad Placements

### Homepage (`src/pages/Index.tsx`)

1. **Top Banner Ad** - After hero section
2. **In-Content Ad** - Between features and featured tools
3. **Bottom Banner Ad** - At the bottom of the page

### Tool Pages

1. **Sidebar Ad** - Right sidebar on all tool pages (via ToolLayout)
2. **In-Content Ad** - Strategic placement within tool content

### Specific Tool Pages

- **ColorTools**: Ad between color picker and palette generator
- **TypingTest**: Ad between stats and main test area

## Development vs Production

- **Development**: Shows placeholder cards with ad information
- **Production**: Loads actual Google AdSense ads

## Ad Slots

Current ad slots used:

- `1234567890` - Top Banner
- `0987654321` - Sidebar
- `1122334455` - In-Content
- `5566778899` - Bottom Banner

**Note**: These are placeholder slots. Replace with actual ad slot IDs from your AdSense account.

## Responsive Behavior

- Sidebar ads are hidden on mobile devices (`hidden lg:block`)
- All ads use responsive sizing with `data-full-width-responsive="true"`
- Ads automatically adjust to container dimensions

## Customization

To add ads to new pages:

1. Import the desired ad component:

```tsx
import { InContentAd } from "@/components/AdSense";
```

2. Place the ad component in your JSX:

```tsx
<InContentAd />
```

3. For custom ads, use the main AdSense component:

```tsx
<AdSense adSlot="your-slot-id" adFormat="auto" className="custom-class" />
```

## Important Notes

- Ensure your AdSense account is approved before going live
- Replace placeholder ad slot IDs with real ones from your AdSense dashboard
- Test ad placement on different screen sizes
- Monitor ad performance and user experience
- Follow AdSense policies and guidelines
