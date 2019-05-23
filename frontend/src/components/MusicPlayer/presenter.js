import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.scss";
import { 
    Icon,
    Image,
} from "semantic-ui-react";
import { pad } from "./../../utils/commonUtils"

class MusicPlayer extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            currentTime: 0,
            totalTime: 0,
            visible: true,
        }        
    }

    static propTypes = {
        music: PropTypes.object.isRequired,      
        TogglePlayMusic: PropTypes.func.isRequired,  
        isPlay: PropTypes.bool.isRequired,
    }

    static contextTypes = {
        t: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.audio.addEventListener("timeupdate", this.handleTimeUpdate)
    };

    componentWillUnmount() {
        this.audio.removeEventListener("timeupdate", this.handleTimeUpdate);       
        this.audio.pause();
    }

    componentWillReceiveProps(nextPros) {
        if (this.props.music.id !== nextPros.music.id) {
            this.setState({
                visible: true,
                currentTime: 0,
                totalTime: 0,
            })   
        }
        if (this.props.isPlay !== nextPros.isPlay) {
            if (nextPros.isPlay === true) {       
                this.setState({
                    visible: true,
                });          
                setTimeout(() => {
                    this.audio.play();    
                    this.audio.addEventListener("timeupdate", this.handleTimeUpdate)
                }, );
                
            } else {
                this.audio.removeEventListener("timeupdate", this.handleTimeUpdate);       
                this.audio.pause();
            }
        }
    }
    
    render() {
        if (this.state.visible === false) {
            return null
        } else {
            return (
                <div className={styles.RootDivision}>
                    <div className={styles.OutterDivision}>
                        <audio 
                            src={this.props.music.file}
                            ref={(audio) => { this.audio = audio } }
                            autoPlay
                        />
                        {
                            this.state.visible === true
                            ? 
                            <React.Fragment>
                                <div className={styles.CoverImageDivision} >
                                    <Image 
                                        src={this.props.music.cover_image.file}
                                        className={styles.CoverImage}
                                        avatar
                                    />
                                </div>
                                <div className={styles.RightIDivision}>
                                    <div className={styles.InfomationDivision}>
                                        <div className={styles.TitleDivision}> 
                                            <p className={styles.Text}>{this.props.music.title}</p>
                                            <p className={styles.Text}>-</p>
                                            <p className={styles.Text}>{this.props.music.musician.nickname}</p>
                                        </div>
                                        <div className={styles.ExitIconDivision} >
                                            <Icon 
                                                id="close"
                                                onClick={this.handleOnClickClose}
                                                name="close"
                                                className={styles.PlayStopIcon}
                                                size='large'
                                            />
                                        </div>
                                    </div>
                                    <div className={styles.PlayerDivision} >
                                        <div className={styles.PlayIconDivision} >
                                            <Icon 
                                                onClick={this._handletogglePlay}
                                                name={this.props.isPlay === true ? "pause circle outline" : "play circle outline"}
                                                className={styles.PlayStopIcon}
                                                size='big'
                                            />
                                        </div>
                                        <RenderTime time={this.state.currentTime} />                                        
                                        <div 
                                            id="timeline"
                                            className={styles.Timeline} 
                                            ref={(timeline) => { this.timeline = timeline } }
                                            onClick={this.mouseMove}
                                        >
                                            <div 
                                                id="timeline_handel"
                                                className={styles.TimelineHandle} 
                                                ref={(timeline_handel) => { this.timeline_handel = timeline_handel } }
                                                onMouseDown={this.mouseDown}
                                            >
                                            </div>
                                        </div>
                                        <RenderTime time={this.state.totalTime} />             
                                    </div>
                                </div>
                            </React.Fragment>
                            : null 
                        }
                    </div>
                </div>
            )
        }
    }

    handleTimeUpdate = () => {
        this.setState({
            currentTime: this.audio.currentTime,
            totalTime: this.audio.duration,
        })
        let ratio = this.audio.currentTime / this.audio.duration; 
        let position = this.timeline.offsetWidth * ratio;
        this.positionHandle(position);
    }

    handleOnClickClose = () => {      
        this.audio.removeEventListener("timeupdate", this.handleTimeUpdate);       
        this.audio.pause();            
        this.props.TogglePlayMusic(null);
        this.setState({
            visible: false,
        });
    }

    _handletogglePlay = () => {
        this.props.TogglePlayMusic(this.props.music);
    }

    mouseMove = (e) => {
        let position = e.pageX - this.timeline.offsetLeft
        let currentTime = ((e.pageX - this.timeline.offsetLeft) / this.timeline.offsetWidth) * this.audio.duration;
        if (position < 0) {
            position = 0;
        }
        if (currentTime < 0){
            currentTime = 0;
        }
        this.positionHandle(position);
        this.audio.currentTime = currentTime;
    }

    mouseUp = (e) => {
        window.removeEventListener('mousemove', this.mouseMove);
        window.removeEventListener('mouseup', this.mouseUp);
    };

    mouseDown = (e) => {
        window.addEventListener('mousemove', this.mouseMove);
        window.addEventListener('mouseup', this.mouseUp);
    };

    positionHandle = (position) => {        
        let timelineWidth = this.timeline.offsetWidth - this.timeline_handel.offsetWidth;
        let handleLeft = position;
        if (handleLeft >= 0 && handleLeft <= timelineWidth) {
            this.timeline_handel.style.marginLeft = handleLeft + "px";
        } else if (handleLeft < 0) {
            this.timeline_handel.style.marginLeft = "0px";
        } else if (handleLeft > timelineWidth) {
            this.timeline_handel.style.marginLeft = timelineWidth + "px";
        }
    };
}

const RenderTime = (props) => {
    const currentTime = parseInt(props.time);
    let min = pad(parseInt(currentTime / 60), 2);
    let sec = pad(parseInt(currentTime % 60), 2);
    return (
        <div className={styles.TimeDivision}>
            <p className={styles.Text}>{min}:{sec}</p>
        </div>
    )
}

export default MusicPlayer;


