// Map rendering and interaction system
class MapRenderer {
    constructor(analytics, roomDataManager) {
        this.analytics = analytics;
        this.roomDataManager = roomDataManager;
        this.currentFloor = 'second';
        this.viewBox = { x: 0, y: 0, width: 1440, height: 1024 };
        this.isPanning = false;
        this.startPoint = { x: 0, y: 0 };
        this.svg = null;
    }

    renderMap() {
        const mapContent = `
            <div class="map-content-wrapper">
                <h2>🗺️ ICT University Campus Navigator</h2>
                <div class="map-controls">
                    <div class="control-group">
                        <input id="roomSearch" onkeyup="app.mapRenderer.filterRooms()" placeholder="🔍 Search rooms..." 
                               style="margin-bottom: 8px; padding: 12px; font-size: 16px; width: 240px; border: 2px solid #ddd; border-radius: 8px;" type="text"/>
                        <select id="roomSelect" multiple size="6" style="width: 250px; padding: 8px; border: 2px solid #ddd; border-radius: 8px;">
                            ${this.generateRoomOptions()}
                        </select>
                    </div>
                    <div class="control-buttons">
                        <button onclick="app.mapRenderer.highlightSelected()" class="btn-animated">
                            <span class="button-icon">🎯</span>Highlight Selected
                        </button>
                        <button onclick="app.mapRenderer.resetHighlights()" class="btn-animated">
                            <span class="button-icon">🔄</span>Reset
                        </button>
                        <button onclick="app.mapRenderer.showRoomCapacities()" class="btn-animated">
                            <span class="button-icon">👥</span>Show Capacities
                        </button>
                    </div>
                </div>
                <div class="floor-selector">
                    <button onclick="app.mapRenderer.showFloor('second')" class="floor-btn active hover-lift" id="floor-second">
                        <span class="button-icon">2️⃣</span>Second Floor
                    </button>
                    <button onclick="app.mapRenderer.showFloor('first')" class="floor-btn hover-lift" id="floor-first">
                        <span class="button-icon">1️⃣</span>First Floor
                    </button>
                    <button onclick="app.mapRenderer.showFloor('basement')" class="floor-btn hover-lift" id="floor-basement">
                        <span class="button-icon">🏠</span>Basement
                    </button>
                    <button onclick="app.mapRenderer.showFloor('fourth')" class="floor-btn hover-lift" id="floor-fourth">
                        <span class="button-icon">4️⃣</span>Fourth Floor
                    </button>
                </div>
                <div id="svgContainer">
                    <div class="zoom-controls">
                        <button onclick="app.mapRenderer.zoom(1.2)" class="hover-scale">
                            <span class="button-icon">🔍</span>Zoom In
                        </button>
                        <button onclick="app.mapRenderer.zoom(0.8)" class="hover-scale">
                            <span class="button-icon">🔍</span>Zoom Out
                        </button>
                        <button onclick="app.mapRenderer.resetZoom()" class="hover-scale">
                            <span class="button-icon">🎯</span>Reset View
                        </button>
                    </div>
                    <div class="zoom-wrapper">
                        ${this.generateSVGMap()}
                    </div>
                </div>
            </div>
        `;
        
        document.getElementById('map-content').innerHTML = mapContent;
        this.setupMapInteractivity();
    }

    generateRoomOptions() {
        const rooms = this.roomDataManager.getAllRooms();
        let options = '';
        
        for (const [id, room] of Object.entries(rooms)) {
            const icon = this.getRoomIcon(room.type);
            options += `<option value="${id}">${icon} ${room.name}</option>`;
        }
        
        return options;
    }

    getRoomIcon(type) {
        const icons = {
            'Lecture Hall': '🏛️',
            'Laboratory': '🔬',
            'Conference Room': '🤝',
            'Administrative': '🏢',
            'Facility': '🚻',
            'Navigation': '🪜',
            'Common Area': '🛋️',
            'Dining': '🍽️',
            'Storage': '📦'
        };
        return icons[type] || '🏢';
    }

    generateSVGMap() {
        return `
            <svg fill="none" height="1024" id="zoomSvg" viewBox="0 0 1440 1024" width="1440" xmlns="http://www.w3.org/2000/svg">
                ${this.generateSecondFloor()}
                ${this.generateFirstFloor()}
                ${this.generateBasementFloor()}
                ${this.generateFourthFloor()}
            </svg>
        `;
    }

    generateSecondFloor() {
        return `
            <g id="second-floor" class="floor-layer active">
                <rect fill="white" height="1024" width="1440"></rect>
                
                <!-- IT Hall -->
                <g id="IT_HALL" class="room-clickable hover-lift">
                    <rect fill="#FF6B6B" height="448" width="493" x="0.5" y="0.5" stroke="#333" stroke-width="2"></rect>
                    <text dominant-baseline="central" fill="white" font-family="Arial" font-size="32" font-weight="bold" text-anchor="middle" x="247.0" y="224.5">IT HALL</text>
                </g>
                
                <!-- Terry & Linda Byrd Hall -->
                <g id="TERRY_&_LINDA_BYRD_HALL" class="room-clickable hover-lift">
                    <rect fill="#4ECDC4" height="448" width="469" x="494.5" y="0.5" stroke="#333" stroke-width="2"></rect>
                    <text dominant-baseline="central" fill="white" font-family="Arial" font-size="24" font-weight="bold" text-anchor="middle" x="729.0" y="224.5">TERRY & LINDA BYRD HALL</text>
                </g>
                
                <!-- Computer Lab -->
                <g id="COMPUTER_LAB" class="room-clickable hover-lift">
                    <rect fill="#45B7D1" height="448" width="475" x="964.5" y="0.5" stroke="#333" stroke-width="2"></rect>
                    <text dominant-baseline="central" fill="white" font-family="Arial" font-size="32" font-weight="bold" text-anchor="middle" x="1202.0" y="224.5">COMPUTER LAB</text>
                </g>
                
                <!-- B.S. Chumbow Hall -->
                <g id="B.S._CHUMBOW_HALL" class="room-clickable hover-lift">
                    <rect fill="#96CEB4" height="332" width="606" x="0.5" y="691.5" stroke="#333" stroke-width="2"></rect>
                    <text dominant-baseline="central" fill="white" font-family="Arial" font-size="28" font-weight="bold" text-anchor="middle" x="303.5" y="857.5">B.S. CHUMBOW HALL</text>
                </g>
                
                <!-- Cisco Lab -->
                <g id="CISCO_LAB" class="room-clickable hover-lift">
                    <rect fill="#FFEAA7" height="332" width="553" x="886.5" y="691.5" stroke="#333" stroke-width="2"></rect>
                    <text dominant-baseline="central" fill="black" font-family="Arial" font-size="32" font-weight="bold" text-anchor="middle" x="1163.0" y="857.5">CISCO LAB</text>
                </g>
                
                <!-- Restrooms -->
                <g id="RESTROOMS" class="room-clickable hover-lift">
                    <rect fill="#74B9FF" height="241" width="166" x="0.5" y="449.5" stroke="#333" stroke-width="2"></rect>
                    <text dominant-baseline="central" fill="white" font-family="Arial" font-size="18" font-weight="bold" text-anchor="middle" x="83.5" y="570.0">RESTROOMS</text>
                </g>
                
                <!-- Stairs to First Floor -->
                <g id="STAIRS_TO_FIRST_FLOOR" class="room-clickable hover-lift">
                    <rect fill="#DDA0DD" height="269" width="127" x="607.5" y="754.5" stroke="#333" stroke-width="2"></rect>
                    <text dominant-baseline="central" fill="white" font-family="Arial" font-size="10" font-weight="bold" text-anchor="middle" x="671.0" y="889.0">STAIRS TO FIRST FLOOR</text>
                </g>
                
                <!-- Stairs to Third Floor -->
                <g id="STAIRS_TO_THIRD_FLOOR" class="room-clickable hover-lift">
                    <rect fill="#FD79A8" height="269" width="127" x="758.5" y="754.5" stroke="#333" stroke-width="2"></rect>
                    <text dominant-baseline="central" fill="white" font-family="Arial" font-size="10" font-weight="bold" text-anchor="middle" x="822.0" y="889.0">STAIRS TO THIRD FLOOR</text>
                </g>
            </g>
        `;
    }

    generateFirstFloor() {
        return `
            <g id="first-floor" class="floor-layer" style="display: none;">
                <rect fill="#F0F8FF" height="1024" width="1440"></rect>
                
                <!-- Pondi Hall -->
                <g id="Pondi_Hall" class="room-clickable hover-lift">
                    <rect fill="#FF6B6B" height="542" width="365" x="0.5" y="0.5" stroke="#333" stroke-width="2"></rect>
                    <text dominant-baseline="central" fill="white" font-family="Arial" font-size="32" font-weight="bold" text-anchor="middle" x="183" y="271">Pondi Hall</text>
                </g>
                
                <!-- Cantine -->
                <g id="Cantine" class="room-clickable hover-lift">
                    <rect fill="#4ECDC4" height="480" width="716" x="0.5" y="543.5" stroke="#333" stroke-width="2"></rect>
                    <text dominant-baseline="central" fill="white" font-family="Arial" font-size="36" font-weight="bold" text-anchor="middle" x="358" y="783">Cantine</text>
                </g>
                
                <!-- Lounge -->
                <g id="Lounge" class="room-clickable hover-lift">
                    <rect fill="#45B7D1" height="1023" width="414" x="1025.5" y="0.5" stroke="#333" stroke-width="2"></rect>
                    <text dominant-baseline="central" fill="white" font-family="Arial" font-size="36" font-weight="bold" text-anchor="middle" x="1232" y="512">Lounge</text>
                </g>
                
                <!-- Basement Stairs Up -->
                <g id="Basement_Stairs_up" class="room-clickable hover-lift">
                    <rect fill="#96CEB4" height="362" width="134" x="717.5" y="661.5" stroke="#333" stroke-width="2"></rect>
                    <text dominant-baseline="central" fill="white" font-family="Arial" font-size="14" font-weight="bold" text-anchor="middle" x="784" y="838">Basement Stairs Up</text>
                </g>
                
                <!-- Basement Stairs Down -->
                <g id="Basement_Stairs_down" class="room-clickable hover-lift">
                    <rect fill="#FFEAA7" height="362" width="153" x="871.5" y="661.5" stroke="#333" stroke-width="2"></rect>
                    <text dominant-baseline="central" fill="black" font-family="Arial" font-size="14" font-weight="bold" text-anchor="middle" x="948" y="838">Basement Stairs Down</text>
                </g>
                
                <!-- Basement Storage -->
                <g id="Basement" class="room-clickable hover-lift">
                    <rect fill="#74B9FF" height="161" width="357" x="513.5" y="188.5" stroke="#333" stroke-width="2"></rect>
                    <text dominant-baseline="central" fill="white" font-family="Arial" font-size="24" font-weight="bold" text-anchor="middle" x="692" y="269">Basement Storage</text>
                </g>
            </g>
        `;
    }

    generateBasementFloor() {
        return `
            <g id="basement-floor" class="floor-layer" style="display: none;">
                <rect fill="#F5F5F5" height="1024" width="1440"></rect>
                
                <!-- Same as first floor for now - can be customized -->
                <g id="Pondi_Hall_Basement" class="room-clickable hover-lift">
                    <rect fill="#FF6B6B" height="542" width="365" x="0.5" y="0.5" stroke="#333" stroke-width="2"></rect>
                    <text dominant-baseline="central" fill="white" font-family="Arial" font-size="32" font-weight="bold" text-anchor="middle" x="183" y="271">Pondi Hall</text>
                </g>
                
                <g id="Cantine_Basement" class="room-clickable hover-lift">
                    <rect fill="#4ECDC4" height="480" width="716" x="0.5" y="543.5" stroke="#333" stroke-width="2"></rect>
                    <text dominant-baseline="central" fill="white" font-family="Arial" font-size="36" font-weight="bold" text-anchor="middle" x="358" y="783">Cantine</text>
                </g>
                
                <g id="Lounge_Basement" class="room-clickable hover-lift">
                    <rect fill="#45B7D1" height="1023" width="414" x="1025.5" y="0.5" stroke="#333" stroke-width="2"></rect>
                    <text dominant-baseline="central" fill="white" font-family="Arial" font-size="36" font-weight="bold" text-anchor="middle" x="1232" y="512">Lounge</text>
                </g>
            </g>
        `;
    }

    generateFourthFloor() {
        return `
            <g id="fourth-floor" class="floor-layer" style="display: none;">
                <rect fill="white" height="1024" width="1440"></rect>
                
                <!-- Vice-Chancellor's Office -->
                <g id="VICE_CHANCELLORS_OFFICE" class="room-clickable hover-lift">
                    <rect fill="#FF6B6B" height="393" width="266" x="0.5" y="0.5" stroke="black" stroke-width="2"></rect>
                    <text dominant-baseline="middle" fill="white" font-family="Arial" font-size="12" font-weight="bold" text-anchor="start" x="10" y="30">VICE-CHANCELLOR'S</text>
                    <text dominant-baseline="middle" fill="white" font-family="Arial" font-size="12" font-weight="bold" text-anchor="start" x="10" y="50">OFFICE</text>
                </g>
                
                <!-- P.A. to the VC -->
                <g id="PA_TO_THE_VC" class="room-clickable hover-lift">
                    <rect fill="#4ECDC4" height="194" width="226" x="267.5" y="0.5" stroke="black" stroke-width="2"></rect>
                    <text dominant-baseline="middle" fill="white" font-family="Arial" font-size="11" font-weight="bold" text-anchor="start" x="277" y="30">P.A. TO THE VC</text>
                </g>
                
                <!-- Administrative Assistant -->
                <g id="ADMINISTRATIVE_ASSISTANT" class="room-clickable hover-lift">
                    <rect fill="#45B7D1" height="198" width="226" x="267.5" y="195.5" stroke="black" stroke-width="2"></rect>
                    <text dominant-baseline="middle" fill="white" font-family="Arial" font-size="10" font-weight="bold" text-anchor="start" x="277" y="285">ADMINISTRATIVE</text>
                    <text dominant-baseline="middle" fill="white" font-family="Arial" font-size="10" font-weight="bold" text-anchor="start" x="277" y="305">ASSISTANT</text>
                </g>
                
                <!-- Conference Hall Central -->
                <g id="CONFERENCE_HALL_CENTRAL" class="room-clickable hover-lift">
                    <rect fill="#96CEB4" height="194" width="537" x="494.5" y="0.5" stroke="black" stroke-width="2"></rect>
                    <text dominant-baseline="middle" fill="white" font-family="Arial" font-size="14" font-weight="bold" text-anchor="start" x="504" y="90">CONFERENCE HALL</text>
                    <text dominant-baseline="middle" fill="white" font-family="Arial" font-size="14" font-weight="bold" text-anchor="start" x="504" y="110">CENTRAL</text>
                </g>
                
                <!-- Director of Marketing -->
                <g id="DIR_OF_MARKETING" class="room-clickable hover-lift">
                    <rect fill="#FFEAA7" height="194" width="256" x="1032.5" y="0.5" stroke="black" stroke-width="2"></rect>
                    <text dominant-baseline="middle" fill="black" font-family="Arial" font-size="11" font-weight="bold" text-anchor="start" x="1042" y="90">DIR. OF</text>
                    <text dominant-baseline="middle" fill="black" font-family="Arial" font-size="11" font-weight="bold" text-anchor="start" x="1042" y="110">MARKETING</text>
                </g>
                
                <!-- Deputy Vice-Chancellor -->
                <g id="DEPUTY_VICE_CHANCELLOR" class="room-clickable hover-lift">
                    <rect fill="#74B9FF" height="393" width="150" x="1289.5" y="0.5" stroke="black" stroke-width="2"></rect>
                    <text dominant-baseline="middle" fill="white" font-family="Arial" font-size="9" font-weight="bold" text-anchor="start" x="1299" y="180">DEPUTY</text>
                    <text dominant-baseline="middle" fill="white" font-family="Arial" font-size="9" font-weight="bold" text-anchor="start" x="1299" y="200">VICE-CHANCELLOR</text>
                </g>
                
                <!-- Restrooms -->
                <g id="RESTROOMS_4TH" class="room-clickable hover-lift">
                    <rect fill="#DDA0DD" height="235" width="162" x="0.5" y="394.5" stroke="black" stroke-width="2"></rect>
                    <text dominant-baseline="middle" fill="white" font-family="Arial" font-size="14" font-weight="bold" text-anchor="middle" x="81.5" y="512">RESTROOMS</text>
                </g>
                
                <!-- Fourth Floor Stairs -->
                <g id="FOURTH_FLOOR_STAIRS" class="room-clickable hover-lift">
                    <rect fill="#FD79A8" height="124" width="300" x="613" y="450" stroke="black" stroke-width="2"></rect>
                    <text dominant-baseline="middle" fill="white" font-family="Arial" font-size="16" font-weight="bold" text-anchor="middle" x="763" y="512">FOURTH FLOOR</text>
                </g>
                
                <!-- Store Room -->
                <g id="STORE_ROOM" class="room-clickable hover-lift">
                    <rect fill="#A29BFE" height="203" width="266" x="0.5" y="628.5" stroke="black" stroke-width="2"></rect>
                    <text dominant-baseline="middle" fill="white" font-family="Arial" font-size="14" font-weight="bold" text-anchor="middle" x="133.5" y="730">STORE-ROOM</text>
                </g>
                
                <!-- Transcript Office -->
                <g id="TRANSCRIPT_OFFICE" class="room-clickable hover-lift">
                    <rect fill="#6C5CE7" height="191" width="266" x="0.5" y="832.5" stroke="black" stroke-width="2"></rect>
                    <text dominant-baseline="middle" fill="white" font-family="Arial" font-size="12" font-weight="bold" text-anchor="middle" x="133.5" y="928">TRANSCRIPT OFFICE</text>
                </g>
                
                <!-- P.A. to the Rector -->
                <g id="PA_TO_THE_RECTOR" class="room-clickable hover-lift">
                    <rect fill="#00B894" height="189" width="199" x="394.5" y="642.5" stroke="black" stroke-width="2"></rect>
                    <text dominant-baseline="middle" fill="white" font-family="Arial" font-size="11" font-weight="bold" text-anchor="middle" x="494" y="730">P.A. TO THE</text>
                    <text dominant-baseline="middle" fill="white" font-family="Arial" font-size="11" font-weight="bold" text-anchor="middle" x="494" y="750">RECTOR</text>
                </g>
                
                <!-- Stairs Up -->
                <g id="STAIRS_UP_4TH" class="room-clickable hover-lift">
                    <rect fill="#E17055" height="191" width="199" x="394.5" y="832.5" stroke="black" stroke-width="2"></rect>
                    <text dominant-baseline="middle" fill="white" font-family="Arial" font-size="14" font-weight="bold" text-anchor="middle" x="494" y="928">STAIRS UP</text>
                </g>
                
                <!-- Stairs Down -->
                <g id="STAIRS_DOWN_4TH" class="room-clickable hover-lift">
                    <rect fill="#FDCB6E" height="256" width="129" x="594.5" y="767.5" stroke="black" stroke-width="2"></rect>
                    <text dominant-baseline="middle" fill="black" font-family="Arial" font-size="12" font-weight="bold" text-anchor="middle" x="659" y="895">STAIRS DOWN</text>
                </g>
                
                <!-- Additional Room -->
                <g id="ADDITIONAL_ROOM_4TH" class="room-clickable hover-lift">
                    <rect fill="#81ECEC" height="256" width="138" x="750.5" y="767.5" stroke="black" stroke-width="2"></rect>
                    <text dominant-baseline="middle" fill="black" font-family="Arial" font-size="12" font-weight="bold" text-anchor="middle" x="819.5" y="895">MEETING ROOM</text>
                </g>
                
                <!-- Finance Office -->
                <g id="FINANCE_OFFICE" class="room-clickable hover-lift">
                    <rect fill="#00CEC9" height="193" width="230" x="889.5" y="642.5" stroke="black" stroke-width="2"></rect>
                    <text dominant-baseline="middle" fill="white" font-family="Arial" font-size="12" font-weight="bold" text-anchor="middle" x="1004.5" y="739">FINANCE OFFICE</text>
                </g>
                
                <!-- Bursary -->
                <g id="BURSARY" class="room-clickable hover-lift">
                    <rect fill="#55A3FF" height="187" width="230" x="889.5" y="836.5" stroke="black" stroke-width="2"></rect>
                    <text dominant-baseline="middle" fill="white" font-family="Arial" font-size="14" font-weight="bold" text-anchor="middle" x="1004.5" y="930">BURSARY</text>
                </g>
                
                <!-- Quality Control -->
                <g id="QUALITY_CONTROL" class="room-clickable hover-lift">
                    <rect fill="#FF7675" height="395" width="319" x="1120.5" y="628.5" stroke="black" stroke-width="2"></rect>
                    <text dominant-baseline="middle" fill="white" font-family="Arial" font-size="14" font-weight="bold" text-anchor="middle" x="1280" y="826">QUALITY CONTROL</text>
                </g>
            </g>
        `;
    }

    setupMapInteractivity() {
        setTimeout(() => {
            this.svg = document.getElementById("zoomSvg");
            if (!this.svg) return;

            this.setupZoomAndPan();
            this.setupRoomClickHandlers();
        }, 100);
    }

    setupZoomAndPan() {
        this.svg.addEventListener("mousedown", (e) => {
            this.isPanning = true;
            this.startPoint = { x: e.clientX, y: e.clientY };
            this.svg.style.cursor = "grabbing";
        });

        this.svg.addEventListener("mousemove", (e) => {
            if (!this.isPanning) return;
            const dx = (e.clientX - this.startPoint.x) * (this.viewBox.width / this.svg.clientWidth);
            const dy = (e.clientY - this.startPoint.y) * (this.viewBox.height / this.svg.clientHeight);
            this.viewBox.x -= dx;
            this.viewBox.y -= dy;
            this.startPoint = { x: e.clientX, y: e.clientY };
            this.updateViewBox();
        });

        this.svg.addEventListener("mouseup", () => {
            this.isPanning = false;
            this.svg.style.cursor = "grab";
        });

        this.svg.addEventListener("mouseleave", () => {
            this.isPanning = false;
            this.svg.style.cursor = "grab";
        });

        this.updateViewBox();
    }

    setupRoomClickHandlers() {
        document.querySelectorAll('.room-clickable').forEach(room => {
            room.addEventListener('click', (e) => {
                e.stopPropagation();
                const roomId = room.id;
                const rect = room.getBoundingClientRect();
                const position = {
                    x: rect.right,
                    y: rect.top + (rect.height / 2)
                };
                
                if (window.app && window.app.roomInfoPanel) {
                    window.app.roomInfoPanel.show(roomId, position);
                }
                
                this.analytics.trackEvent('room_click', `Clicked on room: ${roomId}`, { roomId });
            });

            room.addEventListener('mouseenter', () => {
                room.classList.add('hovered');
            });

            room.addEventListener('mouseleave', () => {
                room.classList.remove('hovered');
            });
        });
    }

    updateViewBox() {
        if (this.svg) {
            this.svg.setAttribute("viewBox", `${this.viewBox.x} ${this.viewBox.y} ${this.viewBox.width} ${this.viewBox.height}`);
        }
    }

    zoom(factor) {
        this.viewBox.width /= factor;
        this.viewBox.height /= factor;
        this.updateViewBox();
        this.analytics.trackEvent('map_zoom', `Zoom ${factor > 1 ? 'in' : 'out'}`);
    }

    resetZoom() {
        this.viewBox = { x: 0, y: 0, width: 1440, height: 1024 };
        this.updateViewBox();
        this.analytics.trackEvent('map_reset', 'Map view reset');
    }

    showFloor(floor) {
        // Hide all floors
        document.querySelectorAll('.floor-layer').forEach(layer => {
            layer.style.display = 'none';
        });
        
        // Remove active class from all buttons
        document.querySelectorAll('.floor-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Show selected floor
        const floorLayer = document.getElementById(`${floor}-floor`);
        if (floorLayer) {
            floorLayer.style.display = 'block';
        }
        
        // Add active class to selected button
        const floorBtn = document.getElementById(`floor-${floor}`);
        if (floorBtn) {
            floorBtn.classList.add('active');
        }
        
        this.currentFloor = floor;
        this.analytics.trackEvent('floor_change', `Switched to ${floor} floor`);
    }

    highlightSelected() {
        const selected = Array.from(document.getElementById('roomSelect').selectedOptions).map(opt => opt.value);

        document.querySelectorAll('g').forEach(g => {
            g.classList.remove('highlighted');
            g.querySelectorAll('rect').forEach(r => {
                r.removeAttribute('data-original-fill');
                r.style.fill = '';
            });
        });

        selected.forEach(id => {
            const group = document.getElementById(id);
            if (group) {
                group.classList.add('highlighted');
                group.querySelectorAll('rect').forEach(r => {
                    if (!r.hasAttribute('data-original-fill')) {
                        r.setAttribute('data-original-fill', r.getAttribute('fill') || 'none');
                    }
                    r.style.fill = '#00FF00';
                });
            }
        });

        this.analytics.trackEvent('room_highlight', `Highlighted ${selected.length} rooms: ${selected.join(', ')}`);
    }

    resetHighlights() {
        document.querySelectorAll('g').forEach(g => {
            g.classList.remove('highlighted');
            g.classList.remove('hovered');
            g.querySelectorAll('rect').forEach(r => {
                const original = r.getAttribute('data-original-fill');
                if (original) {
                    r.style.fill = original;
                    r.removeAttribute('data-original-fill');
                }
            });
            // Remove capacity displays
            const capacityDisplay = g.querySelector('.capacity-display');
            if (capacityDisplay) {
                capacityDisplay.remove();
            }
        });
        document.getElementById('roomSelect').selectedIndex = -1;
        this.analytics.trackEvent('room_reset', 'Room highlights reset');
    }

    showRoomCapacities() {
        const rooms = this.roomDataManager.getAllRooms();
        document.querySelectorAll('.room-clickable').forEach(room => {
            const roomInfo = rooms[room.id];
            if (roomInfo) {
                // Remove existing capacity display
                const existingCapacity = room.querySelector('.capacity-display');
                if (existingCapacity) {
                    existingCapacity.remove();
                    return;
                }
                
                // Add capacity display
                const rect = room.querySelector('rect');
                if (rect) {
                    const capacityText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                    capacityText.setAttribute('class', 'capacity-display');
                    capacityText.setAttribute('x', parseFloat(rect.getAttribute('x')) + parseFloat(rect.getAttribute('width')) - 10);
                    capacityText.setAttribute('y', parseFloat(rect.getAttribute('y')) + 20);
                    capacityText.setAttribute('text-anchor', 'end');
                    capacityText.setAttribute('fill', 'white');
                    capacityText.setAttribute('font-size', '12');
                    capacityText.setAttribute('font-weight', 'bold');
                    capacityText.setAttribute('stroke', 'black');
                    capacityText.setAttribute('stroke-width', '0.5');
                    capacityText.textContent = `👥${roomInfo.capacity}`;
                    room.appendChild(capacityText);
                }
            }
        });
        
        this.analytics.trackEvent('capacity_toggle', 'Toggled room capacity display');
    }

    filterRooms() {
        const input = document.getElementById("roomSearch").value.toLowerCase();
        const select = document.getElementById("roomSelect");
        for (let i = 0; i < select.options.length; i++) {
            const option = select.options[i];
            const txt = option.text.toLowerCase();
            option.style.display = txt.includes(input) ? "" : "none";
        }
        this.analytics.trackEvent('room_search', `Searched for: ${input}`);
    }
}