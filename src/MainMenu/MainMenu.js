import React, { Component } from 'react';
import './MainMenu.css';

class MainMenu extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allTransfer: false,
            noTransfer: false,
            oneTransfer: false,
            twoTransfers: false,
            threeTransfers: false,
            colorLeft: 'blue',
            colorRight: 'white',
            clicked_index: 0
        };
        this.handleInputChange = this.handleInputChange.bind(this)
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
        console.log(i);
        this.setState({ clicked_index: i })
    }
    render() {
        const indices = [0, 1];
        const text = ['Самый дешевый','Самый быстрый'];
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
                        {/* <div className="menu__right-top_text"> */}
                            {indices.map(
                                (i) =>
                                <Switcher key={i}
                                    clicked={i === this.state.clicked_index}
                                    onClick={() => this.clickHandler(i)} 
                                    text ={text[i]}/> )}
                        {/* Самый дешевый</div> */}
                        {/* <div className="menu__right-top_text"
                        >Самый быстрый</div> */}
                    </div>
                    <div className="menu__right-center">

                    </div>
                </div>

            </div >
        )
    }
    
}
const Switcher = (props) => (
        <div className={ `menu__right-top_text  ${ props.clicked ? "menu__right-top_blue" : "menu__right-top_white"} `}
             onClick={props.onClick}>
                {props.text}
             </div>
    )

export default MainMenu;
