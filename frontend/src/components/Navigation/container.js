import React, { Component } from "react";
import PropTypes from "prop-types";
import Navigation from "./presenter";

class Container extends Component {
    constructor(props, context){
        super(props, context)
        this.state = {
            visible: false,
            fixedMenu: false,
            calculations: {
                direction: 'none',
                height: 0,
                width: 0,
                topPassed: false,
                bottomPassed: false,
                pixelsPassed: 0,
                percentagePassed: 0,
                topVisible: false,
                bottomVisible: false,
                fits: false,
                passing: false,
                onScreen: false,
                offScreen: false,
            },
        };    
    }    
    static propTypes = {
        pathname: PropTypes.string.isRequired,
        lang: PropTypes.string.isRequired,
    }

    static contextTypes = {
        t: PropTypes.func.isRequired
    };

    componentDidMount() { 
    }


    render() {
        return (
            <Navigation 
                visible={this.state.visible}
                handleOnClickMenuItem={this._handleOnClickMenuItem}                
                children = {this.props.children}
                fixedMenu = {this.state.fixedMenu}
                pathname = {this.props.pathname}
                lang={this.props.lang}
                handlePusher={this._handlePusher}
                handleToggle={this._handleToggle}
                handleVisibilityUpdate={this._handleVisibilityUpdate}
            />
        );
    }

    _handleVisibilityUpdate = (e, { calculations }) => {     
        this.setState({ 
            calculations: calculations 
        })
        if (calculations.topVisible === true) {
            this.setState({ 
                fixedMenu: false,
            })
        } 
        else if (calculations.direction === 'down') {
            this.setState({ 
                fixedMenu: false,
            })
        } else if (calculations.direction === 'up') {
            this.setState({ 
                fixedMenu: true, 
            })
        }
    }

    _handlePusher = () => {
        if (this.state.visible) {
            this.setState({ 
                visible: false 
            });
        };
    }

    _handleToggle = () => {
        this.setState({
            visible: !this.state.visible
        })
    };

    _handleOnClickMenuItem = (key) => {    
        switch (key) {
            case 'music':
            case 'model':
            case 'story':
            case 'video':
            case 'gemshop': 
            case 'home':            
                break;

            default :           
                break;
        }
        this.setState({
            visible: false,
        })
    }
}

export default Container;