// Admin room management functionality
class AdminRoomManager {
    constructor() {
        this.setupAdminInterface();
        this.setupEventListeners();
    }

    setupAdminInterface() {
        // Add room management section to admin page
        const adminContainer = document.querySelector('.admin-container');
        if (!adminContainer) return;

        const roomManagementSection = document.createElement('div');
        roomManagementSection.className = 'room-management-section';
        roomManagementSection.innerHTML = `
            <div class="section-header">
                <h3>Room Management</h3>
                <button id="add-new-room-btn" class="btn-primary">Add New Room</button>
            </div>
            <div class="room-search-controls">
                <input type="text" id="admin-room-search" placeholder="Search rooms..." class="search-input">
                <select id="room-type-filter" class="filter-select">
                    <option value="">All Types</option>
                    <option value="Lecture Hall">Lecture Hall</option>
                    <option value="Laboratory">Laboratory</option>
                    <option value="Conference Room">Conference Room</option>
                    <option value="Administrative">Administrative</option>
                    <option value="Facility">Facility</option>
                    <option value="Common Area">Common Area</option>
                    <option value="Dining">Dining</option>
                    <option value="Navigation">Navigation</option>
                </select>
            </div>
            <div class="rooms-grid" id="admin-rooms-grid">
                <!-- Room cards will be populated here -->
            </div>
        `;

        // Insert before charts section
        const chartsSection = document.querySelector('.charts-section');
        if (chartsSection) {
            adminContainer.insertBefore(roomManagementSection, chartsSection);
        } else {
            adminContainer.appendChild(roomManagementSection);
        }

        this.populateRoomsGrid();
    }

    setupEventListeners() {
        // Add new room button
        document.addEventListener('click', (e) => {
            if (e.target.id === 'add-new-room-btn') {
                this.showAddRoomModal();
            }
        });

        // Search and filter
        document.addEventListener('input', (e) => {
            if (e.target.id === 'admin-room-search') {
                this.filterRooms();
            }
        });

        document.addEventListener('change', (e) => {
            if (e.target.id === 'room-type-filter') {
                this.filterRooms();
            }
        });

        // Room card actions
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('edit-room-btn')) {
                const roomId = e.target.dataset.roomId;
                this.showEditRoomModal(roomId);
            }
            
            if (e.target.classList.contains('delete-room-btn')) {
                const roomId = e.target.dataset.roomId;
                this.deleteRoom(roomId);
            }
        });
    }

    populateRoomsGrid() {
        const grid = document.getElementById('admin-rooms-grid');
        if (!grid) return;

        const rooms = window.roomDataManager.getAllRooms();
        grid.innerHTML = '';

        Object.entries(rooms).forEach(([roomId, room]) => {
            const roomCard = this.createRoomCard(roomId, room);
            grid.appendChild(roomCard);
        });
    }

    createRoomCard(roomId, room) {
        const card = document.createElement('div');
        card.className = 'room-card';
        card.innerHTML = `
            <div class="room-card-header">
                <h4>${room.name}</h4>
                <div class="room-actions">
                    <button class="edit-room-btn" data-room-id="${roomId}" title="Edit Room">✏️</button>
                    <button class="delete-room-btn" data-room-id="${roomId}" title="Delete Room">🗑️</button>
                </div>
            </div>
            <div class="room-card-content">
                <div class="room-stat">
                    <span class="stat-label">Capacity:</span>
                    <span class="stat-value">${room.capacity}</span>
                </div>
                <div class="room-stat">
                    <span class="stat-label">Type:</span>
                    <span class="stat-value">${room.type}</span>
                </div>
                <div class="room-stat">
                    <span class="stat-label">Floor:</span>
                    <span class="stat-value">${room.floor}</span>
                </div>
                <div class="room-amenities-preview">
                    ${room.amenities.slice(0, 3).map(amenity => 
                        `<span class="amenity-tag-small">${amenity}</span>`
                    ).join('')}
                    ${room.amenities.length > 3 ? `<span class="more-amenities">+${room.amenities.length - 3} more</span>` : ''}
                </div>
            </div>
        `;
        return card;
    }

    filterRooms() {
        const searchTerm = document.getElementById('admin-room-search')?.value.toLowerCase() || '';
        const typeFilter = document.getElementById('room-type-filter')?.value || '';
        
        const rooms = window.roomDataManager.getAllRooms();
        const grid = document.getElementById('admin-rooms-grid');
        if (!grid) return;

        grid.innerHTML = '';

        Object.entries(rooms).forEach(([roomId, room]) => {
            const matchesSearch = room.name.toLowerCase().includes(searchTerm) ||
                                room.description.toLowerCase().includes(searchTerm);
            const matchesType = !typeFilter || room.type === typeFilter;

            if (matchesSearch && matchesType) {
                const roomCard = this.createRoomCard(roomId, room);
                grid.appendChild(roomCard);
            }
        });
    }

    showAddRoomModal() {
        this.showRoomModal('Add New Room', null);
    }

    showEditRoomModal(roomId) {
        const room = window.roomDataManager.getRoomInfo(roomId);
        this.showRoomModal('Edit Room', { roomId, ...room });
    }

    showRoomModal(title, roomData = null) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content room-modal">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <form class="room-form">
                    <div class="form-group">
                        <label for="room-name">Room Name:</label>
                        <input type="text" id="room-name" value="${roomData?.name || ''}" required>
                    </div>
                    <div class="form-group">
                        <label for="room-capacity">Capacity:</label>
                        <input type="number" id="room-capacity" value="${roomData?.capacity || 0}" min="0" required>
                    </div>
                    <div class="form-group">
                        <label for="room-type">Type:</label>
                        <select id="room-type" required>
                            <option value="">Select Type</option>
                            <option value="Lecture Hall" ${roomData?.type === 'Lecture Hall' ? 'selected' : ''}>Lecture Hall</option>
                            <option value="Laboratory" ${roomData?.type === 'Laboratory' ? 'selected' : ''}>Laboratory</option>
                            <option value="Conference Room" ${roomData?.type === 'Conference Room' ? 'selected' : ''}>Conference Room</option>
                            <option value="Administrative" ${roomData?.type === 'Administrative' ? 'selected' : ''}>Administrative</option>
                            <option value="Facility" ${roomData?.type === 'Facility' ? 'selected' : ''}>Facility</option>
                            <option value="Common Area" ${roomData?.type === 'Common Area' ? 'selected' : ''}>Common Area</option>
                            <option value="Dining" ${roomData?.type === 'Dining' ? 'selected' : ''}>Dining</option>
                            <option value="Navigation" ${roomData?.type === 'Navigation' ? 'selected' : ''}>Navigation</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="room-floor">Floor:</label>
                        <input type="text" id="room-floor" value="${roomData?.floor || ''}" required>
                    </div>
                    <div class="form-group">
                        <label for="room-description">Description:</label>
                        <textarea id="room-description" rows="3">${roomData?.description || ''}</textarea>
                    </div>
                    <div class="form-group">
                        <label for="room-amenities">Amenities (comma-separated):</label>
                        <input type="text" id="room-amenities" value="${roomData?.amenities?.join(', ') || ''}" placeholder="WiFi, Projector, Air Conditioning">
                    </div>
                    <div class="form-actions">
                        <button type="button" class="btn-secondary cancel-btn">Cancel</button>
                        <button type="submit" class="btn-primary">${roomData ? 'Update' : 'Add'} Room</button>
                    </div>
                </form>
            </div>
        `;

        document.body.appendChild(modal);

        // Event listeners for modal
        modal.querySelector('.close-modal').addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        modal.querySelector('.cancel-btn').addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        modal.querySelector('.room-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveRoom(roomData?.roomId, modal);
            document.body.removeChild(modal);
        });

        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }

    saveRoom(roomId, modal) {
        const formData = {
            name: modal.querySelector('#room-name').value,
            capacity: parseInt(modal.querySelector('#room-capacity').value),
            type: modal.querySelector('#room-type').value,
            floor: modal.querySelector('#room-floor').value,
            description: modal.querySelector('#room-description').value,
            amenities: modal.querySelector('#room-amenities').value
                .split(',')
                .map(a => a.trim())
                .filter(a => a.length > 0)
        };

        if (!roomId) {
            // Generate new room ID
            roomId = formData.name.replace(/\s+/g, '_').toUpperCase();
        }

        window.roomDataManager.updateRoom(roomId, formData);
        this.populateRoomsGrid();

        // Track analytics
        if (window.campusNavigator?.analytics) {
            window.campusNavigator.analytics.trackEvent('room_management', 
                `${roomId ? 'Updated' : 'Added'} room: ${formData.name}`, { roomId });
        }

        // Show success notification
        if (window.adminDashboard?.showNotification) {
            window.adminDashboard.showNotification(
                `Room ${roomId ? 'updated' : 'added'} successfully!`, 
                'success'
            );
        }
    }

    deleteRoom(roomId) {
        const room = window.roomDataManager.getRoomInfo(roomId);
        
        if (confirm(`Are you sure you want to delete "${room.name}"? This action cannot be undone.`)) {
            const rooms = window.roomDataManager.getAllRooms();
            delete rooms[roomId];
            window.roomDataManager.rooms = rooms;
            window.roomDataManager.saveRoomData();
            
            this.populateRoomsGrid();

            // Track analytics
            if (window.campusNavigator?.analytics) {
                window.campusNavigator.analytics.trackEvent('room_management', 
                    `Deleted room: ${room.name}`, { roomId });
            }

            // Show success notification
            if (window.adminDashboard?.showNotification) {
                window.adminDashboard.showNotification('Room deleted successfully!', 'success');
            }
        }
    }
}

// Initialize admin room manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize if we're on admin page or admin page exists
    if (document.getElementById('admin-page')) {
        window.adminRoomManager = new AdminRoomManager();
    }
});