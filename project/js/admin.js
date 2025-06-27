// Admin dashboard functionality
class AdminDashboard {
    constructor() {
        this.analytics = window.campusNavigator?.analytics || new Analytics();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateDashboard();
        
        // Auto-refresh dashboard every 30 seconds
        setInterval(() => {
            if (document.getElementById('admin-page').classList.contains('active')) {
                this.updateDashboard();
            }
        }, 30000);
    }

    setupEventListeners() {
        // Clear log button
        window.clearActivityLog = () => {
            if (confirm('Are you sure you want to clear all activity data? This action cannot be undone.')) {
                this.analytics.clearData();
                this.updateDashboard();
                this.showNotification('Activity log cleared successfully', 'success');
            }
        };

        // Export data button
        window.exportActivityLog = () => {
            this.analytics.exportData();
            this.showNotification('Analytics data exported successfully', 'success');
        };
    }

    updateDashboard() {
        this.updateStats();
        this.updateActivityLog();
        this.updateChart();
    }

    updateStats() {
        const stats = this.analytics.getStats();
        const activeSessions = this.analytics.getActiveSessions();

        document.getElementById('total-views').textContent = stats.totalViews.toLocaleString();
        document.getElementById('map-interactions').textContent = stats.mapInteractions.toLocaleString();
        document.getElementById('room-searches').textContent = stats.roomSearches.toLocaleString();
        document.getElementById('active-sessions').textContent = activeSessions.toLocaleString();
    }

    updateActivityLog() {
        const recentEvents = this.analytics.getRecentEvents(20);
        const activityLog = document.getElementById('activity-log');

        if (recentEvents.length === 0) {
            activityLog.innerHTML = '<div class="no-activity">No recent activity</div>';
            return;
        }

        const activityHTML = recentEvents.map(event => {
            const time = new Date(event.timestamp).toLocaleString();
            const typeClass = this.getEventTypeClass(event.type);
            
            return `
                <div class="activity-item ${typeClass}">
                    <div class="activity-description">
                        <strong>${this.formatEventType(event.type)}</strong>: ${event.description}
                    </div>
                    <div class="activity-time">${time}</div>
                </div>
            `;
        }).join('');

        activityLog.innerHTML = activityHTML;
    }

    getEventTypeClass(eventType) {
        const typeMap = {
            'page_view': 'type-page',
            'map_zoom': 'type-map',
            'map_reset': 'type-map',
            'room_highlight': 'type-room',
            'room_reset': 'type-room',
            'room_click': 'type-room',
            'room_search': 'type-search',
            'cta_click': 'type-action',
            'data_export': 'type-admin'
        };
        return typeMap[eventType] || 'type-other';
    }

    formatEventType(eventType) {
        const typeMap = {
            'page_view': 'Page View',
            'map_zoom': 'Map Zoom',
            'map_reset': 'Map Reset',
            'room_highlight': 'Room Highlight',
            'room_reset': 'Room Reset',
            'room_click': 'Room Click',
            'room_search': 'Room Search',
            'cta_click': 'CTA Click',
            'data_export': 'Data Export'
        };
        return typeMap[eventType] || eventType.replace('_', ' ').toUpperCase();
    }

    updateChart() {
        const canvas = document.getElementById('usage-chart');
        const ctx = canvas.getContext('2d');
        const usageData = this.analytics.getUsageData();

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (usageData.length === 0) {
            ctx.fillStyle = '#666';
            ctx.font = '16px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('No data available', canvas.width / 2, canvas.height / 2);
            return;
        }

        // Chart dimensions
        const padding = 40;
        const chartWidth = canvas.width - (padding * 2);
        const chartHeight = canvas.height - (padding * 2);

        // Find max value for scaling
        const maxEvents = Math.max(...usageData.map(d => d.events), 1);

        // Draw axes
        ctx.strokeStyle = '#ddd';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, canvas.height - padding);
        ctx.lineTo(canvas.width - padding, canvas.height - padding);
        ctx.stroke();

        // Draw bars
        const barWidth = chartWidth / usageData.length * 0.8;
        const barSpacing = chartWidth / usageData.length * 0.2;

        usageData.forEach((data, index) => {
            const barHeight = (data.events / maxEvents) * chartHeight;
            const x = padding + (index * (barWidth + barSpacing)) + (barSpacing / 2);
            const y = canvas.height - padding - barHeight;

            // Draw bar
            ctx.fillStyle = '#667eea';
            ctx.fillRect(x, y, barWidth, barHeight);

            // Draw value on top
            ctx.fillStyle = '#333';
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(data.events.toString(), x + (barWidth / 2), y - 5);

            // Draw date label
            const dateLabel = new Date(data.date).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric' 
            });
            ctx.fillText(dateLabel, x + (barWidth / 2), canvas.height - padding + 15);
        });

        // Draw title
        ctx.fillStyle = '#333';
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Daily Activity (Last 7 Days)', canvas.width / 2, 20);
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '15px 20px',
            borderRadius: '5px',
            color: 'white',
            fontWeight: 'bold',
            zIndex: '10000',
            opacity: '0',
            transform: 'translateX(100%)',
            transition: 'all 0.3s ease'
        });

        // Set background color based on type
        const colors = {
            success: '#28a745',
            error: '#dc3545',
            warning: '#ffc107',
            info: '#17a2b8'
        };
        notification.style.backgroundColor = colors[type] || colors.info;

        // Add to page
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 10);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Initialize admin dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.adminDashboard = new AdminDashboard();
});