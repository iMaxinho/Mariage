import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h1>Oups, quelque chose s'est mal passé</h1>
          <p>Veuillez rafraîchir la page ou réessayer plus tard.</p>
          <button onClick={() => window.location.reload()}>
            Rafraîchir la page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
