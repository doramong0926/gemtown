import React, { Component } from "react";
import PropTypes from "prop-types";
import MusicUploader from "./presenter";

class Container extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            selected_music_genre: '',
            selected_music_genre_detail: '',
            selected_music_career: "",       
            selected_music_file: null,     
            selected_music_cover_image: null,
            musician_nickname: "",
            music_album_title: "",
            music_title: "",
            music_description: "",
            terms: false,
            register_block_chain: '1',
            visibleMusicCoverSelectorModal: false,
            visibleResultModal: false,
            upload_result: false,
            resultMessage: "",
            visibleConfirmModal: false,
            confirmData: null,
        };    
    }

    static propTypes = {
        pathname: PropTypes.string.isRequired,
        userInfo: PropTypes.shape({
            musician: PropTypes.shape({
                nickname: PropTypes.string,
            }),
        }),
        isLoggedIn: PropTypes.bool.isRequired,
        userid: PropTypes.string,
        FetchMypostedMusic: PropTypes.func.isRequired,
        SaveMypostedMusic: PropTypes.func.isRequired,
        FetchRegisterMusic: PropTypes.func.isRequired,
        token: PropTypes.string,
        music_cover_list: PropTypes.array,
        FetchMusicCover: PropTypes.func.isRequired,
        SaveMusicCoverList: PropTypes.func.isRequired,
        SaveNewMusic: PropTypes.func.isRequired,
        SaveNewMusicExpansion: PropTypes.func.isRequired,
        SaveRatingMusic: PropTypes.func.isRequired,
        SaveRatingMusicExpansion: PropTypes.func.isRequired,
    }
    
    static contextTypes = {
        t: PropTypes.func.isRequired
    };

    componentDidMount() {
        if (this.props.isLoggedIn === true && this.props.userid !== null && this.props.token !== null) {
            this.props.FetchMusicCover(this.props.userid, this.props.token, this.FetchMusicCoverCallback)
        }
    }    

    render() {
        return (
            <MusicUploader 
                selected_music_genre={this.state.selected_music_genre}
                selected_music_genre_detail={this.state.selected_music_genre_detail}
                selected_music_career={this.state.selected_music_career}                
                selected_music_file={this.state.selected_music_file}                
                selected_music_cover_image={this.state.selected_music_cover_image}
                musician_nickname={this.state.musician_nickname}
                music_album_title={this.state.music_album_title}                
                music_title={this.state.music_title}                
                music_description={this.state.music_description}                
                terms={this.state.terms}
                handleInputChange={this._handleInputChange}       
                handleOnClickFilter={this._handleOnClickFilter}
                handleOnSubmit={this._handleOnSubmit}            
                visibleMusicCoverSelectorModal={this.state.visibleMusicCoverSelectorModal}
                music_cover_list={this.props.music_cover_list}
                handleOpenMusicCoverSelectorModal = {this._handleOpenMusicCoverSelectorModal}
                handleCloseMusicCoverSelectorModal={this._handleCloseMusicCoverSelectorModal}
                handleSelectMusicCover={this._handleSelectMusicCover}
                visibleResultModal={this.state.visibleResultModal}
                upload_result={this.state.upload_result}
                resultMessage={this.state.resultMessage}
                handleCloseResultModal={this._handleCloseResultModal}
                userInfo_musician_nickname={(this.props.userInfo.musician !== null && this.props.userInfo.musician !== undefined && this.props.userInfo.musician !== "")
                                                                ? this.props.userInfo.musician.nickname
                                                                : null}
                visibleConfirmModal={this.state.visibleConfirmModal}
                handleCloseConfirmModal={this._handleCloseConfirmModal.bind(this)}
                handleConfirm={this._handleConfirm.bind(this)}
                confirmData={this.state.confirmData}                
            />
        )
    }

    _handleOnSubmit = () => {
        const gem_amount = this._calculateGemAmount();
        const data = {
            musician_nickname: (this.props.userInfo.musician !== null && this.props.userInfo.musician !== undefined
                && this.props.userInfo.musician.nickname !== null && this.props.userInfo.musician.nickname !== undefined && this.props.userInfo.musician.nickname !== '')
                ?  this.props.userInfo.musician.nickname 
                : this.state.musician_nickname,
            music: this.state.selected_music_file,
            cover_image : this.state.selected_music_cover_image,
            music_album_title: this.state.music_album_title,
            music_title: this.state.music_title,
            genre: this.state.selected_music_genre,
            genre_detail: this.state.selected_music_genre_detail,
            career: this.state.selected_music_career,
            description: this.state.music_description,
            gemAmountToRegister: gem_amount,
            register_block_chain: this.state.register_block_chain,
        }

        this.setState({
            confirmData: data,
            visibleConfirmModal: true,
        })
    }

    _calculateGemAmount = () => {
        return 10 + this.state.selected_music_cover_image.price;
    }

    _handleCloseConfirmModal = () => {
        this.setState({
            visibleConfirmModal: false,
            confirmData: null,
        })
    }

    _handleConfirm = () => {
        const request_data = {
            file : this.state.selected_music_file,
            cover_image : this.state.selected_music_cover_image.id,
            album_title: this.state.music_album_title,
            musician_nickname: (this.props.userInfo.musician !== null && this.props.userInfo.musician !== undefined
                                            && this.props.userInfo.musician.nickname !== null && this.props.userInfo.musician.nickname !== undefined && this.props.userInfo.musician.nickname !== '')
                                            ?  this.props.userInfo.musician.nickname 
                                            : this.state.musician_nickname,
            title: this.state.music_title,
            description: this.state.music_description,
            genre: this.state.selected_music_genre,
            genre_detail: this.state.selected_music_genre_detail,
            career: this.state.selected_music_career,
            register_block_chain: this.state.register_block_chain,
        }
        this.props.FetchRegisterMusic(this.props.userid, true, this.props.token, request_data, this.FetchRegisterMusicCallback);
    }


    _handleCloseResultModal = () => {
        this.setState({
            visibleResultModal: false,
        })
    }

    _handleOpenMusicCoverSelectorModal = () => {
        this.setState({
            visibleMusicCoverSelectorModal: true,
        })
    }
    

    _handleCloseMusicCoverSelectorModal = () => {
        this.setState({
            visibleMusicCoverSelectorModal: false,
        })
    }

    _handleSelectMusicCover = (cover_image) => {
        this.setState({
            visibleMusicCoverSelectorModal: false,
            selected_music_cover_image: cover_image,
        })
    }

    _handleOnClickFilter = (event) => {
        const { target: { id } } = event;
        const name = event.target.getAttribute('name')
        this.setState({
            [name]: id,
        })
    }    

    _handleInputChange = (event) => {
        const { target: { files, id, value } } = event;
        if (id === "terms") {
            this.setState({
                terms: !this.state.terms,
            })
        } else if (id === "selected_music_file") {
            if (files[0] === undefined) {
                return;
            }    
            this.setState({
                [id]: files[0],
            })
        } else {
            this.setState({
                [id]: value,
            })
        }
    }

    FetchRegisterMusicCallback  = (result, json) => {
        this.setState({
            visibleConfirmModal: false,
        })
        if (result === true) {
            this.setState({
                upload_result: true,
                visibleResultModal: true,
                resultMessage: json === null || json === undefined ? "" : json.message,
            })
            this.setState({
                selected_music_genre: '',
                selected_music_genre_detail: '',
                selected_music_career: '',
                selected_music_file: null,
                selected_music_cover_image: null,
                musician_nickname: '',
                music_album_title: '',
                music_title: '',
                music_description: '',
                terms: false,
                confirmData: null,
            })
            this.props.FetchMypostedMusic(this.props.userid, false, this.FetchMypostedMusicCallback);
            this.props.SaveNewMusic([]);
            this.props.SaveRatingMusic([]);
            this.props.SaveNewMusicExpansion([]);
            this.props.SaveRatingMusicExpansion([]);
        } else {
            this.setState({
                upload_result: false,
                visibleResultModal: true,
                resultMessage: json === null || json === undefined ? "" : json.message,
            })
        }
    }

    FetchMypostedMusicCallback = (result, json) => {
        if (result === true) {
            this.props.SaveMypostedMusic(json.result)
        }
    }

    FetchMusicCoverCallback  = (result, json) => {
        if (result === true) {
            this.props.SaveMusicCoverList(json.result);
        }
    }
}

export default Container;