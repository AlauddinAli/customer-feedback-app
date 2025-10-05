const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');
const auth = require('../middleware/auth');

// POST /feedback - Create feedback (authenticated user)
router.post('/', auth, async (req, res) => {
  try {
    const { content } = req.body;
    
    if (!content || content.trim() === '') {
      return res.status(400).json({ message: 'Content required' });
    }

    const feedback = new Feedback({ 
      user: req.user.id, 
      content: content.trim() 
    });
    
    await feedback.save();
    res.json(feedback);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /feedback - Get user's own feedbacks OR all feedbacks if admin
router.get('/', auth, async (req, res) => {
  try {
    let feedbacks;
    
    if (req.user.role === 'admin') {
      // Admin sees ALL feedbacks
      feedbacks = await Feedback.find()
        .sort({ createdAt: -1 })
        .populate('user', 'username email');
    } else {
      // Regular user sees only their own
      feedbacks = await Feedback.find({ user: req.user.id })
        .sort({ createdAt: -1 });
    }
    
    res.json(feedbacks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /feedback/:id - View single feedback
router.get('/:id', auth, async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    
    if (!feedback) {
      return res.status(404).json({ message: 'Not found' });
    }

    const isOwner = feedback.user.toString() === req.user.id;
    const isAdmin = req.user.role === 'admin';
    
    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    res.json(feedback);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /feedback/:id - Update feedback
router.put('/:id', auth, async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    
    if (!feedback) {
      return res.status(404).json({ message: 'Not found' });
    }

    const isOwner = feedback.user.toString() === req.user.id;
    const isAdmin = req.user.role === 'admin';
    
    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const { content } = req.body;
    if (!content || content.trim() === '') {
      return res.status(400).json({ message: 'Content required' });
    }

    feedback.content = content.trim();
    await feedback.save();
    
    res.json(feedback);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /feedback/:id - Delete feedback
router.delete('/:id', auth, async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    
    if (!feedback) {
      return res.status(404).json({ message: 'Not found' });
    }

    const isOwner = feedback.user.toString() === req.user.id;
    const isAdmin = req.user.role === 'admin';
    
    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await Feedback.deleteOne({ _id: feedback._id });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;