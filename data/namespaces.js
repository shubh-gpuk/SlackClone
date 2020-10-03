//Imports
const Namespace = require('../classes/Namespace.js');
const Room = require('../classes/Room.js');

//Create Namespace Objects
let netflix = new Namespace(0, 'netflix', 'https://www.indiewire.com/wp-content/uploads/2020/08/netflix.jpg?w=780', '/netfflix');
let castlevania = new Namespace(1, 'castlevania', 'https://cdn.vox-cdn.com/thumbor/0anIzqalwK7389l6ZHHY1RUrC-I=/0x0:1920x1080/1200x800/filters:focal(781x276:1087x582)/cdn.vox-cdn.com/uploads/chorus_image/image/55618405/CSV0_101_MASTER.01_08_58_06.Still017.0.png', '/castlevania');
let coding = new Namespace(2, 'coding', 'https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fblogs-images.forbes.com%2Fforbestechcouncil%2Ffiles%2F2019%2F01%2Fcanva-photo-editor-8-7.jpg', '/coding');

let namespaces = [];
namespaces.push(netflix, castlevania, coding);

//Add Rooms
netflix.addRoom(new Room(0, 'subscription', 'netflix'));
netflix.addRoom(new Room(1, 'media', 'netflix'));
netflix.addRoom(new Room(2, 'features', 'netflix'));

castlevania.addRoom(new Room(0, 'releases', 'castlevania'));
castlevania.addRoom(new Room(1, 'episodes', 'castlevania'));
castlevania.addRoom(new Room(2, 'watchers', 'castlevania'));
castlevania.addRoom(new Room(3, 'games', 'castlevania'));

coding.addRoom(new Room(0, 'platforms', 'coding'));
coding.addRoom(new Room(1, 'problems', 'coding'));
coding.addRoom(new Room(2, 'competitions', 'coding'));

module.exports = namespaces