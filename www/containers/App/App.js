import './App.styl'
import React from 'react'
import FooterNav from '../../components/FooterNav'

class App extends React.Component {

  render () {
    const { children } = this.props
    return (
      <div className="AppContainer">
        <main>
          {children}
        </main>
        <FooterNav />
      </div>
    )
  }
}

App.propTypes = {
  children: React.PropTypes.node
}

export default App
