import History from '../models/historyModel.js';
export const history=async (req, res) => {
  try {
    const history = await History.find({ userId: req.session.userId })
    .sort({ timestamp: -1 });
    res.render('history', { history ,currentPage:'history',pageTitle:'History'});
  } catch (err) {
    console.error(" History fetch error:", err);
    res.status(500).render('error');
  }
} 
