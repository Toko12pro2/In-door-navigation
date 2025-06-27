# Campus Room Navigator

A comprehensive web application for navigating campus rooms and facilities with real-time analytics and admin dashboard.

## 🌟 Features

### For Users
- **Interactive Room Map**: Navigate through detailed floor plans with zoom and pan functionality
- **Smart Search**: Quickly find specific rooms using the search functionality
- **Room Highlighting**: Select and highlight multiple rooms simultaneously
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **No Login Required**: Instant access to all features

### For Administrators
- **Real-time Analytics**: Track user interactions and usage patterns
- **Activity Monitoring**: Live feed of user actions with timestamps
- **Usage Statistics**: Visual charts showing daily activity trends
- **Data Export**: Export analytics data for further analysis
- **Session Tracking**: Monitor active sessions and user engagement

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (for development)

### Installation

1. **Clone or download the project files**
2. **Start a local web server**:
   ```bash
   # Using Node.js (if you have it installed)
   npm run dev
   
   # Or using Python
   python -m http.server 8000
   
   # Or using PHP
   php -S localhost:8000
   ```
3. **Open your browser** and navigate to `http://localhost:8000`

### File Structure
```
campus-room-navigator/
├── index.html              # Main HTML file
├── styles/
│   └── main.css           # Application styles
├── js/
│   ├── app.js             # Main application logic
│   ├── analytics.js       # Analytics and tracking system
│   └── admin.js           # Admin dashboard functionality
├── package.json           # Project configuration
└── README.md             # This file
```

## 📱 How to Use

### Navigation
- **Home**: Welcome page with feature overview and instructions
- **Room Map**: Interactive map with search and highlighting features
- **Admin**: Analytics dashboard (for administrators)

### Room Map Features
1. **Search Rooms**: Use the search box to filter rooms by name
2. **Select Rooms**: Choose rooms from the dropdown list
3. **Highlight Rooms**: Click "Highlight Selected" to mark rooms in green
4. **Interactive Clicking**: Click directly on map rooms to select them
5. **Zoom Controls**: Use zoom in/out buttons or mouse wheel
6. **Pan Navigation**: Click and drag to move around the map
7. **Reset View**: Clear all highlights and return to default view

### Admin Dashboard
- **Statistics Overview**: View total page views, map interactions, and searches
- **Activity Log**: Monitor real-time user actions
- **Usage Charts**: Analyze daily activity trends over the last 7 days
- **Data Management**: Clear logs or export data for analysis

## 🛠️ Technical Details

### Technologies Used
- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with flexbox and grid layouts
- **Vanilla JavaScript**: No frameworks, pure JavaScript implementation
- **SVG**: Scalable vector graphics for the interactive map
- **Local Storage**: Client-side data persistence

### Browser Compatibility
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Performance Features
- **Efficient DOM Manipulation**: Optimized for smooth interactions
- **Local Data Storage**: No external API calls required
- **Responsive Images**: Scalable SVG graphics
- **Minimal Dependencies**: Fast loading times

## 📊 Analytics Features

### Tracked Events
- Page views and navigation
- Map zoom and pan operations
- Room searches and selections
- Room highlighting actions
- Button clicks and interactions

### Data Storage
- All analytics data stored locally using browser's Local Storage
- No external tracking or data collection
- Privacy-focused approach
- Data persists between browser sessions

### Export Options
- JSON format export
- Includes all events, statistics, and session information
- Timestamp-based file naming
- Easy integration with external analytics tools

## 🎨 Design Features

### Visual Design
- **Modern Gradient Backgrounds**: Professional color schemes
- **Hover Effects**: Interactive feedback on all clickable elements
- **Smooth Transitions**: CSS animations for better user experience
- **Consistent Typography**: Readable fonts with proper hierarchy
- **Responsive Layout**: Adapts to all screen sizes

### User Experience
- **Intuitive Navigation**: Clear menu structure
- **Visual Feedback**: Immediate response to user actions
- **Error Prevention**: Confirmation dialogs for destructive actions
- **Accessibility**: Keyboard navigation and screen reader support

## 🔧 Customization

### Adding New Rooms
1. Update the room options in the `loadMapContent()` function in `js/app.js`
2. Ensure corresponding SVG elements have matching IDs
3. Test search and highlighting functionality

### Modifying Analytics
- Edit tracking events in `js/analytics.js`
- Customize dashboard metrics in `js/admin.js`
- Adjust data retention policies as needed

### Styling Changes
- Main styles in `styles/main.css`
- CSS custom properties for easy color scheme changes
- Responsive breakpoints for mobile optimization

## 📈 Usage Statistics

The application tracks various metrics to help understand user behavior:

- **Page Views**: Track which sections users visit most
- **Map Interactions**: Monitor zoom, pan, and room selection activities
- **Search Patterns**: Analyze which rooms users search for frequently
- **Session Duration**: Understand user engagement levels
- **Feature Usage**: Identify most and least used features

## 🔒 Privacy & Security

- **No External Tracking**: All data stored locally
- **No Personal Information**: Only interaction data collected
- **User Control**: Users can clear their data anytime
- **Transparent Logging**: All tracked events visible in admin dashboard

## 🤝 Contributing

To contribute to this project:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

For support or questions:
- Check the admin dashboard for usage analytics
- Review browser console for any error messages
- Ensure JavaScript is enabled in your browser
- Verify local storage is available and not full

## 🔄 Updates & Maintenance

### Regular Maintenance
- Monitor analytics data for unusual patterns
- Clear old analytics data periodically
- Update room information as campus changes
- Test functionality across different browsers

### Future Enhancements
- Multi-floor support
- Room booking integration
- Mobile app version
- Advanced search filters
- User preferences storage

---

**Campus Room Navigator** - Making campus navigation simple and efficient! 🗺️