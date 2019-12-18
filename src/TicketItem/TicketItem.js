import React, { Component } from 'react';
import './Ticketitem.css';

class TicketItem extends Component {
    render() {
        return (
            <div>
                <div className="TicketItem__items">
                    <div className="TicketItem__item-title">
                        <span className="TicketItem__item-title-price">
                            {this.props.price} P
                        </span>
                        <div className="TicketItem__item-title-logo">
                            <img src={this.props.logo} alt="logo" />
                        </div>
                    </div>
                    <div className="TicketItem__timetable">
                        <div className="TicketItem__timetable-info">
                            <span className="TicketItem__timetable-title">MOW - HKT</span>
                            <span className="TicketItem__timetable-text">10:45 : 08:00</span>
                        </div>
                        <div className="TicketItem__timetable-info">
                            <span className="TicketItem__timetable-title">В ПУТИ</span>
                            <span className="TicketItem__timetable-text">{this.props.duration1} мин</span>
                        </div>
                        <div className="TicketItem__timetable-info">
                            <span className="TicketItem__timetable-title">пересадок - {this.props.stops1}</span>
                            <span className="TicketItem__timetable-text">{this.props.stopPlaces1.join(', ').toString()}</span>
                        </div>
                    </div>

                    <div className="TicketItem__timetable">
                        <div className="TicketItem__timetable-info">
                            <span className="TicketItem__timetable-title">MOW - HKT</span>
                            <span className="TicketItem__timetable-text">10:45 : 08:00</span>
                        </div>
                        <div className="TicketItem__timetable-info">
                            <span className="TicketItem__timetable-title">В ПУТИ</span>
                            <span className="TicketItem__timetable-text">{this.props.duration2} мин</span>
                        </div>
                        <div className="TicketItem__timetable-info">
                            <span className="TicketItem__timetable-title">пересадок - {this.props.stops2}</span>
                            <span className="TicketItem__timetable-text">{this.props.stopPlaces2.join(', ').toString()}</span>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default TicketItem;