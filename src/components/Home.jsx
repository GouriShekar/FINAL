import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box, Card, CardActions, CardContent, Button,
  Typography, CardMedia, TextField
} from '@mui/material';

const Home = () => {
  const [cardData, setCardData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editInputs, setEditInputs] = useState({
    title: '',
    content: '',
    img_url: ''
  });

  // Fetch data on mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get("http://localhost:3001/get")
      .then((res) => {
        setCardData(res.data);
      })
      .catch((err) => console.error("Fetch error:", err));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/${id}`)
      .then(() => fetchData())
      .catch((err) => console.error("Delete error:", err));
  };

  const startEdit = (card) => {
    setEditId(card._id);
    setEditInputs({
      title: card.title,
      content: card.content,
      img_url: card.img_url
    });
  };

  const handleEditChange = (e) => {
    setEditInputs({ ...editInputs, [e.target.name]: e.target.value });
  };

  const submitUpdate = (id) => {
    axios.put(`http://localhost:3001/${id}`, editInputs)
      .then(() => {
        setEditId(null);
        fetchData();
      })
      .catch((err) => console.error("Update error:", err));
  };

  return (
    <Box display="flex" flexWrap="wrap" justifyContent="center" gap={3} p={5}>
      {cardData.map((card) => (
        <Card key={card._id} sx={{ width: 345, minHeight: 400, display: 'flex', flexDirection: 'column' }}>
          <CardMedia
            sx={{ height: 200 }}
            image={card.img_url}
            title={card.title}
          />
          <CardContent>
            {editId === card._id ? (
              <>
                <TextField
                  label="Title"
                  name="title"
                  value={editInputs.title}
                  onChange={handleEditChange}
                  fullWidth
                  margin="dense"
                />
                <TextField
                  label="Content"
                  name="content"
                  value={editInputs.content}
                  onChange={handleEditChange}
                  fullWidth
                  margin="dense"
                />
                <TextField
                  label="Image URL"
                  name="img_url"
                  value={editInputs.img_url}
                  onChange={handleEditChange}
                  fullWidth
                  margin="dense"
                />
              </>
            ) : (
              <>
                <Typography gutterBottom variant="h6" component="div">
                  {card.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {card.content}
                </Typography>
              </>
            )}
          </CardContent>
          <CardActions>
            {editId === card._id ? (
              <Button size="small" variant="contained" sx={{ backgroundColor: '#9c27b0' }} onClick={() => submitUpdate(card._id)}>
                Save
              </Button>
            ) : (
              <Button size="small" variant="contained" sx={{ backgroundColor: '#9c27b0' }} onClick={() => startEdit(card)}>
                Update
              </Button>
            )}
            <Button size="small" variant="contained" color="error" sx={{ backgroundColor: '#9c27b0' }} onClick={() => handleDelete(card._id)}>
              Delete
            </Button>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
};

export default Home;
