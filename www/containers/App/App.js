import './App.styl'
import React from 'react'
import FooterNav from '../../components/FooterNav'

class App extends React.Component {
  constructor (props) {
    super(props)
    window.addEventListener('resize', this.onResizeHandler.bind(this))
    this.setMainElement = this.setMainElement.bind(this)
  }

  onResizeHandler () {
    const viewportHeight = window.innerHeight
    if (this.mainElement && (this.mainElement.getBoundingClientRect().height !== viewportHeight)) {
      this.mainElement.style.height = viewportHeight
    }
  }

  setMainElement (element) {
    this.mainElement = element
  }

  render () {
    const { children } = this.props
    return (
      <div className="AppContainer">
        <main ref={this.setMainElement}>
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
