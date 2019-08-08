import React from "react";
import HeaderBar from "./headerbar";

export class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            itemSearch: "",
            searchResult: "",
            searchRating: "",
            errorMsg: null,
            rank1: "",
            rank2: "",
            rank3: "",
            rank4: "",
            rank5: "",
        };
    }

    componentDidMount() {
        this.retrieveProfile();
    }

       onItemSearch = (event) => {
        this.setState({itemSearch: event.target.value});
    }


    //ORIGINAL CODE
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
            this.setState({ errorMsg: "Failed to find user" });
            return;
         }
        this.setState({searchResult: responsePayload.itemId});
        this.setState({searchRating: "rating: " + responsePayload.rating});
    };

    //MOSTLY ORIGINAL CODE
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
        } else {
            this.setState({
                errorMsg: "Issue with HTTP connection: status code " + response.status,
            });
        }
    }

    populateList = async () => {
        const url = "/api/itemList";

        let response;

        try {
            response = await fetch(url, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
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
                rank4: payload.rank4,
                rank5: payload.rank5,
            });
        } else {
            this.setState({
                errorMsg: "Issue with HTTP connection: status code " + response.status,
            });
        }
    };

    //ORIGINAL CODE
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
            </div>
        );
    }

    renderNotLoggedIn() {
        return (
            <div>
        <span>
          To be able to test search for more pokemon ratings you need to login. If you do not
          have an account, you can sign up to create a new one.
        </span>
            </div>
        );
    }

    renderCardList() {
        return (
            <div className="rankContent">
                <p className="rankHeader">Top 5</p>
                <button className="btnSearch" onClick={this.populateList}>Show top 5</button>
                <ol className="rankList">
                    <li>{this.state.rank1}</li>
                    <li>{this.state.rank2}</li>
                    <li>{this.state.rank3}</li>
                    <li>{this.state.rank4}</li>
                    <li>{this.state.rank5}</li>
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

        cardList = this.renderCardList();

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
