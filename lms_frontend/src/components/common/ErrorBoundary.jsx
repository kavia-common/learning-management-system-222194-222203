import React from 'react';

// PUBLIC_INTERFACE
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error('ErrorBoundary caught error', error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="page">
          <h2>Something went wrong.</h2>
          <p className="text-muted">{String(this.state.error)}</p>
          <button className="btn" onClick={() => window.location.reload()}>Reload</button>
        </div>
      );
    }
    return this.props.children;
  }
}
