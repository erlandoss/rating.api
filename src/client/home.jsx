import React from "react";
import HeaderBar from "./headerbar";

//Mostly original code

export class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            itemSearch: "",
            searchResult: "",
            searchRating: "",
            searchType: "",
            errorMsg: null,
            filter: "All",
            rank1: "",
            rank2: "",
            rank3: "",
        };
    }

    componentDidMount() {
        this.retrieveProfile();
    }

    onItemSearch = (event) => {
        this.setState({itemSearch: event.target.value});
    }

    onFilter = (event) => {
        this.setState({filter: event.target.value});
    }

    searchItem = async () => {
        const url = "/api/search";
        const payload = {search: this.state.itemSearch};
        let response;

        try {
            response = await fetch(url, {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });
        } catch (err) {
            this.setState({ errorMsg: "Failed to connect to server: " + err });
            return;
        }
        const responsePayload = await response.json();

        if (responsePayload.status === 404) {
            this.setState({ errorMsg: "Failed to find item" });
            return;
         }
        this.setState({searchResult: responsePayload.itemId});
        this.setState({searchRating: "rating: " + responsePayload.rating});
        this.setState({searchType: "type: " + responsePayload.type});
    };

    async retrieveProfile() {
        const url = "/api/user";

        let response;

        try {
            response = await fetch(url);
        } catch (err) {
            this.setState({
                errorMsg: "ERROR when retrieving user: " + err,
            });
            return;
        }

        if (response.status === 401) {
            //we are not logged in, or session did timeout
            return;
        }

        if (response.status === 200) {
            const payload = await response.json();

            this.setState({
                errorMsg: null,
            });
            this.props.updateLoggedInUserId(payload.userId);
            //this.props.updateLoggedInUserRatingCount(payload.ratingCount);
        } else {
            this.setState({
                errorMsg: "Issue with HTTP connection: status code " + response.status,
            });
        }
    }

    populateList = async () => {
        const url = "/api/itemList";
        const payload = {type: this.state.filter};
        let response;

        try {
            response = await fetch(url, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(payload)
            });
        } catch (err) {
            this.setState({
                errorMsg: "ERROR when retrieving itemlist: " + err,
            });
            return;
        }

        if (response.status === 404) {
            this.setState({ errorMsg: "Failed to find list" });
            return;
        }

        if (response.status === 200) {
            const payload = await response.json();
            this.setState({
                errorMsg: null,
                rank1: payload.rank1,
                rank2: payload.rank2,
                rank3: payload.rank3,
            });
        } else {
            this.setState({
                errorMsg: "Issue with HTTP connection: status code " + response.status,
            });
        }
    };

    renderLoggedIn() {
        return (
            <div className="signupArea">
                Search for a pokemon:{""}
                <input
                    type="text"
                    name="search"
                    value={this.state.itemSearch.toLowerCase()}
                    onChange={this.onItemSearch}
                    className="lastInput"
                />
                <button className="btnSearch" onClick={this.searchItem}>Search</button>
                <p>{this.state.searchResult}</p>
                <p>{this.state.searchRating}</p>
                <p>{this.state.searchType}</p>
            </div>
        );
    }

    renderNotLoggedIn() {
        return (
            <div>
                <p>
                    To be able to test search for more pokemon ratings you need to login. If you do not
                    have an account, you can sign up to create a new one.
                </p>
            </div>
        );
    }

    renderPokemonList() {
        return (
            <div className="rankContent">
                <p className="rankHeader">Top 3</p>
                <p>Filter on types</p>
                <input
                    type="text"
                    name="type"
                    value={this.state.filter}
                    onChange={this.onFilter}
                    className="lastInput"
                />
                <button className="btnSearch" onClick={this.populateList}>Show top 3</button>
                <ol className="rankList">
                    <li>{this.state.rank1}</li>
                    <li>{this.state.rank2}</li>
                    <li>{this.state.rank3}</li>
                </ol>
            </div>
        );
    }

    render() {
        const userId = this.props.userId;
        let userContent;
        let cardList;

        if (userId === null || userId === undefined) {
            userContent = this.renderNotLoggedIn();
        } else {
            userContent = this.renderLoggedIn();
        }

        cardList = this.renderPokemonList();

        let error = <div />;
        if (this.state.errorMsg !== null) {
            error = (
                <div className="errorMsg">
                    <p>{this.state.errorMsg}</p>
                </div>
            );
        }

        return (
            <div>
                <HeaderBar
                    userId={this.props.userId}
                    surname={this.props.surname}
                    updateLoggedInUserId={this.props.updateLoggedInUserId}
                />

                <div>
                    <p className="MyPage">Pokemon ratings</p>
                </div>

                <div className="userContent">
                    {userContent}
                    {error}
                </div>

                <div className="userContent">
                    {cardList}
                </div>
            </div>
        );
    }
}
