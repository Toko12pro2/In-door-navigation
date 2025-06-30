// Room data management system
class RoomDataManager {
    constructor() {
        this.rooms = this.loadRoomData();
        this.init();
    }

    init() {
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
            // Second Floor Rooms
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

            // First Floor Rooms
            'Cantine': {
                name: 'Cantine',
                capacity: 80,
                type: 'Dining',
                floor: 'First Floor',
                description: 'Student dining facility',
                amenities: ['Tables', 'Chairs', 'Food Service', 'Refrigeration']
            },
            'Pondi_Hall': {
                name: 'Pondi Hall',
                capacity: 120,
                type: 'Lecture Hall',
                floor: 'First Floor',
                description: 'Large lecture hall',
                amenities: ['Projector', 'Air Conditioning', 'Sound System']
            },
            'Lounge': {
                name: 'Lounge',
                capacity: 60,
                type: 'Common Area',
                floor: 'First Floor',
                description: 'Student relaxation and study area',
                amenities: ['Comfortable Seating', 'WiFi', 'Study Tables']
            },

            // Basement Rooms
            'Basement_Stairs_up': {
                name: 'Basement Stairs Up',
                capacity: 20,
                type: 'Navigation',
                floor: 'Basement',
                description: 'Stairway to upper floors',
                amenities: ['Emergency Exit', 'Handrails']
            },
            'Basement_Stairs_down': {
                name: 'Basement Stairs Down',
                capacity: 20,
                type: 'Navigation',
                floor: 'Basement',
                description: 'Stairway to lower levels',
                amenities: ['Emergency Exit', 'Handrails']
            },
            'Basement': {
                name: 'Basement Storage',
                capacity: 15,
                type: 'Storage',
                floor: 'Basement',
                description: 'General storage area',
                amenities: ['Storage Shelves', 'Climate Control']
            },

            // Fourth Floor Rooms (Updated according to the image)
            'VICE_CHANCELLORS_OFFICE': {
                name: "Vice-Chancellor's Office",
                capacity: 15,
                type: 'Administrative',
                floor: 'Fourth Floor',
                description: 'Executive office of the Vice-Chancellor',
                amenities: ['Conference Table', 'Private Bathroom', 'Secretary Area']
            },
            'PA_TO_THE_VC': {
                name: 'P.A. to the VC',
                capacity: 8,
                type: 'Administrative',
                floor: 'Fourth Floor',
                description: 'Personal Assistant office to Vice-Chancellor',
                amenities: ['Desk', 'Computer', 'Filing Cabinet']
            },
            'ADMINISTRATIVE_ASSISTANT': {
                name: 'Administrative Assistant',
                capacity: 10,
                type: 'Administrative',
                floor: 'Fourth Floor',
                description: 'Administrative support office',
                amenities: ['Workstations', 'Computers', 'Printer']
            },
            'CONFERENCE_HALL_CENTRAL': {
                name: 'Conference Hall Central',
                capacity: 100,
                type: 'Conference Room',
                floor: 'Fourth Floor',
                description: 'Main conference room for meetings',
                amenities: ['Conference Table', 'Projector', 'Video Conferencing']
            },
            'DIR_OF_MARKETING': {
                name: 'Director of Marketing',
                capacity: 12,
                type: 'Administrative',
                floor: 'Fourth Floor',
                description: 'Marketing department head office',
                amenities: ['Office Desk', 'Meeting Table', 'Presentation Screen']
            },
            'DEPUTY_VICE_CHANCELLOR': {
                name: 'Deputy Vice-Chancellor',
                capacity: 15,
                type: 'Administrative',
                floor: 'Fourth Floor',
                description: 'Deputy Vice-Chancellor office for academic affairs',
                amenities: ['Executive Desk', 'Meeting Area', 'Bookshelf']
            },
            'FOURTH_FLOOR_STAIRS': {
                name: 'Fourth Floor Stairs',
                capacity: 25,
                type: 'Navigation',
                floor: 'Fourth Floor',
                description: 'Central stairway access',
                amenities: ['Emergency Exit', 'Handrails', 'Fire Safety']
            },
            'RESTROOMS_4TH': {
                name: 'Restrooms (4th Floor)',
                capacity: 8,
                type: 'Facility',
                floor: 'Fourth Floor',
                description: 'Fourth floor restroom facilities',
                amenities: ['Running Water', 'Hand Dryers', 'Accessibility Features']
            },
            'STORE_ROOM': {
                name: 'Store Room',
                capacity: 5,
                type: 'Storage',
                floor: 'Fourth Floor',
                description: 'General storage and supplies',
                amenities: ['Storage Shelves', 'Inventory System']
            },
            'TRANSCRIPT_OFFICE': {
                name: 'Transcript Office',
                capacity: 12,
                type: 'Administrative',
                floor: 'Fourth Floor',
                description: 'Student transcript and records office',
                amenities: ['Service Counter', 'Computers', 'Filing System']
            },
            'PA_TO_THE_RECTOR': {
                name: 'P.A. to the Rector',
                capacity: 8,
                type: 'Administrative',
                floor: 'Fourth Floor',
                description: 'Personal Assistant to Rector office',
                amenities: ['Desk', 'Computer', 'Communication System']
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
            },
            'QUALITY_CONTROL': {
                name: 'Quality Control',
                capacity: 18,
                type: 'Administrative',
                floor: 'Fourth Floor',
                description: 'Quality assurance and control office',
                amenities: ['Workstations', 'Testing Equipment', 'Documentation Area']
            },
            'STAIRS_UP_4TH': {
                name: 'Stairs Up (4th Floor)',
                capacity: 20,
                type: 'Navigation',
                floor: 'Fourth Floor',
                description: 'Stairway to upper floors',
                amenities: ['Emergency Exit', 'Handrails']
            },
            'STAIRS_DOWN_4TH': {
                name: 'Stairs Down (4th Floor)',
                capacity: 20,
                type: 'Navigation',
                floor: 'Fourth Floor',
                description: 'Stairway to lower floors',
                amenities: ['Emergency Exit', 'Handrails']
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

    getRoomsByFloor(floor) {
        const floorRooms = {};
        for (const [id, room] of Object.entries(this.rooms)) {
            if (room.floor === floor) {
                floorRooms[id] = room;
            }
        }
        return floorRooms;
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