import './App.styl'
import React from 'react'
import 'react-fastclick'
import FooterNav from '../../components/FooterNav'

class App extends React.Component {
  blurFocus () {
    document.activeElement.blur()
  }

  render () {
    const { children } = this.props
    return (
      <div
        className="AppContainer"
        onTouchStart={this.blurFocus}
      >
        <main>
          {children}
        </main>
        <footer>
          <FooterNav />
        </footer>
      </div>
    )
  }
}

App.propTypes = {
  children: React.PropTypes.node
}

export default App
