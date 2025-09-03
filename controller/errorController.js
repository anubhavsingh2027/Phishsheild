export const Errorpage404=(req, res) =>{ 
  res.status(404).render('error')
}
export const Errorpage500=(req, res) =>{ 
  res.status(500).render('error')
}