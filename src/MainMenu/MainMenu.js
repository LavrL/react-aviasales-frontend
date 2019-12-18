import React, { Component } from 'react';
import './MainMenu.css';
import TicketItem from '../TicketItem/TicketItem';

class MainMenu extends Component {
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
        console.log('name = ', name)
        console.log('value = ', value)

        this.setState({
            [name]: value
        });
    }

    clickHandler = (i) => {
        console.log(i);
        this.setState({ clicked_index: i })
    }

    componentDidMount() {
        this.getTickets();
    }

    getTickets(e) {
        //e.preventDefault();
        fetch('https://front-test.beta.aviasales.ru/search')
            .then(response => response.json())
            .then(result => {
                fetch(`https://front-test.beta.aviasales.ru/tickets?searchId=${result.searchId}`)
                    .then(response => response.json())
                    .then(result => {
                        console.log('result = ', result.tickets);

                        var cheapest = JSON.parse(JSON.stringify(result.tickets));
                        var fastest = JSON.parse(JSON.stringify(result.tickets));

                        cheapest.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
                        fastest.sort((a, b) => parseFloat(a.segments[0].duration + a.segments[1].duration) - parseFloat(b.segments[0].duration + b.segments[1].duration));

                        this.setState({
                            cheapest: cheapest,
                            fastest: fastest
                        })

                        console.log('this.state.cheapest = ', this.state.cheapest);
                        console.log('this.state.fastest = ', this.state.fastest);
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
        if (this.state.clicked_index === 0) {
            items = this.state.cheapest.slice(0, size).map((item, i) => {
                return <TicketItem key={i}
                    price={item.price}
                    // stops={item.segments[0].stops.length + item.segments[1].stops.length}
                    stops1={item.segments[0].stops.length}
                    stops2={item.segments[1].stops.length}
                    stopPlaces1={item.segments[0].stops}
                    stopPlaces2={item.segments[1].stops}
                    // duration={item.segments[0].duration + item.segments[1].duration}
                    duration1={item.segments[0].duration}
                    duration2={item.segments[1].duration}
                    logo={`https://pics.avs.io/99/36/${item.carrier}.png` } />
            })
        } else {
            items = this.state.fastest.slice(0, size).map((item, i) => {
                return <TicketItem key={i}
                    price={item.price}
                    // stops={item.segments[0].stops.length + item.segments[1].stops.length} 
                    stops1={item.segments[0].stops.length}
                    stops2={item.segments[1].stops.length}
                    stopPlaces1={item.segments[0].stops}
                    stopPlaces2={item.segments[1].stops}
                    // duration={item.segments[0].duration + item.segments[1].duration}
                    duration1={item.segments[0].duration}
                    duration2={item.segments[1].duration}
                    logo={`https://pics.avs.io/99/36/${item.carrier}.png` }/>
            })
        }
        if (this.state.oneTransfer || this.state.twoTransfers || this.state.threeTransfers || this.state.noTransfer || this.state.allTransfer) {
            // console.log('threeTransfers, twoTransfers or oneTransfer true');
            if (this.state.clicked_index === 0) {
                items = this.state.cheapest.filter((item) => {
                    return (((item.segments[0].stops.length + item.segments[1].stops.length) === 1 && this.state.oneTransfer) ||
                        ((item.segments[0].stops.length + item.segments[1].stops.length) === 2 && this.state.twoTransfers) ||
                        ((item.segments[0].stops.length + item.segments[1].stops.length) === 3 && this.state.threeTransfers) ||
                        ((item.segments[0].stops.length + item.segments[1].stops.length) === 0 && this.state.noTransfer) ||
                        ((item.segments[0].stops.length + item.segments[1].stops.length) >= 0 && this.state.allTransfer) )
                }).slice(0, size).map((item, i) => {
                    return <TicketItem key={i}
                        price={item.price}
                        // stops={item.segments[0].stops.length + item.segments[1].stops.length} 
                        stops1={item.segments[0].stops.length}
                        stops2={item.segments[1].stops.length}
                        stopPlaces1={item.segments[0].stops}
                        stopPlaces2={item.segments[1].stops}
                        // duration={item.segments[0].duration + item.segments[1].duration} 
                        duration1={item.segments[0].duration}
                        duration2={item.segments[1].duration}
                        logo={`https://pics.avs.io/99/36/${item.carrier}.png` }/>
                });
            } else {
                items = this.state.fastest.filter((item) => {
                    return (((item.segments[0].stops.length + item.segments[1].stops.length) === 1 && this.state.oneTransfer) ||
                        ((item.segments[0].stops.length + item.segments[1].stops.length) === 2 && this.state.twoTransfers) ||
                        ((item.segments[0].stops.length + item.segments[1].stops.length) === 3 && this.state.threeTransfers) ||
                        ((item.segments[0].stops.length + item.segments[1].stops.length) === 0 && this.state.noTransfer) ||
                        ((item.segments[0].stops.length + item.segments[1].stops.length) >= 0 && this.state.allTransfer) )
                }).slice(0, size).map((item, i) => {
                    return <TicketItem key={i}
                        price={item.price}
                        // stops={item.segments[0].stops.length + item.segments[1].stops.length} 
                        stops1={item.segments[0].stops.length}
                        stops2={item.segments[1].stops.length}
                        stopPlaces1={item.segments[0].stops}
                        stopPlaces2={item.segments[1].stops}
                        //duration={item.segments[0].duration + item.segments[1].duration} 
                        duration1={item.segments[0].duration}
                        duration2={item.segments[1].duration}
                        logo={`https://pics.avs.io/99/36/${item.carrier}.png` }/>
                });
            }
        }

        return (
            <div className="container">
                <div className="menu__left">
                    <p className="menu__left-title">Количество пересадок</p>
                    <div className="menu__left-items">
                        <div className="menu__left-item">
                            <label className="menu__label">
                                <input name="allTransfer"
                                    type="checkbox"
                                    checked={this.state.allTransfer}
                                    onChange={this.handleInputChange} />
                                Все
                        </label>
                        </div>
                        <div className="menu__left-item">
                            <label className="menu__label">
                                <input name="noTransfer"
                                    type="checkbox"
                                    checked={this.state.noTransfer}
                                    onChange={this.handleInputChange} />
                                Без пересадок
                        </label>
                        </div>
                        <div className="menu__left-item">
                            <label className="menu__label">
                                <input name="oneTransfer"
                                    type="checkbox"
                                    checked={this.state.oneTransfer}
                                    onChange={this.handleInputChange} />
                                1 пересадка
                        </label>
                        </div>
                        <div className="menu__left-item">
                            <label className="menu__label">
                                <input name="twoTransfers"
                                    type="checkbox"
                                    checked={this.state.twoTransfers}
                                    onChange={this.handleInputChange} />
                                2 пересадки
                        </label>
                        </div>
                        <div className="menu__left-item">
                            <label className="menu__label">
                                <input name="threeTransfers"
                                    type="checkbox"
                                    checked={this.state.threeTransfers}
                                    onChange={this.handleInputChange} />
                                3 пересадки
                        </label>
                        </div>
                    </div>
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
