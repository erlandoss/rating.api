import React from "react";
import HeaderBar from "./headerbar";
import {withRouter} from "react-router-dom";

export class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userSearch: "",
            searchResult: "",
            searchRating: "",
            errorMsg: null
        };
    }

    componentDidMount() {
        this.retrieveProfile();
    }

    onItemSearch = (event) => {
        this.setState({itemSearch: event.target.value});
    }


    //ORIGINAL CODE
    searchUser = async () => {
        const url = "/api/search";
        const payload = {search: this.state.userSearch};
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
        /*
        if (response.status !== 204) {
            this.setState({
                errorMsg:
                    "Error when connecting to server: status code " + response.status
            });
        }*/

        this.setState({searchResult: responsePayload.userId});
        this.setState({searchRating: responsePayload.surname});
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

    //ORIGINAL CODE
    renderLoggedIn() {
        return (
            <div className="signupArea">
                <p>Name: {this.props.userId}</p>
                <p>Rating: {this.props.rating}</p>
                Search:{""}
                <input
                    type="text"
                    name="search"
                    value={this.state.itemSearch}
                    onChange={this.onItemSearch}
                    className="lastInput"
                />
                <button className="btnSearch" onClick={this.searchUser}>Search</button>
                <p>{this.state.searchResult}</p>
                <p>{this.state.searchRating}</p>
            </div>
        );
    }



    renderNotLoggedIn() {
        return (
            <div>
        <span>
          To be able to see your account you need to log in first. If you do not
          have an account, you can sign up to create a new one.
        </span>
            </div>
        );
    }

    render() {
        const userId = this.props.userId;
        let pageContent;

        if (userId === null || userId === undefined) {
            pageContent = this.renderNotLoggedIn();
        } else {
            pageContent = this.renderLoggedIn();
        }

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
                    <p className="MyPage">My Page</p>
                </div>

                <div className="mainContent">
                    {pageContent}
                    {error}
                </div>
            </div>
        );
    }
}


export default withRouter(Search);
