export const requireLogin = (req, res, next) => {
  if (req.session && req.session.userId) return next();
  return res.redirect('/login');
};
export const requireLogined=(req,res,next)=>{
  if (req.session && req.session.userId) return next();
  return res.redirect('/login');
}