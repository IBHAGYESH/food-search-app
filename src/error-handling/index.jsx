import { ErrorBoundary } from 'react-error-boundary';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

function withErrorHandler(Component, Fallback) {
  function ComponentWithErrorHandling(props) {
    return (
      <ErrorBoundary FallbackComponent={Fallback}>
        <Component {...props} />
      </ErrorBoundary>
    );
  }

  ComponentWithErrorHandling.displayName = `WithErrorHandling${getDisplayName(
    Component
  )}`;

  return ComponentWithErrorHandling;
}

export { withErrorHandler };
