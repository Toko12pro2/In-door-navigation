// Room information panel component
class RoomInfoPanel {
    constructor() {
        this.currentRoom = null;
        this.isVisible = false;
        this.createPanel();
        this.setupEventListeners();
    }

    createPanel() {
        const panel = document.createElement('div');
        panel.id = 'room-info-panel';
        panel.className = 'room-info-panel';
        panel.innerHTML = `
            <div class="panel-header">
                <h3 id="room-title">🏢 Room Information</h3>
                <button id="close-panel" class="close-btn">&times;</button>
            </div>
            <div class="panel-content">
                <div class="room-details">
                    <div class="detail-item">
                        <span class="label">Capacity:</span>
                        <span id="room-capacity" class="value">-</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">Type:</span>
                        <span id="room-type" class="value">-</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">Floor:</span>
                        <span id="room-floor" class="value">-</span>
                    </div>
                    <div class="detail-item description">
                        <span class="label">Description:</span>
                        <p id="room-description" class="value">-</p>
                    </div>
                    <div class="detail-item amenities">
                        <span class="label">Amenities:</span>
                        <div id="room-amenities" class="amenities-list"></div>
                    </div>
                </div>
                <div class="panel-actions">
                    <button id="highlight-room-btn" class="btn-primary">
                        <span class="button-icon">🎯</span>Highlight Room
                    </button>
                    <button id="get-directions-btn" class="btn-secondary">
                        <span class="button-icon">🧭</span>Get Directions
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(panel);
    }

    setupEventListeners() {
        document.getElementById('close-panel').addEventListener('click', () => {
            this.hide();
        });

        document.getElementById('highlight-room-btn').addEventListener('click', () => {
            if (this.currentRoom) {
                this.highlightRoom(this.currentRoom);
            }
        });

        document.getElementById('get-directions-btn').addEventListener('click', () => {
            if (this.currentRoom) {
                this.showDirections(this.currentRoom);
            }
        });

        // Close panel when clicking outside
        document.addEventListener('click', (e) => {
            const panel = document.getElementById('room-info-panel');
            if (this.isVisible && !panel.contains(e.target) && !e.target.closest('.room-clickable')) {
                this.hide();
            }
        });

        // Close panel with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isVisible) {
                this.hide();
            }
        });
    }

    show(roomId, position = null) {
        const roomInfo = window.roomDataManager.getRoomInfo(roomId);
        this.currentRoom = roomId;
        this.isVisible = true;

        // Update panel content with enhanced styling
        document.getElementById('room-title').innerHTML = `🏢 ${roomInfo.name}`;
        document.getElementById('room-capacity').innerHTML = `👥 ${roomInfo.capacity} people`;
        document.getElementById('room-type').innerHTML = `🏷️ ${roomInfo.type}`;
        document.getElementById('room-floor').innerHTML = `🏢 ${roomInfo.floor}`;
        document.getElementById('room-description').textContent = roomInfo.description;

        // Update amenities with enhanced styling
        const amenitiesContainer = document.getElementById('room-amenities');
        amenitiesContainer.innerHTML = '';
        
        if (roomInfo.amenities.length === 0) {
            const noAmenities = document.createElement('span');
            noAmenities.className = 'no-amenities';
            noAmenities.textContent = 'No amenities listed';
            noAmenities.style.color = '#999';
            noAmenities.style.fontStyle = 'italic';
            amenitiesContainer.appendChild(noAmenities);
        } else {
            roomInfo.amenities.forEach(amenity => {
                const tag = document.createElement('span');
                tag.className = 'amenity-tag';
                
                // Add icons for common amenities
                const amenityIcons = {
                    'WiFi': '📶',
                    'Projector': '📽️',
                    'Air Conditioning': '❄️',
                    'Whiteboard': '📝',
                    'Sound System': '🔊',
                    'Stage': '🎭',
                    'Computers': '💻',
                    'Internet': '🌐',
                    'Printer': '🖨️',
                    'Network Simulators': '🔗',
                    'Cisco Equipment': '📡',
                    'Running Water': '🚰',
                    'Hand Dryers': '🌪️',
                    'Emergency Exit': '🚪',
                    'Handrails': '🤲',
                    'Tables': '🪑',
                    'Chairs': '💺',
                    'Food Service': '🍽️',
                    'Refrigeration': '🧊',
                    'Comfortable Seating': '🛋️',
                    'Study Tables': '📚',
                    'Conference Table': '🪑',
                    'Private Bathroom': '🚿',
                    'Secretary Area': '👩‍💼',
                    'Video Conferencing': '📹',
                    'Safe': '🔒',
                    'Filing Cabinets': '🗄️',
                    'Service Counter': '🏪',
                    'Waiting Area': '⏳'
                };
                
                const icon = amenityIcons[amenity] || '⭐';
                tag.innerHTML = `${icon} ${amenity}`;
                amenitiesContainer.appendChild(tag);
            });
        }

        // Show and position panel with animation
        const panel = document.getElementById('room-info-panel');
        panel.classList.remove('hiding');
        panel.classList.add('visible');

        if (position) {
            const panelWidth = 320;
            const panelHeight = 500;
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            
            // Calculate optimal position
            let left = Math.min(position.x + 10, viewportWidth - panelWidth - 20);
            let top = Math.min(position.y - panelHeight/2, viewportHeight - panelHeight - 20);
            
            // Ensure panel stays within viewport
            left = Math.max(20, left);
            top = Math.max(20, top);
            
            panel.style.left = `${left}px`;
            panel.style.top = `${top}px`;
            panel.style.right = 'auto';
            panel.style.transform = 'none';
        } else {
            // Default position
            panel.style.right = '20px';
            panel.style.top = '50%';
            panel.style.left = 'auto';
            panel.style.transform = 'translateY(-50%)';
        }

        // Track analytics
        if (window.campusNavigator?.analytics) {
            window.campusNavigator.analytics.trackEvent('room_info_view', `Viewed info for ${roomInfo.name}`, { roomId });
        }
    }

    hide() {
        this.isVisible = false;
        this.currentRoom = null;
        const panel = document.getElementById('room-info-panel');
        
        // Add hiding animation
        panel.classList.remove('visible');
        panel.classList.add('hiding');
        
        // Reset position after animation
        setTimeout(() => {
            panel.style.right = '-350px';
            panel.style.left = 'auto';
            panel.style.top = '50%';
            panel.style.transform = 'translateY(-50%)';
            panel.classList.remove('hiding');
        }, 400);
    }

    highlightRoom(roomId) {
        const select = document.getElementById('roomSelect');
        if (select) {
            // Clear previous selections
            for (let i = 0; i < select.options.length; i++) {
                select.options[i].selected = false;
            }
            
            // Select the current room
            for (let i = 0; i < select.options.length; i++) {
                if (select.options[i].value === roomId) {
                    select.options[i].selected = true;
                    break;
                }
            }
            
            if (window.highlightSelected) {
                window.highlightSelected();
            }
            
            // Show success notification
            if (window.campusNavigator?.showNotification) {
                const roomInfo = window.roomDataManager.getRoomInfo(roomId);
                window.campusNavigator.showNotification(`🎯 ${roomInfo.name} highlighted!`, 'success');
            }
        }
    }

    showDirections(roomId) {
        const roomInfo = window.roomDataManager.getRoomInfo(roomId);
        
        // Create a more detailed directions modal
        const directionsModal = document.createElement('div');
        directionsModal.className = 'modal-overlay';
        directionsModal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>🧭 Directions to ${roomInfo.name}</h3>
                    <button class="close-modal" onclick="this.closest('.modal-overlay').remove()">&times;</button>
                </div>
                <div style="padding: 30px;">
                    <div style="margin-bottom: 20px;">
                        <h4 style="color: #333; margin-bottom: 10px;">📍 Location Details:</h4>
                        <p><strong>Floor:</strong> ${roomInfo.floor}</p>
                        <p><strong>Type:</strong> ${roomInfo.type}</p>
                        <p><strong>Capacity:</strong> ${roomInfo.capacity} people</p>
                    </div>
                    
                    <div style="margin-bottom: 20px;">
                        <h4 style="color: #333; margin-bottom: 10px;">🗺️ Navigation Instructions:</h4>
                        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #667eea;">
                            ${this.generateDirections(roomInfo)}
                        </div>
                    </div>
                    
                    <div style="text-align: center; margin-top: 25px;">
                        <button onclick="this.closest('.modal-overlay').remove()" class="btn-primary">
                            <span class="button-icon">✅</span>Got it!
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(directionsModal);
        
        // Close modal when clicking outside
        directionsModal.addEventListener('click', (e) => {
            if (e.target === directionsModal) {
                directionsModal.remove();
            }
        });
        
        // Track analytics
        if (window.campusNavigator?.analytics) {
            window.campusNavigator.analytics.trackEvent('directions_requested', `Requested directions to ${roomInfo.name}`, { roomId });
        }
    }

    generateDirections(roomInfo) {
        const floorInstructions = {
            'Second Floor': '1. Take the main entrance to the building<br>2. Use the central staircase or elevator to reach the second floor<br>3. Follow the corridor signs to locate your room',
            'First Floor': '1. Enter through the main building entrance<br>2. The room is located on the ground level<br>3. Follow the directional signs in the main hallway',
            'Basement': '1. Enter the main building<br>2. Take the stairs or elevator down to the basement level<br>3. Follow the basement corridor to your destination',
            'Fourth Floor': '1. Enter through the main building entrance<br>2. Take the elevator or stairs to the fourth floor<br>3. Administrative offices are typically well-marked on this floor'
        };
        
        const typeSpecificInstructions = {
            'Laboratory': '🔬 Look for laboratory signs and safety notices near the entrance',
            'Lecture Hall': '🎓 Large rooms typically located near main corridors',
            'Administrative': '🏢 Usually found in the administrative wing with clear office signage',
            'Conference Room': '🤝 Often located near administrative areas',
            'Facility': '🚻 Look for standard facility signage',
            'Navigation': '🪜 Stairways are typically at building corners or central locations',
            'Common Area': '🛋️ Usually in open, accessible areas of the building',
            'Dining': '🍽️ Located in areas with food service access'
        };
        
        let directions = floorInstructions[roomInfo.floor] || 'Please consult building directory for specific directions.';
        
        if (typeSpecificInstructions[roomInfo.type]) {
            directions += '<br><br><strong>Additional Tip:</strong><br>' + typeSpecificInstructions[roomInfo.type];
        }
        
        return directions;
    }
}

// Initialize room info panel
window.roomInfoPanel = new RoomInfoPanel();