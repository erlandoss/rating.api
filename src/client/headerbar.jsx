import React from "react";
import { Link, withRouter } from "react-router-dom";

class HeaderBar extends React.Component {
  constructor(props) {
    super(props);
  }

  doLogout = async () => {
    const url = "/api/logout";

    let response;

    try {
      response = await fetch(url, { method: "post" });
    } catch (err) {
      alert("Failed to connect to server: " + err);
      return;
    }

    if (response.status !== 204) {
      alert("Error when connecting to server: status code " + response.status);
      return;
    }
    this.props.updateLoggedInUserId(null);
    this.props.history.push("/");
  };

  renderLoggedIn(userId, ratingCount) {
    return (
      <div className="header">
        <h2 className="notLoggedInMsg">
          Welcome {userId}
        </h2>
        <div className="logOutBtn" onClick={this.doLogout}>
          Logout
        </div>
      </div>
    );
  }

  renderNotLoggedIn() {
    return (
      <div className="header">
        <div className="notLoggedInMsg">You are not logged in</div>
        <div className="btnPart">
          <Link className="btn" to="/login">
            LogIn
          </Link>
          <Link className="btn" to="/signup">
            SignUp
          </Link>
        </div>
      </div>
    );
  }

  render() {
    const userId = this.props.userId;

    //const ratingCount = this.props.ratingCount;
    //Not implemented yet as the ability to create new ratings is not completed.

    let headerContent;
    if (userId === null || userId === undefined) {
      headerContent = this.renderNotLoggedIn();
    } else {
      headerContent = this.renderLoggedIn(userId/*, ratingCount*/);
    }

    return (
      <div className={"headerBar"}>
        <Link className="home btn" to={"/"}>
          Home
        </Link>
        {headerContent}
      </div>
    );
  }
}

export default withRouter(HeaderBar);
