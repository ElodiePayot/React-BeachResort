import React, {Component} from 'react';
import items from './data';

const RoomContext = React.createContext();

class RoomProvider extends Component {
    state= {
        rooms: [],
        sortedRooms: [],
        featuredRooms: [],
        loading: true,
        type: 'all',
        capacity: 1,
        price: 0,
        minPrice: 0,
        maxPrice: 0,
        minSize: 0,
        maxSize: 0,
        breakfast: false,
        pets: false
    };

    getRoom = slug => {
        let tempRooms = [...this.state.rooms];
        const room = tempRooms.find(room => room.slug === slug);
        return room;
    }

    //get data
    componentDidMount() {
        let rooms = this.formatData(items);
        let featuredRooms = rooms.filter(room => room.featured === true);
        //pour afficher les max dans l'ui surle filtre on cherche quelle room a la valeur la plus élevée
        let maxPrice = Math.max(...rooms.map(item => item.price));
        let maxSize = Math.max(...rooms.map(item => item.size));
        //ES6: pas besoin de repéter: rooms:rooms
        this.setState({
            rooms,
            featuredRooms,
            sortedRooms:
            rooms,
            loading: false,
            price: maxPrice,
            maxPrice,
            maxSize,

        })
    };

    //fonciton utilisé lorsque l'on selectionne dans le filtre
    handleChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = event.target.name;
        console.log('test')
        this.setState({
            [name]: value
        }, this.filterRooms)
        //si le name est différent on va filtrer les rooms
    }

    filterRooms = () => {
        let {
            rooms, type, capacity, price, minSize, maxSize, breakfast, pets
        } = this.state;

        //all rooms
        let tempRooms = [...rooms];
        //transformed values (by default values are string)
        capacity = parseInt(capacity);
        price = parseInt(price);

        //filter by type
        if (type !== 'all') {
            tempRooms = tempRooms.filter(room => room.type === type);
        }

        //filter by capacity
        if (capacity !== 1) {
            tempRooms = tempRooms.filter(room => room.capacity >= capacity);
        }

        //filter by price
        tempRooms = tempRooms.filter((room) => {return room.price <= price})

        //filter by size
        tempRooms = tempRooms.filter((room) => room.size >= minSize && room.size <= maxSize);

       //filter by breakfast
        if (breakfast) {
            tempRooms = tempRooms.filter(room => room.breakfast === true);
        }
        //filter by pets
        if (pets) {
            tempRooms = tempRooms.filter(room => room.pets === true);
        }

        //change state
        this.setState({
            sortedRooms: tempRooms
        })
    }

    //get data in a clear format for rendering
    formatData(arr) {
        let tempItems = arr.map(arrItem => {
            let id = arrItem.sys.id;
            let img = arrItem.fields.images.map(image => image.fields.file.url);
            let room = {...arrItem.fields, images:img, id}
            return room;
        })
        return tempItems;
    }

    render() {
        return(
            <RoomContext.Provider value={{...this.state, getRoom: this.getRoom, handleChange: this.handleChange}}>
                {this.props.children}
            </RoomContext.Provider>
        )
    }
}

const RoomConsumer = RoomContext.Consumer;

//higher order component that provide context to the component
export function withRoomConsumer(Component) {
    return function consumerWrapper(props) {
        return <RoomConsumer>
            {value => <Component {...props} context={value}/>}
        </RoomConsumer>
    }
}

export {RoomProvider, RoomConsumer, RoomContext};