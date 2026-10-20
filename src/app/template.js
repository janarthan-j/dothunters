// Re-mounts on every navigation, so each page plays the enter animation.
// Exit fade is driven by RouteTransition via html[data-navigating].
export default function Template({ children }) {
  return <div className="page-shell">{children}</div>;
}
