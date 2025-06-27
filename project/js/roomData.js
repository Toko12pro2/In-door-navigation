// Room data management system
class RoomDataManager {
    constructor() {
        this.rooms = this.loadRoomData();
        this.init();
    }

    init() {
        // Initialize room data if not exists
        if (Object.keys(this.rooms).length === 0) {
            this.initializeDefaultRoomData();
        }
    }

    loadRoomData() {
        return JSON.parse(localStorage.getItem('roomData') || '{}');
    }

    saveRoomData() {
        localStorage.setItem('roomData', JSON.stringify(this.rooms));
    }

    initializeDefaultRoomData() {
        const defaultRooms = {
            'IT_HALL': {
                name: 'IT Hall',
                capacity: 150,
                type: 'Lecture Hall',
                floor: 'Second Floor',
                description: 'Main IT lecture hall with modern equipment',
                amenities: ['Projector', 'Air Conditioning', 'WiFi', 'Whiteboard']
            },
            'TERRY_&_LINDA_BYRD_HALL': {
                name: 'Terry & Linda Byrd Hall',
                capacity: 200,
                type: 'Conference Hall',
                floor: 'Second Floor',
                description: 'Large conference hall for events and meetings',
                amenities: ['Sound System', 'Projector', 'Air Conditioning', 'Stage']
            },
            'COMPUTER_LAB': {
                name: 'Computer Lab',
                capacity: 50,
                type: 'Laboratory',
                floor: 'Second Floor',
                description: 'Computer laboratory with latest hardware',
                amenities: ['Computers', 'Internet', 'Printer', 'Air Conditioning']
            },
            'CISCO_LAB': {
                name: 'Cisco Lab',
                capacity: 30,
                type: 'Laboratory',
                floor: 'Second Floor',
                description: 'Specialized networking laboratory',
                amenities: ['Cisco Equipment', 'Network Simulators', 'Projector']
            },
            'B.S._CHUMBOW_HALL': {
                name: 'B.S. Chumbow Hall',
                capacity: 100,
                type: 'Lecture Hall',
                floor: 'Second Floor',
                description: 'Medium-sized lecture hall',
                amenities: ['Projector', 'Whiteboard', 'Air Conditioning']
            },
            'RESTROOMS': {
                name: 'Restrooms',
                capacity: 10,
                type: 'Facility',
                floor: 'Second Floor',
                description: 'Public restroom facilities',
                amenities: ['Running Water', 'Hand Dryers']
            },
            'STAIRS_TO_FIRST_FLOOR': {
                name: 'Stairs to First Floor',
                capacity: 20,
                type: 'Navigation',
                floor: 'Second Floor',
                description: 'Stairway connecting to first floor',
                amenities: ['Emergency Exit', 'Handrails']
            },
            'STAIRS_TO_THIRD_FLOOR': {
                name: 'Stairs to Third Floor',
                capacity: 20,
                type: 'Navigation',
                floor: 'Second Floor',
                description: 'Stairway connecting to third floor',
                amenities: ['Emergency Exit', 'Handrails']
            },
            'Cantine': {
                name: 'Cantine',
                capacity: 80,
                type: 'Dining',
                floor: 'Basement',
                description: 'Student dining facility',
                amenities: ['Tables', 'Chairs', 'Food Service', 'Refrigeration']
            },
            'Pondi_Hall': {
                name: 'Pondi Hall',
                capacity: 120,
                type: 'Lecture Hall',
                floor: 'Basement',
                description: 'Underground lecture hall',
                amenities: ['Projector', 'Air Conditioning', 'Sound System']
            },
            'Lounge': {
                name: 'Lounge',
                capacity: 60,
                type: 'Common Area',
                floor: 'Basement',
                description: 'Student relaxation and study area',
                amenities: ['Comfortable Seating', 'WiFi', 'Study Tables']
            },
            'VICE-CHANCELLORS_OFFICE': {
                name: "Vice-Chancellor's Office",
                capacity: 15,
                type: 'Administrative',
                floor: 'Fourth Floor',
                description: 'Executive office of the Vice-Chancellor',
                amenities: ['Conference Table', 'Private Bathroom', 'Secretary Area']
            },
            'CONFERENCE_HALL': {
                name: 'Conference Hall',
                capacity: 100,
                type: 'Conference Room',
                floor: 'Fourth Floor',
                description: 'Main conference room for meetings',
                amenities: ['Conference Table', 'Projector', 'Video Conferencing']
            },
            'FINANCE_OFFICE': {
                name: 'Finance Office',
                capacity: 25,
                type: 'Administrative',
                floor: 'Fourth Floor',
                description: 'Financial administration office',
                amenities: ['Computers', 'Safe', 'Filing Cabinets']
            },
            'BURSARY': {
                name: 'Bursary',
                capacity: 20,
                type: 'Administrative',
                floor: 'Fourth Floor',
                description: 'Student financial services',
                amenities: ['Service Counter', 'Computers', 'Waiting Area']
            }
        };

        this.rooms = defaultRooms;
        this.saveRoomData();
    }

    getRoomInfo(roomId) {
        return this.rooms[roomId] || {
            name: roomId.replace(/_/g, ' '),
            capacity: 0,
            type: 'Unknown',
            floor: 'Unknown',
            description: 'No description available',
            amenities: []
        };
    }

    updateRoom(roomId, roomData) {
        this.rooms[roomId] = { ...this.rooms[roomId], ...roomData };
        this.saveRoomData();
    }

    getAllRooms() {
        return this.rooms;
    }

    searchRooms(query) {
        const results = [];
        const searchTerm = query.toLowerCase();
        
        for (const [id, room] of Object.entries(this.rooms)) {
            if (room.name.toLowerCase().includes(searchTerm) ||
                room.type.toLowerCase().includes(searchTerm) ||
                room.description.toLowerCase().includes(searchTerm)) {
                results.push({ id, ...room });
            }
        }
        
        return results;
    }
}

// Initialize room data manager
window.roomDataManager = new RoomDataManager();