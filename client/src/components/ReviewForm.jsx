import { Box, Button, TextField, Rating, Typography } from '@mui/material';
import { useState } from 'react';
import PropTypes from 'prop-types';

function ReviewForm({ onSave }) {
  const [review, setReview] = useState({ title: '', body: '', review: 3 });

  return (
    <form>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, padding: '2rem', backgroundColor: '#fff3e0', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <Typography variant="h6" component="legend" color="text.primary">
          Title of Your Review:
        </Typography>
        <TextField
          fullWidth
          value={review.title}
          onChange={(e) => setReview({ ...review, title: e.target.value })}
          label="Title"
          name="title"
          variant="outlined"
          margin="normal"
          InputLabelProps={{
            style: { color: '#6d4c41' },
          }}
          inputProps={{
            style: { color: '#5d4037' }, 
          }}
        />

        <Typography variant="h6" component="legend" color="text.primary">
          Write your review here:
        </Typography>
        <TextField
          fullWidth
          multiline
          minRows={4}
          value={review.body}
          onChange={(e) => setReview({ ...review, body: e.target.value })}
          label="Content"
          name="body"
          variant="outlined"
          margin="normal"
          InputLabelProps={{
            style: { color: '#6d4c41' }, 
          }}
          inputProps={{
            style: { color: '#5d4037' },
          }}
        />

        <Typography variant="h6" component="legend" color="text.primary">
          Rate the Product:
        </Typography>
        <Rating
          name="simple-controlled"
          value={review.review}
          onChange={(event, newValue) => {
            setReview({ ...review, review: newValue });
          }}
        />

        <Button variant="contained" color="primary" onClick={() => onSave(review)} sx={{ bgcolor: '#795548', '&:hover': { bgcolor: '#5d4037' } }}>
          Save Review
        </Button>
      </Box>
    </form>
  );
}

ReviewForm.propTypes = {
  onSave: PropTypes.func.isRequired,
};

export default ReviewForm;
