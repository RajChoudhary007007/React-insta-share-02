import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import './App.css'
import SearchContext from './SearchContext'

import LoginForm from './components/LoginForm'

import Home from './components/Home'
import Profile from './components/Profile'
import UserProfile from './components/UserProfile'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'

class App extends Component {
  state = {
    isDark: false,
    searchInput: '',
    searchPostView: false,
  }

  onChangeTheme = () => {
    this.setState(prev => ({isDark: !prev.isDark}))
  }

  changeSearch = result => {
    this.setState({searchInput: result})
  }

  enterSearch = () => {
    this.setState(prevState => ({
      searchPostView: !prevState.searchPostView,
    }))
  }

  render() {
    const {isDark, searchInput, searchPostView} = this.state

    return (
      <SearchContext.Provider
        value={{
          isDark,
          searchInput,
          searchPostView,
          changeSearchInput: this.changeSearch,
          enterSearchButton: this.enterSearch,
          changeTheme: this.onChangeTheme,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/my-profile" component={Profile} />
          <ProtectedRoute exact path="/users/:userId" component={UserProfile} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </SearchContext.Provider>
    )
  }
}

export default App
