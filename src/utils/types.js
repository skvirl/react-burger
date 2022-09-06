import PropTypes from "prop-types";

export const ingredientType = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number,
  name: PropTypes.string.isRequired,
});
