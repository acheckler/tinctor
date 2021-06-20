import React, { Component } from "react";
import PropTypes from 'prop-types'

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
          hasError: false
        };
      }
    
    static propTypes = {
        children: PropTypes.node
      }
    static getDerivedStateFromError(error) {
        return { hasError: true };
      }

      render() {
        if (this.state.hasError) {      
          return (
            <h2>Could not display this component.</h2>
          );
        }
        return this.props.children;
      }  
}
 export default ErrorBoundary