import { Link } from "@tanstack/react-router";
import { Component } from "react";

class ErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught error:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      <div className="error-boundary">
        <h2>Uh oh!</h2>
        <p>
          There was an error with this page. <Link to="/">Click here</Link> to
          Go back to home.
        </p>
      </div>;
    }
    return this.props.children;
  }
}
// ErrorBoundary.getDerivedStateFromError();
export default ErrorBoundary;
