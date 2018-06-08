import PropTypes from 'prop-types';

export default PropTypes.shape({
  className: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  renderNode: PropTypes.func.isRequired,
  labelClassName: PropTypes.string,
  labelNode: PropTypes.node,
});
