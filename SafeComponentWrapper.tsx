import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class SafeComponentWrapper extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can log the error to an error reporting service here
    console.error('SafeComponentWrapper caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '200px',
          padding: '2rem',
          backgroundColor: '#f8f9fa',
          border: '2px solid #dc3545',
          borderRadius: '0px',
          color: '#212529',
          textAlign: 'center'
        }}>
          <AlertTriangle size={48} style={{ color: '#dc3545', marginBottom: '1rem' }} />
          <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem', fontWeight: 'bold' }}>
            Module Failure
          </h3>
          <p style={{ margin: '0 0 1rem 0', color: '#6c757d' }}>
            A component has encountered an error and cannot be rendered.
          </p>
          {this.state.error && (
            <details style={{
              fontSize: '0.875rem',
              color: '#6c757d',
              cursor: 'pointer'
            }}>
              <summary>Error Details (Click to expand)</summary>
              <pre style={{
                textAlign: 'left',
                backgroundColor: '#ffffff',
                padding: '1rem',
                border: '1px solid #dee2e6',
                borderRadius: '0px',
                marginTop: '0.5rem',
                overflow: 'auto'
              }}>
                {this.state.error.toString()}
              </pre>
            </details>
          )}
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            style={{
              marginTop: '1rem',
              padding: '0.5rem 1rem',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '0px',
              cursor: 'pointer',
              fontSize: '0.875rem'
            }}
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default SafeComponentWrapper;