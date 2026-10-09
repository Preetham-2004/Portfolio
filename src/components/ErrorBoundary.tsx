import { Component, type ReactNode } from "react";

export class ErrorBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) {
      return (
        <main style={{ padding: "10vh 8vw", fontFamily: "sans-serif" }}>
          <h1>Something went wrong.</h1>
          <p>Please reload the page or get in touch by email.</p>
          <p>
            <a href="/">Reload portfolio</a>
          </p>
          <a href="mailto:preethambhat1104@gmail.com">Email Preetham</a>
        </main>
      );
    }
    return this.props.children;
  }
}
