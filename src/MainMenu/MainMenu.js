import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './MainMenu.css';
import TicketItem from '../TicketItem';
import {
    AVIASALES_SEARCH_URL,
    AVIASALES_TICKETS_SEARCH_URL,
    AVIASALES_LOGO_URL
} from '../constants';

class MainMenu extends Component {

    static propTypes = {
        getTickets: PropTypes.func,
        handleInputChange: PropTypes.func,
        allTransfer: PropTypes.bool,
        noTransfer: PropTypes.bool,
        oneTransfer: PropTypes.bool,
        twoTransfers: PropTypes.bool,
        threeTransfers: PropTypes.bool,
        clicked_index: PropTypes.number,
        cheapest: PropTypes.array,
        fastest: PropTypes.array
    };

    constructor(props) {
        super(props)
        this.state = {
            allTransfer: false,
            noTransfer: false,
            oneTransfer: false,
            twoTransfers: false,
            threeTransfers: false,
            clicked_index: 0,
            cheapest: [],
            fastest: []

        };
        this.handleInputChange = this.handleInputChange.bind(this)
        this.getTickets = this.getTickets.bind(this)
    }

    handleInputChange(e) {
        const target = e.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    clickHandler = (i) => {
        this.setState({ clicked_index: i })
    }

    componentDidMount() {
        this.getTickets();
    }

    getTickets(e) {
        //e.preventDefault();
        fetch(AVIASALES_SEARCH_URL)
            .then(response => response.json())
            .then(result => {
                fetch(`${AVIASALES_TICKETS_SEARCH_URL}=${result.searchId}`)
                    .then(response => response.json())
                    .then(result => {

                        var cheapest = JSON.parse(JSON.stringify(result.tickets));
                        var fastest = JSON.parse(JSON.stringify(result.tickets));

                        cheapest.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
                        fastest.sort((a, b) => parseFloat(a.segments[0].duration + a.segments[1].duration) - parseFloat(b.segments[0].duration + b.segments[1].duration));

                        this.setState({
                            cheapest: cheapest,
                            fastest: fastest
                        })

                    })
                    .catch(error => {
                        console.log('Error = ', error);
                    })
            })
            .catch(error => {
                console.log('Error = ', error);
            });


    }
    render() {
        const indices = [0, 1];
        const text = ['Самый дешевый', 'Самый быстрый'];
        var size = 5;
        var items = [];
        const MenuOpt = ({ data }) =>
            Object.entries(data).map(([k, v]) => (
                <li className="menu__left-item" key={k}>
                    <div className="menu__label" >
                        <label>
                            <input name={k}
                                type="checkbox"
                                checked={this.state[k]}
                                onChange={this.handleInputChange} />
                            {v}
                        </label>
                    </div>
                </li>
            ));

        const options =
        {
            allTransfer: 'Все',
            noTransfer: 'Без пересадок',
            oneTransfer: '1 пересадка',
            twoTransfers: '2 пересадки',
            threeTransfers: '3 пересадки'
        };

        if (this.state.clicked_index === 0) {
            items = this.state.cheapest.slice(0, size).map((item, i) => {
                return <TicketItem key={i}
                    price={item.price}

                    stops1={item.segments[0].stops.length}
                    stops2={item.segments[1].stops.length}

                    stopPlaces1={item.segments[0].stops}
                    stopPlaces2={item.segments[1].stops}

                    originPlace={item.segments[0].origin}
                    destPlace={item.segments[0].destination}

                    timeFrom={item.segments[0].date}
                    timeTo={item.segments[1].date}

                    duration1={item.segments[0].duration}
                    duration2={item.segments[1].duration}
                    logo={`${AVIASALES_LOGO_URL}${item.carrier}.png`} />
            })
        } else {
            items = this.state.fastest.slice(0, size).map((item, i) => {
                return <TicketItem key={i}
                    price={item.price}

                    stops1={item.segments[0].stops.length}
                    stops2={item.segments[1].stops.length}

                    stopPlaces1={item.segments[0].stops}
                    stopPlaces2={item.segments[1].stops}

                    originPlace={item.segments[0].origin}
                    destPlace={item.segments[0].destination}

                    timeFrom={item.segments[0].date}
                    timeTo={item.segments[1].date}

                    duration1={item.segments[0].duration}
                    duration2={item.segments[1].duration}
                    logo={`${AVIASALES_LOGO_URL}${item.carrier}.png`} />
            })
        }
        if (this.state.oneTransfer || this.state.twoTransfers || this.state.threeTransfers || this.state.noTransfer || this.state.allTransfer) {

            if (this.state.clicked_index === 0) {
                items = this.state.cheapest.filter((item) => {
                    return (((item.segments[0].stops.length + item.segments[1].stops.length) === 1 && this.state.oneTransfer) ||
                        ((item.segments[0].stops.length + item.segments[1].stops.length) === 2 && this.state.twoTransfers) ||
                        ((item.segments[0].stops.length + item.segments[1].stops.length) === 3 && this.state.threeTransfers) ||
                        ((item.segments[0].stops.length + item.segments[1].stops.length) === 0 && this.state.noTransfer) ||
                        ((item.segments[0].stops.length + item.segments[1].stops.length) >= 0 && this.state.allTransfer))
                }).slice(0, size).map((item, i) => {
                    return <TicketItem key={i}
                        price={item.price}

                        stops1={item.segments[0].stops.length}
                        stops2={item.segments[1].stops.length}

                        stopPlaces1={item.segments[0].stops}
                        stopPlaces2={item.segments[1].stops}

                        originPlace={item.segments[0].origin}
                        destPlace={item.segments[0].destination}

                        timeFrom={item.segments[0].date}
                        timeTo={item.segments[1].date}

                        duration1={item.segments[0].duration}
                        duration2={item.segments[1].duration}
                        logo={`${AVIASALES_LOGO_URL}${item.carrier}.png`} />
                });
            } else {
                items = this.state.fastest.filter((item) => {
                    return (((item.segments[0].stops.length + item.segments[1].stops.length) === 1 && this.state.oneTransfer) ||
                        ((item.segments[0].stops.length + item.segments[1].stops.length) === 2 && this.state.twoTransfers) ||
                        ((item.segments[0].stops.length + item.segments[1].stops.length) === 3 && this.state.threeTransfers) ||
                        ((item.segments[0].stops.length + item.segments[1].stops.length) === 0 && this.state.noTransfer) ||
                        ((item.segments[0].stops.length + item.segments[1].stops.length) >= 0 && this.state.allTransfer))
                }).slice(0, size).map((item, i) => {
                    return <TicketItem key={i}
                        price={item.price}

                        stops1={item.segments[0].stops.length}
                        stops2={item.segments[1].stops.length}

                        stopPlaces1={item.segments[0].stops}
                        stopPlaces2={item.segments[1].stops}

                        originPlace={item.segments[0].origin}
                        destPlace={item.segments[0].destination}

                        timeFrom={item.segments[0].date}
                        timeTo={item.segments[1].date}

                        duration1={item.segments[0].duration}
                        duration2={item.segments[1].duration}
                        logo={`${AVIASALES_LOGO_URL}${item.carrier}.png`} />
                });
            }
        }

        return (
            <div className="container">
                <div className="menu__left">
                    <p className="menu__left-title">Количество пересадок</p>
                    <ul className="menu__left-items">
                        <MenuOpt data={options} />
                    </ul>
                </div>
                <div className="menu__right">
                    <div className="menu__right-top">
                        {indices.map(
                            (i) =>
                                <Switcher key={i + 1}
                                    clicked={i === this.state.clicked_index}
                                    onClick={() => this.clickHandler(i)}
                                    text={text[i]} />)}
                    </div>
                    <div className="menu__right-center">
                        {items}
                    </div>
                </div>

            </div >
        )
    }

}
const Switcher = (props) => (
    <div className={`menu__right-top_text  ${props.clicked ? "menu__right-top_blue" : "menu__right-top_white"} `}
        onClick={props.onClick}>
        {props.text}
    </div>
)

export default MainMenu;
