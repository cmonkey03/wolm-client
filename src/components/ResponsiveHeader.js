import PropTypes from 'prop-types';
import React from 'react';
import DesktopNavigation from './DesktopNavigation';
import MobileNavigation from './MobileNavigation';

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */

const ResponsiveHeader = ({ children }) => (
  <div>
    <DesktopNavigation>{children}</DesktopNavigation>
    <MobileNavigation>{children}</MobileNavigation>
  </div>
)

ResponsiveHeader.propTypes = {
  children: PropTypes.node,
}

export default ResponsiveHeader;
