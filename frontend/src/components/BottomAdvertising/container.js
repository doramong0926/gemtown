import React, { Component } from "react";
import PropTypes from "prop-types";
import BottomAdvertising from "./presenter";
import { CONTENTS_TYPE } from "./../../config/constants"

class Container extends Component {
    static propTypes = {
        advertisingType: PropTypes.string.isRequired,
    }

    static contextTypes = {
        t: PropTypes.func.isRequired
    };

    advertisingInfo = {
        "music" : {            
            path: require('images/Advertising/music_voteup.jpg'),
            title: this.context.t('당신이 응원하는 콘텐츠와 아티스트에게 투표해 주세요!'),
            buttonText: this.context.t('LEARN MORE'),
            link_address: "https://www.bluecots.io",
        },
        "model" : {            
            path: require('images/Advertising/model_voteup.jpg'),
            title: this.context.t('당신이 응원하는 모델에게 투표해 주세요!'),
            buttonText: this.context.t('LEARN MORE'),
            link_address: "https://www.bluecots.io",
        },
        "story" : {            
            path: require('images/Advertising/story-vote-img.jpg'),
            title: this.context.t('당신이 응원하는 콘텐츠와 아티스트에게 투표해 주세요!'),
            buttonText: this.context.t('LEARN MORE'),
            link_address: "https://www.bluecots.io",
        },
        "video" : {            
            path: require('images/Advertising/music_voteup.jpg'),
            title: this.context.t('당신이 응원하는 콘텐츠와 아티스트에게 투표해 주세요!'),
            buttonText: this.context.t('LEARN MORE'),
            link_address: "https://www.bluecots.io",
        },
    }

    render() {
        return (
            <BottomAdvertising                             
                advertisingInfo={this.getAdvertisingInfo()}
                handleOnClick={this._handleOnClick}
                advertisingType={this.props.advertisingType}
            />
        )
    }    

    getAdvertisingInfo = () => {
        switch (this.props.advertisingType) {
            case CONTENTS_TYPE.MUSIC :
                return this.advertisingInfo.music;

            case CONTENTS_TYPE.MODEL :
                return this.advertisingInfo.model;

            case CONTENTS_TYPE.STORY :  
                return this.advertisingInfo.story;

            case CONTENTS_TYPE.VIDEO :  
                return this.advertisingInfo.video;

            default :
                return null;
        }
    }

    _handleOnClick = () => {
        ;
    }
}

export default Container;

