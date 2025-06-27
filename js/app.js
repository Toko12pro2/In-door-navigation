// Main application logic
class CampusNavigator {
    constructor() {
        this.currentPage = 'home';
        this.analytics = new Analytics();
        this.init();
    }

    init() {
        this.loadMapContent();
        this.setupEventListeners();
        this.analytics.trackPageView('home');
    }

    setupEventListeners() {
        // Track navigation clicks
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                const page = e.target.getAttribute('onclick').match(/'([^']+)'/)[1];
                this.analytics.trackPageView(page);
            });
        });

        // Track CTA button clicks
        document.querySelector('.cta-button')?.addEventListener('click', () => {
            this.analytics.trackEvent('cta_click', 'Explore Room Map button clicked');
        });
    }

    loadMapContent() {
        const mapContent = `
            <div class="map-content-wrapper">
                <h2>Campus Room Navigator</h2>
                <div class="map-controls">
                    <div class="control-group">
                        <input id="roomSearch" onkeyup="filterRooms()" placeholder="Search rooms..." 
                               style="margin-bottom: 8px; padding: 8px; font-size: 16px; width: 240px; border: 1px solid #ddd; border-radius: 5px;" type="text"/>
                        <select id="roomSelect" multiple size="6" style="width: 250px; padding: 5px; border: 1px solid #ddd; border-radius: 5px;">
                            <option value="IT_HALL">IT Hall</option>
                            <option value="TERRY_&_LINDA_BYRD_HALL">Terry & Linda Byrd Hall</option>
                            <option value="COMPUTER_LAB">Computer Lab</option>
                            <option value="CISCO_LAB">Cisco Lab</option>
                            <option value="B.S._CHUMBOW_HALL">B.S. Chumbow Hall</option>
                            <option value="RESTROOMS">Restrooms</option>
                            <option value="STAIRS_TO_FIRST_FLOOR">Stairs to First Floor</option>
                            <option value="STAIRS_TO_THIRD_FLOOR">Stairs to Third Floor</option>
                            <option value="Marketing/PR_Department">Marketing/PR Department</option>
                            <option value="George_M_Mbarika,_Sr">George M Mbarika, Sr</option>
                            <option value="Marketing/Admissions">Marketing/Admissions</option>
                            <option value="Admissions">Admissions</option>
                            <option value="Sick_Bay">Sick Bay</option>
                            <option value="Regina_M_Mbarika">Regina M Mbarika</option>
                            <option value="George_M_Mbarika,_Sr_Hall">George M Mbarika, Sr Hall</option>
                            <option value="Stairs">Stairs</option>
                            <option value="Restrooms">Restrooms</option>
                            <option value="Cantine">Cantine</option>
                            <option value="Pondi_Hall">Pondi Hall</option>
                            <option value="Lounge">Lounge</option>
                            <option value="Basement_Stairs_up">Basement Stairs up</option>
                            <option value="Basement_Stairs_down">Basement Stairs down</option>
                            <option value="Basement">Basement</option>
                            <option value="VICE-CHANCELLORS_OFFICE">Vice-Chancellor's Office</option>
                            <option value="PA_TO_THE_VC">P.A. to the VC</option>
                            <option value="CONFERENCE_HALL">Conference Hall</option>
                            <option value="DIR_OF_MARKETING">Dir. of Marketing</option>
                            <option value="FINANCE_OFFICE">Finance Office</option>
                            <option value="BURSARY">Bursary</option>
                            <option value="QUALITY_CONTROL">Quality Control</option>
                            <option value="ADMINISTRATIVE_ASSISTANT">Administrative Assistant</option>
                            <option value="DEPUTY_VICE-CHANCELLOR">Deputy Vice-Chancellor</option>
                            <option value="Stairs_Up">Stairs Up</option>
                            <option value="Stairs_Down">Stairs Down</option>
                        </select>
                    </div>
                    <div class="control-buttons">
                        <button onclick="highlightSelected()">Highlight Selected</button>
                        <button onclick="resetHighlights()">Reset</button>
                        <button onclick="showRoomCapacities()">Show Capacities</button>
                    </div>
                </div>
                <div class="floor-selector">
                    <button onclick="showFloor('second')" class="floor-btn active" id="floor-second">Second Floor</button>
                    <button onclick="showFloor('first')" class="floor-btn" id="floor-first">First Floor</button>
                    <button onclick="showFloor('basement')" class="floor-btn" id="floor-basement">Basement</button>
                    <button onclick="showFloor('fourth')" class="floor-btn" id="floor-fourth">Fourth Floor</button>
                </div>
                <div id="svgContainer">
                    <div class="zoom-controls">
                        <button onclick="zoom(1.2)">Zoom In</button>
                        <button onclick="zoom(0.8)">Zoom Out</button>
                        <button onclick="resetZoom()">Reset View</button>
                    </div>
                    <div class="zoom-wrapper">
                        <svg fill="none" height="1024" id="zoomSvg" viewBox="0 0 1440 1024" width="1440" xmlns="http://www.w3.org/2000/svg">
                            <!-- Second Floor (Default) -->
                            <g id="second-floor" class="floor-layer active">
                                <g id="Desktop - 1">
                                    <g clip-path="url(#clip0_33_22)">
                                        <rect fill="white" height="1024" width="1440"></rect>
                                        <g id="Rectangle 1">
                                            <rect fill="#D9D9D9" height="448" width="493" x="0.5" y="0.5"></rect>
                                            <rect fill="#FA1616" height="448" width="493" x="0.5" y="0.5"></rect>
                                            <rect height="448" stroke="#141313" width="493" x="0.5" y="0.5"></rect>
                                        </g>
                                        <g id="Rectangle 2">
                                            <rect fill="#D9D9D9" height="448" width="469" x="494.5" y="0.5"></rect>
                                            <rect fill="#FA1616" height="448" width="469" x="494.5" y="0.5"></rect>
                                            <rect height="448" stroke="#111010" width="469" x="494.5" y="0.5"></rect>
                                        </g>
                                        <g id="Rectangle 3">
                                            <rect fill="#D9D9D9" height="448" width="475" x="964.5" y="0.5"></rect>
                                            <rect fill="#FA1616" height="448" width="475" x="964.5" y="0.5"></rect>
                                            <rect height="448" stroke="#0F0E0E" width="475" x="964.5" y="0.5"></rect>
                                        </g>
                                        <g id="Rectangle 4">
                                            <rect fill="#D9D9D9" height="332" width="606" x="0.5" y="691.5"></rect>
                                            <rect fill="#FA1616" height="332" width="606" x="0.5" y="691.5"></rect>
                                            <rect fill="white" height="332" width="606" x="0.5" y="691.5"></rect>
                                            <rect fill="#FA1616" height="332" width="606" x="0.5" y="691.5"></rect>
                                            <rect height="332" stroke="#100F0F" width="606" x="0.5" y="691.5"></rect>
                                        </g>
                                        <g id="Rectangle 5">
                                            <rect fill="#D9D9D9" height="332" width="553" x="886.5" y="691.5"></rect>
                                            <rect fill="#FA1616" height="332" width="553" x="886.5" y="691.5"></rect>
                                            <rect height="332" stroke="#111111" width="553" x="886.5" y="691.5"></rect>
                                        </g>
                                        <g id="Rectangle 6">
                                            <rect fill="#D9D9D9" height="241" width="166" x="0.5" y="449.5"></rect>
                                            <rect fill="#141313" height="241" width="166" x="0.5" y="449.5"></rect>
                                            <rect height="241" stroke="#0F0E0E" width="166" x="0.5" y="449.5"></rect>
                                        </g>
                                        <g id="Rectangle 7">
                                            <rect fill="#D9D9D9" height="269" width="127" x="607.5" y="754.5"></rect>
                                            <rect fill="black" fill-opacity="0.2" height="269" width="127" x="607.5" y="754.5"></rect>
                                            <rect height="269" stroke="#111111" width="127" x="607.5" y="754.5"></rect>
                                        </g>
                                        <rect fill="#D9D9D9" height="269" id="Rectangle 8" stroke="#141313" width="127" x="758.5" y="754.5"></rect>
                                    </g>
                                    <rect height="1023" stroke="#111111" width="1439" x="0.5" y="0.5"></rect>
                                </g>
                                <defs>
                                    <clipPath id="clip0_33_22">
                                        <rect fill="white" height="1024" width="1440"></rect>
                                    </clipPath>
                                </defs>
                                
                                <!-- Room Groups with Click Handlers -->
                                <g id="IT_HALL" class="room-clickable">
                                    <rect fill="#FF1515" height="448" width="493" x="0.5" y="0.5"></rect>
                                    <text dominant-baseline="central" fill="black" font-family="DejaVu Sans" font-size="40" font-weight="bold" text-anchor="middle" x="247.0" y="224.5">IT HALL</text>
                                </g>
                                <g id="TERRY_&_LINDA_BYRD_HALL" class="room-clickable">
                                    <rect fill="#FF1515" height="448" width="469" x="494.5" y="0.5"></rect>
                                    <text dominant-baseline="central" fill="black" font-family="DejaVu Sans" font-size="27" font-weight="bold" text-anchor="middle" x="729.0" y="224.5">TERRY & LINDA BYRD HALL</text>
                                </g>
                                <g id="COMPUTER_LAB" class="room-clickable">
                                    <rect fill="#FF1515" height="448" width="475" x="964.5" y="0.5"></rect>
                                    <text dominant-baseline="central" fill="black" font-family="DejaVu Sans" font-size="40" font-weight="bold" text-anchor="middle" x="1202.0" y="224.5">COMPUTER LAB</text>
                                </g>
                                <g id="B.S._CHUMBOW_HALL" class="room-clickable">
                                    <rect fill="#D9D9D9" height="269" width="127" x="607.5" y="754.5"></rect>
                                    <text dominant-baseline="central" fill="black" font-family="DejaVu Sans" font-size="40" font-weight="bold" text-anchor="middle" x="303.5" y="857.5">B.S. CHUMBOW HALL</text>
                                </g>
                                <g id="RESTROOMS" class="room-clickable">
                                    <rect fill="#141313" height="241" width="166" x="0.5" y="449.5"></rect>
                                    <text dominant-baseline="central" fill="white" font-family="DejaVu Sans" font-size="21" font-weight="bold" text-anchor="middle" x="83.5" y="570.0">RESTROOMS</text>
                                </g>
                                <g id="CISCO_LAB" class="room-clickable">
                                    <rect fill="#FA1616" height="332" width="553" x="886.5" y="691.5"></rect>
                                    <text dominant-baseline="central" fill="black" font-family="DejaVu Sans" font-size="40" font-weight="bold" text-anchor="middle" x="1163.0" y="857.5">CISCO LAB</text>
                                </g>
                                <g id="STAIRS_TO_FIRST_FLOOR" class="room-clickable">
                                    <rect fill="black" fill-opacity="0.2" height="269" width="127" x="607.5" y="754.5"></rect>
                                    <text dominant-baseline="central" fill="black" font-family="DejaVu Sans" font-size="9" font-weight="bold" text-anchor="middle" x="682.5" y="889.0">STAIRS TO FIRST FLOOR</text>
                                </g>
                                <g id="STAIRS_TO_THIRD_FLOOR" class="room-clickable">
                                    <rect fill="#D9D9D9" height="269" stroke="#141313" width="127" x="758.5" y="754.5"></rect>
                                    <text dominant-baseline="central" fill="black" font-family="DejaVu Sans" font-size="8" font-weight="bold" text-anchor="middle" x="822.0" y="889.0">STAIRS TO THIRD FLOOR</text>
                                </g>
                            </g>
                            
                            <!-- First Floor -->
                            <g id="first-floor" class="floor-layer" style="display: none;">
                                <rect fill="#F0F8FF" height="1024" width="1440"></rect>
                                <g id="Marketing/PR_Department" class="room-clickable">
                                    <rect fill="#FF1515" height="189" width="269" x="893.5" y="100.5"></rect>
                                    <text fill="black" font-size="14" text-anchor="middle" x="1028" y="198.0">Marketing/PR Department</text>
                                </g>
                                <g id="George_M_Mbarika,_Sr" class="room-clickable">
                                    <rect fill="#FF1515" height="185" width="276" x="1163.5" y="100.5"></rect>
                                    <text fill="black" font-size="12" text-anchor="middle" x="1253" y="189.0">George M. Mbarika, Sr.</text>
                                </g>
                                <g id="Marketing/Admissions" class="room-clickable">
                                    <rect fill="#FF1515" height="193" width="379" x="893.5" y="286.5"></rect>
                                    <text fill="black" font-size="14" text-anchor="middle" x="1028" y="388.0">Marketing/Admissions</text>
                                </g>
                                <g id="Admissions" class="room-clickable">
                                    <rect fill="#FF1515" height="193" width="166" x="1273.5" y="286.5"></rect>
                                    <text dominant-baseline="middle" fill="black" font-family="sans-serif" font-size="20" font-weight="bold" text-anchor="middle" x="1356.5" y="375.0">Admissions</text>
                                </g>
                                <g id="Sick_Bay" class="room-clickable">
                                    <rect fill="#FF1515" height="379" width="584" x="0.5" y="100.5"></rect>
                                    <text fill="black" font-size="20" text-anchor="middle" x="292" y="298.0">Sick Bay</text>
                                </g>
                                <g id="Regina_M_Mbarika" class="room-clickable">
                                    <rect fill="#FF1515" height="463" width="546" x="893.5" y="660.5"></rect>
                                    <text fill="black" font-size="16" text-anchor="middle" x="1166" y="888.0">Regina M. Mbarika</text>
                                </g>
                                <g id="George_M_Mbarika,_Sr_Hall" class="room-clickable">
                                    <rect fill="#FF1515" height="643" width="490" x="0.5" y="480.5"></rect>
                                    <text alignment-baseline="middle" fill="black" font-size="20" text-anchor="middle" x="245" y="802.0">George M. Mbarika, Sr. Hall</text>
                                </g>
                                <g id="Stairs" class="room-clickable">
                                    <rect fill="#D9D9D9" height="379" stroke="#100F0F" width="140" x="587.5" y="100.5"></rect>
                                    <text fill="black" font-size="16" text-anchor="middle" x="650" y="286.0">Stairs</text>
                                </g>
                                <g id="Restrooms" class="room-clickable">
                                    <rect fill="black" height="179" width="100" x="1339.5" y="480.5"></rect>
                                    <text dominant-baseline="middle" fill="white" font-family="sans-serif" font-size="20" font-weight="bold" text-anchor="middle" x="1389.5" y="560.0">Restrooms</text>
                                </g>
                            </g>
                            
                            <!-- Basement -->
                            <g id="basement-floor" class="floor-layer" style="display: none;">
                                <rect fill="#F5F5F5" height="1024" width="1440"></rect>
                                <g id="Cantine" class="room-clickable">
                                    <rect fill="#FF1515" height="480" stroke="#0B0A0A" width="716" x="0.5" y="543.5"></rect>
                                    <text alignment-baseline="middle" fill="black" font-size="40" text-anchor="middle" x="358" y="776">Cantine</text>
                                </g>
                                <g id="Pondi_Hall" class="room-clickable">
                                    <rect fill="#FF1515" height="542" stroke="#0B0A0A" width="365" x="0.5" y="0.5"></rect>
                                    <text alignment-baseline="middle" fill="black" font-size="40" text-anchor="middle" x="183" y="261">Pondi Hall</text>
                                </g>
                                <g id="Lounge" class="room-clickable">
                                    <rect fill="#FF1515" height="1023" stroke="#0B0A0A" width="414" x="1025.5" y="0.5"></rect>
                                    <text alignment-baseline="middle" fill="black" font-size="40" text-anchor="middle" x="1232" y="502">Lounge</text>
                                </g>
                                <g id="Basement_Stairs_up" class="room-clickable">
                                    <rect fill="#D9D9D9" height="362" stroke="#0B0A0A" width="134" x="717.5" y="661.5"></rect>
                                    <text alignment-baseline="middle" fill="black" text-anchor="middle" x="784" y="838">
                                        <tspan dy="0" font-size="20" x="784">Basement</tspan>
                                        <tspan dy="20" font-size="20" x="784">Stairs up</tspan>
                                    </text>
                                </g>
                                <g id="Basement_Stairs_down" class="room-clickable">
                                    <rect fill="#D9D9D9" height="362" stroke="#0B0A0A" width="153" x="871.5" y="661.5"></rect>
                                    <text alignment-baseline="middle" fill="black" text-anchor="middle" x="948" y="832">
                                        <tspan dy="0" font-size="20" x="948">Basement</tspan>
                                        <tspan dy="20" font-size="20" x="948">Stairs down</tspan>
                                    </text>
                                </g>
                                <g id="Basement" class="room-clickable">
                                    <rect fill="white" height="161" stroke="black" width="357" x="513.5" y="188.5"></rect>
                                    <text alignment-baseline="middle" fill="black" font-size="40" text-anchor="middle" x="692" y="259">Basement</text>
                                </g>
                            </g>
                            
                            <!-- Fourth Floor -->
                            <g id="fourth-floor" class="floor-layer" style="display: none;">
                                <rect fill="white" height="1024" width="1440"></rect>
                                <g id="VICE-CHANCELLORS_OFFICE" class="room-clickable">
                                    <rect fill="#D9D9D9" height="393" stroke="black" width="266" x="0.5" y="0.5"></rect>
                                    <text dominant-baseline="middle" fill="black" font-size="14" font-weight="bold" text-anchor="start" x="10" y="30">VICE-CHANCELLOR'S OFFICE</text>
                                </g>
                                <g id="PA_TO_THE_VC" class="room-clickable">
                                    <rect fill="#D9D9D9" height="194" stroke="black" width="226" x="267.5" y="0.5"></rect>
                                    <text dominant-baseline="middle" fill="black" font-size="14" font-weight="bold" text-anchor="start" x="277" y="30">P.A. TO THE VC</text>
                                </g>
                                <g id="CONFERENCE_HALL" class="room-clickable">
                                    <rect fill="#D9D9D9" height="194" stroke="black" width="537" x="494.5" y="0.5"></rect>
                                    <text dominant-baseline="middle" fill="black" font-size="14" font-weight="bold" text-anchor="start" x="504" y="30">CONFERENCE HALL</text>
                                </g>
                                <g id="DIR_OF_MARKETING" class="room-clickable">
                                    <rect fill="#D9D9D9" height="194" stroke="black" width="256" x="1032.5" y="0.5"></rect>
                                    <text dominant-baseline="middle" fill="black" font-size="14" font-weight="bold" text-anchor="start" x="1042" y="30">DIR. OF MARKETING</text>
                                </g>
                                <g id="DEPUTY_VICE-CHANCELLOR" class="room-clickable">
                                    <rect fill="#D9D9D9" height="393" stroke="black" width="150" x="1289.5" y="0.5"></rect>
                                    <text dominant-baseline="middle" fill="black" font-size="12" font-weight="bold" text-anchor="start" x="1299" y="30">DEPUTY VICE-CHANCELLOR</text>
                                </g>
                                <g id="ADMINISTRATIVE_ASSISTANT" class="room-clickable">
                                    <rect fill="#D9D9D9" height="198" stroke="black" width="226" x="267.5" y="195.5"></rect>
                                    <text dominant-baseline="middle" fill="black" font-size="14" font-weight="bold" text-anchor="start" x="277" y="225">ADMINISTRATIVE ASSISTANT</text>
                                </g>
                                <g id="FINANCE_OFFICE" class="room-clickable">
                                    <rect fill="#D9D9D9" height="193" stroke="black" width="230" x="889.5" y="642.5"></rect>
                                    <text dominant-baseline="middle" fill="black" font-size="14" font-weight="bold" text-anchor="start" x="899" y="654">FINANCE OFFICE</text>
                                </g>
                                <g id="BURSARY" class="room-clickable">
                                    <rect fill="#D9D9D9" height="187" stroke="black" width="230" x="889.5" y="836.5"></rect>
                                    <text dominant-baseline="middle" fill="black" font-size="14" font-weight="bold" text-anchor="start" x="899" y="866">BURSARY</text>
                                </g>
                                <g id="QUALITY_CONTROL" class="room-clickable">
                                    <rect fill="#D9D9D9" height="395" stroke="black" width="319" x="1120.5" y="628.5"></rect>
                                    <text dominant-baseline="middle" fill="black" font-size="14" font-weight="bold" text-anchor="start" x="1130" y="658">QUALITY CONTROL</text>
                                </g>
                                <g id="Stairs_Up" class="room-clickable">
                                    <rect fill="#D9D9D9" height="191.0" stroke="black" stroke-width="1" width="199.0" x="394.5" y="832.5"></rect>
                                    <text dominant-baseline="middle" fill="black" font-size="16" font-weight="bold" text-anchor="middle" x="494.0" y="928.0">Stairs Up</text>
                                </g>
                                <g id="Stairs_Down" class="room-clickable">
                                    <rect fill="#D9D9D9" height="256.0" stroke="black" stroke-width="1" width="129.0" x="594.5" y="767.5"></rect>
                                    <text dominant-baseline="middle" fill="black" font-size="16" font-weight="bold" text-anchor="middle" x="659.0" y="895.5">Stairs Down</text>
                                </g>
                            </g>
                        </svg>
                    </div>
                </div>
            </div>
        `;
        
        document.getElementById('map-content').innerHTML = mapContent;
        this.setupMapInteractivity();
    }

    setupMapInteractivity() {
        // Wait for the map to be loaded, then setup interactivity
        setTimeout(() => {
            this.initializeMapFunctions();
            this.setupRoomClickHandlers();
        }, 100);
    }

    setupRoomClickHandlers() {
        // Add click handlers for all room elements
        document.querySelectorAll('.room-clickable').forEach(room => {
            room.addEventListener('click', (e) => {
                e.stopPropagation();
                const roomId = room.id;
                const rect = room.getBoundingClientRect();
                const position = {
                    x: rect.right,
                    y: rect.top + (rect.height / 2)
                };
                
                if (window.roomInfoPanel) {
                    window.roomInfoPanel.show(roomId, position);
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

    initializeMapFunctions() {
        // Map zoom and pan functionality
        const svg = document.getElementById("zoomSvg");
        if (!svg) return;

        let viewBox = { x: 0, y: 0, width: 1440, height: 1024 };

        window.updateViewBox = () => {
            svg.setAttribute("viewBox", `${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`);
        };

        window.zoom = (factor) => {
            viewBox.width /= factor;
            viewBox.height /= factor;
            window.updateViewBox();
            this.analytics.trackEvent('map_zoom', `Zoom ${factor > 1 ? 'in' : 'out'}`);
        };

        window.resetZoom = () => {
            viewBox = { x: 0, y: 0, width: 1440, height: 1024 };
            window.updateViewBox();
            this.analytics.trackEvent('map_reset', 'Map view reset');
        };

        // Floor switching functionality
        window.showFloor = (floor) => {
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
            
            this.analytics.trackEvent('floor_change', `Switched to ${floor} floor`);
        };

        // Room capacity display
        window.showRoomCapacities = () => {
            const rooms = window.roomDataManager.getAllRooms();
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
                        capacityText.textContent = `${roomInfo.capacity}`;
                        room.appendChild(capacityText);
                    }
                }
            });
            
            this.analytics.trackEvent('capacity_toggle', 'Toggled room capacity display');
        };

        let isPanning = false;
        let startPoint = { x: 0, y: 0 };

        svg.addEventListener("mousedown", (e) => {
            isPanning = true;
            startPoint = { x: e.clientX, y: e.clientY };
            svg.style.cursor = "grabbing";
        });

        svg.addEventListener("mousemove", (e) => {
            if (!isPanning) return;
            const dx = (e.clientX - startPoint.x) * (viewBox.width / svg.clientWidth);
            const dy = (e.clientY - startPoint.y) * (viewBox.height / svg.clientHeight);
            viewBox.x -= dx;
            viewBox.y -= dy;
            startPoint = { x: e.clientX, y: e.clientY };
            window.updateViewBox();
        });

        svg.addEventListener("mouseup", () => {
            isPanning = false;
            svg.style.cursor = "grab";
        });

        svg.addEventListener("mouseleave", () => {
            isPanning = false;
            svg.style.cursor = "grab";
        });

        // Room highlighting functionality
        window.highlightSelected = () => {
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
        };

        window.resetHighlights = () => {
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
        };

        // Room search functionality
        window.filterRooms = () => {
            const input = document.getElementById("roomSearch").value.toLowerCase();
            const select = document.getElementById("roomSelect");
            for (let i = 0; i < select.options.length; i++) {
                const option = select.options[i];
                const txt = option.text.toLowerCase();
                option.style.display = txt.includes(input) ? "" : "none";
            }
            this.analytics.trackEvent('room_search', `Searched for: ${input}`);
        };

        window.updateViewBox();
    }
}

// Page navigation function
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    document.getElementById(pageId + '-page').classList.add('active');
    
    // Update navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Update admin dashboard when switching to admin page
    if (pageId === 'admin') {
        window.adminDashboard?.updateDashboard();
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    window.campusNavigator = new CampusNavigator();
});