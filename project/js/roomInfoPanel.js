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
                <h3 id="room-title">Room Information</h3>
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
                    <button id="highlight-room-btn" class="btn-primary">Highlight Room</button>
                    <button id="get-directions-btn" class="btn-secondary">Get Directions</button>
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
    }

    show(roomId, position = null) {
        const roomInfo = window.roomDataManager.getRoomInfo(roomId);
        this.currentRoom = roomId;
        this.isVisible = true;

        // Update panel content
        document.getElementById('room-title').textContent = roomInfo.name;
        document.getElementById('room-capacity').textContent = `${roomInfo.capacity} people`;
        document.getElementById('room-type').textContent = roomInfo.type;
        document.getElementById('room-floor').textContent = roomInfo.floor;
        document.getElementById('room-description').textContent = roomInfo.description;

        // Update amenities
        const amenitiesContainer = document.getElementById('room-amenities');
        amenitiesContainer.innerHTML = '';
        roomInfo.amenities.forEach(amenity => {
            const tag = document.createElement('span');
            tag.className = 'amenity-tag';
            tag.textContent = amenity;
            amenitiesContainer.appendChild(tag);
        });

        // Show and position panel
        const panel = document.getElementById('room-info-panel');
        panel.classList.add('visible');
        panel.style.right = '20px';
        panel.style.transform = 'translateY(-50%)';

        if (position) {
            panel.style.left = `${Math.min(position.x + 10, window.innerWidth - 320)}px`;
            panel.style.top = `${Math.min(position.y + 10, window.innerHeight - 400)}px`;
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
        panel.classList.remove('visible');
        panel.style.right = '-350px';
        panel.style.transform = 'none';
    }

    highlightRoom(roomId) {
        const select = document.getElementById('roomSelect');
        if (select) {
            for (let i = 0; i < select.options.length; i++) {
                if (select.options[i].value === roomId) {
                    select.options[i].selected = true;
                    break;
                }
            }
            if (window.highlightSelected) {
                window.highlightSelected();
            }
        }
    }

    showDirections(roomId) {
        const roomInfo = window.roomDataManager.getRoomInfo(roomId);
        alert(`Directions to ${roomInfo.name}:\n\nFloor: ${roomInfo.floor}\nType: ${roomInfo.type}\n\nPlease follow the highlighted path on the map.`);
    }
}

// Initialize room info panel
window.roomInfoPanel = new RoomInfoPanel();
