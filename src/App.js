import {Component} from 'react'
import {v4} from 'uuid'

import './App.css'

const bgColors = ['green', 'yellow', 'orange', 'brown', 'blue']

class App extends Component {
  state = {
    detailsList: [],
    isTrue: false,
    isShow: false,
    website: '',
    username: '',
    password: '',
    searchInput: '',
  }

  onChangeWebsite = event => {
    this.setState({
      website: event.target.value,
    })
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onAddDetails = event => {
    event.preventDefault()
    const {website, username, password} = this.state
    const bgColor = bgColors[Math.floor(bgColors.length * 5)]
    const newDetail = {
      id: v4(),
      websiteName: website,
      initialValue: website.slice(0, 1).toUpperCase(),
      userName: username,
      passWord: password,
      isTrue: true,
      classAdd: bgColor,
    }
    this.setState(prevState => ({
      detailsList: [...prevState.detailsList, newDetail],
      website: '',
      username: '',
      password: '',
    }))
  }

  checkboxChecked = e => {
    if (e.target.checked) {
      this.setState({isShow: true})
    } else {
      this.setState({isShow: false})
    }
  }

  deleteItem = id => {
    const {detailsList} = this.state

    const newList = detailsList.filter(each => each.id !== id)
    this.setState({detailsList: newList})
  }

  render() {
    const {
      website,
      username,
      password,
      searchInput,
      isShow,
      detailsList,
    } = this.state
    const searchResults = detailsList.filter(each =>
      each.websiteName.toLowerCase().includes(searchInput.toLowerCase()),
    )
    let {isTrue} = this.state
    if (searchResults.length === 0) {
      isTrue = false
    } else {
      isTrue = true
    }

    return (
      <div className="bg-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />
        <div className="add-password-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
            className="add-password-image1"
          />
          <form className="form-container" onSubmit={this.onAddDetails}>
            <h1 className="form-heading">Add New Password</h1>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
                className="input-image"
              />
              <input
                className="input"
                type="text"
                placeholder="Enter Website"
                onChange={this.onChangeWebsite}
                value={website}
              />
            </div>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="Username"
                className="input-image"
              />
              <input
                className="input"
                type="text"
                placeholder="Enter Username"
                onChange={this.onChangeUsername}
                value={username}
              />
            </div>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
                className="input-image"
              />
              <input
                className="input"
                type="password"
                placeholder="Enter Password"
                onChange={this.onChangePassword}
                value={password}
              />
            </div>
            <button className="add-btn" type="submit">
              Add
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="add-password-image2"
          />
        </div>
        <div className="passwords-container">
          <div className="container-1">
            <div>
              <h1 className="password-heading">Your Passwords</h1>
              <p className="length-span">{detailsList.length}</p>
            </div>
            <div className="search-icon-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="search-icon"
              />
              <input
                type="search"
                className="input"
                onChange={this.onChangeSearchInput}
                value={searchInput}
              />
            </div>
          </div>
          <hr />
          <div className="checkbox-container">
            <input type="checkbox" id="check" onChange={this.checkboxChecked} />
            <label className="show-password" htmlFor="check">
              Show Passwords
            </label>
          </div>
          {!isTrue && (
            <div className="no-result-container">
              <img
                className="no-password-image"
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
              />
              <p className="form-heading">No Passwords</p>
            </div>
          )}
          {isTrue && (
            <ul className="result-container">
              {searchResults.map(eachValue => (
                <li className="item-list" id={eachValue.id} key={eachValue.id}>
                  <p className={`initial ${eachValue.classAdd}`}>
                    {eachValue.initialValue}
                  </p>
                  <div className="list-content">
                    <p className="website">{eachValue.websiteName}</p>
                    <p className="website">{eachValue.userName}</p>
                    {!isShow && (
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                        className="stars-image"
                        alt="stars"
                      />
                    )}
                    {isShow && <p className="website">{eachValue.passWord}</p>}
                  </div>
                  <button
                    type="button"
                    className="del-btn"
                    data-testid="delete"
                    onClick={() => this.deleteItem(eachValue.id)}
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                      className="del-image"
                      alt="delete"
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App
