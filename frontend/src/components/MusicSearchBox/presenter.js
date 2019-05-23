import React from "react";
import PropTypes from "prop-types";
import {
    Image,
    Sticky,
} from "semantic-ui-react";
import styles from "./styles.module.scss";
import {
    SORTING_MENU_ID,
    SORTING_FILTER_ID,
    WEBSITE_PATH,
} from "./../../config/constants";

const MusicSearchBox = (props, context) => {
    return (
        <div className={styles.RootDivision}>
            <RenderFilter {...props} />
            <RenderMenuItem {...props} />
        </div>
    )
}

const RenderFilter = (props, context) => {
    return (
        <div className={styles.TopDivision}>
            <div className={styles.SortingFilterDivision}>
                <div className={styles.LeftDivision}>
                    <div className={styles.ContentDivision}>
                        <div className={styles.SubTitleDivision}>
                            <p className={styles.Text}>{context.t("장르")}</p>
                        </div>
                        <div className={styles.CategoryDivision}>
                            {
                                props.GenreList.map((t, index) => {
                                    if (props.music_filter.genre !== undefined
                                        && props.music_filter.genre.includes(t.id)) {
                                        return (
                                            <p
                                                id={t.id} key={index}
                                                className={styles.SelectedText}
                                                onClick={() => {
                                                    props.handleOnClickFilter(SORTING_FILTER_ID.GENRE, t.id)
                                                }}
                                            >
                                                {t.name}
                                            </p>
                                        )
                                    } else {
                                        return (
                                            <p
                                                id={t.id} key={index}
                                                className={styles.Text}
                                                onClick={() => {
                                                    props.handleOnClickFilter(SORTING_FILTER_ID.GENRE, t.id)
                                                }}
                                            >
                                                {t.name}
                                            </p>
                                        )
                                    }
                                })
                            }
                        </div>
                    </div>
                    <div className={styles.ContentDivision}>
                        <div className={styles.SubTitleDivision}>
                            <p className={styles.Text}>{context.t("세부장르")}</p>
                        </div>
                        <div className={styles.CategoryDivision}>
                            {
                                props.GenreDetailList.map((t, index) => {
                                    if (props.music_filter.genre_detail !== undefined
                                        && props.music_filter.genre_detail.includes(t.id)) {
                                            return (
                                                <p
                                                    id={t.id} key={index}
                                                    className={styles.SelectedText}
                                                    onClick={() => {
                                                        props.handleOnClickFilter(SORTING_FILTER_ID.GENRE_DETAIL, t.id)
                                                    }}
                                                >
                                                    {t.name}
                                                </p>
                                            )
                                    } else {
                                        return (
                                            <p
                                                id={t.id} key={index}
                                                className={styles.Text}
                                                onClick={() => {
                                                    props.handleOnClickFilter(SORTING_FILTER_ID.GENRE_DETAIL, t.id)
                                                }}
                                            >
                                                {t.name}
                                            </p>
                                        )
                                    }
                                })
                            }
                        </div>
                    </div>
                    <div className={styles.ContentDivision}>
                        <div className={styles.SubTitleDivision}>
                            <p className={styles.Text}>{context.t("경력")}</p>
                        </div>
                        <div className={styles.CategoryDivision}>
                            {
                                props.CareerList.map((t, index) => {
                                    if (props.music_filter.career !== undefined
                                        && props.music_filter.career.includes(t.id)) {
                                            return (
                                                <p
                                                    id={t.id} key={index}
                                                    className={styles.SelectedText}
                                                    onClick={() => {
                                                        props.handleOnClickFilter(SORTING_FILTER_ID.CAREER, t.id)
                                                    }}
                                                >
                                                    {t.name}
                                                </p>
                                            )
                                    } else {
                                        return (
                                            <p
                                                id={t.id} key={index}
                                                className={styles.Text}
                                                onClick={() => {
                                                    props.handleOnClickFilter(SORTING_FILTER_ID.CAREER, t.id)
                                                }}
                                            >
                                                {t.name}
                                            </p>
                                        )
                                    }
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className={styles.RightDivision}>
                    <div
                        id='sorting_icon'
                        onClick={props.handleOnClick}
                        className={styles.SortingIconDivision}
                    >
                        <Image
                            id='sorting_image'
                            src={require("images/icons/png/sorting_icon.png")}
                            onClick={props.handleOnClick}
                            className={styles.SortingIcon}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

const RenderMenuItem = (props, context) => {
    const MenuList = [
        { id: SORTING_MENU_ID.NEW_UPDATE, path: WEBSITE_PATH.MUSIC_NEW ,name: context.t("NEW UPDATE") },
        { id: SORTING_MENU_ID.RATING, path: WEBSITE_PATH.MUSIC_RATING, name: context.t("RATING") },
        { id: SORTING_MENU_ID.SOCIAL, path: WEBSITE_PATH.MUSIC_SOCIAL, name: context.t("SOCIAL MEDIA") },
    ]
    if (props.pathname !==  WEBSITE_PATH.MUSIC
        && props.pathname !== WEBSITE_PATH.MUSIC
        && props.pathname !==  WEBSITE_PATH.MUSIC) {
        return null
    }
    return (
        <Sticky context={props.contextRef}>
            <div className={styles.BottomDivision}>
                <div className={styles.MenuItemDivision}>
                    {
                        MenuList.map((t, index) => {
                            return (
                                <p
                                    key={index}
                                    id={t.id}
                                    onClick={
                                        () => {
                                            props.handleOnClickMenu(t.id);
                                        }
                                    }
                                    className={styles.Text}
                                >
                                    {t.name}
                                </p>
                            )
                        })
                    }
                </div>
            </div>
        </Sticky>
    )
}

MusicSearchBox.propTypes = {
    music_filter: PropTypes.object,
    handleOnClick: PropTypes.func.isRequired,
    handleOnClickFilter: PropTypes.func.isRequired,
    CareerList: PropTypes.array.isRequired,
    GenreList: PropTypes.array.isRequired,
    GenreDetailList: PropTypes.array.isRequired,
    pathname: PropTypes.string.isRequired,
    contextRef: PropTypes.any,
    handleOnClickMenu: PropTypes.func.isRequired
}

MusicSearchBox.contextTypes = {
    t: PropTypes.func.isRequired
};

RenderFilter.contextTypes = {
    t: PropTypes.func.isRequired
};
RenderMenuItem.contextTypes = {
    t: PropTypes.func.isRequired
};

export default MusicSearchBox;
