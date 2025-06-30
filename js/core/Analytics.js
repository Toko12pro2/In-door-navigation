// Analytics and tracking system
class Analytics {
    constructor() {
        this.sessionId = this.generateSessionId();
        this.startTime = Date.now();
        this.events = this.loadEvents();
        this.stats = this.loadStats();
        this.initSession();
    }

    generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    initSession() {
        const today = new Date().toDateString();
        const sessions = JSON.parse(localStorage.getItem('activeSessions') || '{}');
        sessions[today] = (sessions[today] || 0) + 1;
        localStorage.setItem('activeSessions', JSON.stringify(sessions));
    }

    loadEvents() {
        return JSON.parse(localStorage.getItem('analyticsEvents') || '[]');
    }

    loadStats() {
        return JSON.parse(localStorage.getItem('analyticsStats') || JSON.stringify({
            totalViews: 0,
            mapInteractions: 0,
            roomSearches: 0,
            pageViews: {
                home: 0,
                map: 0,
                admin: 0
            }
        }));
    }

    saveEvents() {
        localStorage.setItem('analyticsEvents', JSON.stringify(this.events));
    }

    saveStats() {
        localStorage.setItem('analyticsStats', JSON.stringify(this.stats));
    }

    trackEvent(eventType, description, data = {}) {
        const event = {
            id: Date.now() + '_' + Math.random().toString(36).substr(2, 5),
            sessionId: this.sessionId,
            type: eventType,
            description: description,
            data: data,
            timestamp: new Date().toISOString(),
            url: window.location.href,
            userAgent: navigator.userAgent
        };

        this.events.unshift(event);
        
        if (this.events.length > 1000) {
            this.events = this.events.slice(0, 1000);
        }

        this.updateStats(eventType);
        this.saveEvents();
        this.saveStats();

        console.log('Analytics Event:', event);
    }

    trackPageView(page) {
        this.stats.totalViews++;
        this.stats.pageViews[page] = (this.stats.pageViews[page] || 0) + 1;
        this.trackEvent('page_view', `Viewed ${page} page`, { page: page });
    }

    updateStats(eventType) {
        switch (eventType) {
            case 'map_zoom':
            case 'map_reset':
            case 'room_highlight':
            case 'room_reset':
            case 'room_click':
                this.stats.mapInteractions++;
                break;
            case 'room_search':
                this.stats.roomSearches++;
                break;
        }
    }

    getRecentEvents(limit = 50) {
        return this.events.slice(0, limit);
    }

    getStats() {
        return this.stats;
    }

    getActiveSessions() {
        const today = new Date().toDateString();
        const sessions = JSON.parse(localStorage.getItem('activeSessions') || '{}');
        return sessions[today] || 0;
    }

    clearData() {
        this.events = [];
        this.stats = {
            totalViews: 0,
            mapInteractions: 0,
            roomSearches: 0,
            pageViews: {
                home: 0,
                map: 0,
                admin: 0
            }
        };
        localStorage.removeItem('analyticsEvents');
        localStorage.removeItem('analyticsStats');
        localStorage.removeItem('activeSessions');
        this.saveEvents();
        this.saveStats();
    }

    exportData() {
        const exportData = {
            events: this.events,
            stats: this.stats,
            exportDate: new Date().toISOString(),
            sessionInfo: {
                sessionId: this.sessionId,
                startTime: this.startTime,
                duration: Date.now() - this.startTime
            }
        };

        const dataStr = JSON.stringify(exportData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `campus-navigator-analytics-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        this.trackEvent('data_export', 'Analytics data exported');
    }

    getUsageData() {
        const days = [];
        const today = new Date();
        
        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateStr = date.toDateString();
            
            const dayEvents = this.events.filter(event => {
                const eventDate = new Date(event.timestamp).toDateString();
                return eventDate === dateStr;
            });

            days.push({
                date: dateStr,
                events: dayEvents.length,
                pageViews: dayEvents.filter(e => e.type === 'page_view').length,
                mapInteractions: dayEvents.filter(e => e.type.startsWith('map_') || e.type.startsWith('room_')).length
            });
        }

        return days;
    }
}