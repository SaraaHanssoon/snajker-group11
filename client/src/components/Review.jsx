import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Rating, Typography, Card, CardContent } from '@mui/material';

function Review({ review }) {
  return (
    <Card sx={{ maxWidth: 345, m: 2, backgroundColor: '#f3e5f5', boxShadow: 'none', border: '1px solid #bcaaa4' }}>
      <CardContent>
        <Link to={`/reviews/${review.id}`} style={{ textDecoration: 'none' }}>
          <Typography
            sx={{ mb: 1 }}
            color="text.primary"
            variant="h5"
            component="span"
          >
            {review.title}
          </Typography>
        </Link>

        <Rating name="read-only" value={review.review} readOnly sx={{ mb: 1 }} />

        <Typography
          color="text.secondary"
          variant="body2"
          component="span"
        >
          {review.body}
        </Typography>
      </CardContent>
    </Card>
  );
}

Review.propTypes = {
  review: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    review: PropTypes.number.isRequired,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
  }).isRequired
};

export default Review;
