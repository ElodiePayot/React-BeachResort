import React from "react";
import {Link} from "react-router-dom";

import defaultBcg from '../images/room-1.jpeg';
import Banner from '../components/Banner';
import {RoomContext} from '../context';
import StyledHero from '../components/StyledHero';


export default class SingleRoom extends React.Component {
    constructor(props) {
        super(props);

        //params vient du router dom
        this.state = {
            slug: this.props.match.params.slug,
            defaultBcg,
        };
    }

    static contextType = RoomContext;

    componentDidMount() {

    }

    render() {
        const { getRoom } = this.context;

        //get the room with a particular slug from the state
        const room = getRoom(this.state.slug)

        if (!room) {
            return <div className="error">
                <h3>no such room could be found</h3>
                <Link to='/rooms' className='btn-primary'>Back to rooms</Link>
            </div>
        }

        const {name, description, capacity, size, price, extras, breakfast, pets, images} = room;

        //loop on all images except the one displayed in the bg
        const [mainImg, ...defaultImg] = images;
    
        return (
            <>
                <StyledHero img={mainImg || this.state.defaultBcg}>
                    <Banner title={`${name} room`}>
                        <Link to='/rooms' className='btn-primary'>Back to rooms</Link>
                    </Banner>
                </StyledHero>
                <section className="single-room">
                    <div className="single-room-images">
                        {defaultImg.map((item, idx) => {return <img key={idx} src={item} alt={name}/>})}
                    </div>
                    <div className="single-room-info">
                        <article className="description">
                            <h3>details</h3>
                            <p>{description}</p>
                        </article>

                        <article className="info">
                            <h3>info</h3>
                            <h6>price: ${price}</h6>
                            <h6>size: {size} SQFT</h6>
                            <h6>Max capacity: {capacity > 1 ? `${capacity} people` : `${capacity} person`}</h6>
                            <h6>Pets: {pets ? `pets allowed` : `no pets allowed`}</h6>
                            {breakfast &&
                             <h6>Free breakfast</h6>
                            }
                        </article>
                    </div>

                    <section className="room-extras">
                        <h6>extras</h6>
                        <ul className="extras">
                            {extras.map((extra, idx) => {return <li key={idx}>- {extra}</li> })}
                        </ul>
                    </section>
                </section>
            </>
        )
    }
}
