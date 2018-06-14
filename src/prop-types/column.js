import PropTypes from 'prop-types';

export default PropTypes.shape({
  columnCell: PropTypes.func.isRequired,
  columnClassName: PropTypes.string.isRequired,
  columnHeaderCell: PropTypes.node,
  columnHeaderClassName: PropTypes.string,
  id: PropTypes.string.isRequired,
});
