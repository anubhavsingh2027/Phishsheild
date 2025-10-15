
import History from '../models/historyModel.js';

export const index=(req, res) => {
  res.render('index',{currentPage:'home',pageTitle:'PhishShield - Advanced Cybersecurity Protection'});
}
export const about= (req, res) =>{ 
  res.render('about',{currentPage:'about',pageTitle:'About us'});
} 

export const feedback=(req, res) => {
  res.render('contact',{currentPage:'feedback',pageTitle:'Feedback'});
}


export const analyzeUrl=async (req, res) => {
  const { url } = req.body;
  
  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }
  
  try {
    // <<< START: Logic moved from your frontend JS >>>
    const safe_domains = ["google.com", "microsoft.com", "github.com", "stackoverflow.com", "mozilla.org", "apple.com", "amazon.com", "facebook.com", "twitter.com", "linkedin.com", "youtube.com"];
    const suspicious_domains = ["bit.ly", "tinyurl.com", "t.co", "goo.gl", "ow.ly"];
    const malicious_patterns = ["g00gle", "micr0soft", "payp4l", "amaz0n", "faceb00k", "twitt3r", "appl3", "netfIix", "inst4gram", "linked1n", "yah00", "gmai1"];
    const suspicious_tlds = [".tk", ".ml", ".ga", ".cf", ".pw", ".top", ".click", ".download"];
    
    let urlObj = new URL(url.startsWith('http') ? url : `https://${url}`);
    const domain = urlObj.hostname.toLowerCase();
    
    let threatLevel = 'safe'; // Default to safe
    let confidence = 95;
    
    if (malicious_patterns.some(pattern => domain.includes(pattern))) {
      threatLevel = 'malicious';
      confidence = 90;
    } else if (suspicious_domains.some(suspDomain => domain.includes(suspDomain))) {
      threatLevel = 'suspicious';
      confidence = 75;
    } else if (suspicious_tlds.some(tld => domain.endsWith(tld))) {
      threatLevel = 'suspicious';
      confidence = 70;
    } else if (!safe_domains.some(safeDomain => domain.includes(safeDomain))) {
      // If it's not a well-known safe domain, we can lower the confidence slightly
      confidence = 85; 
    }
    
    const analysisResults = {
      level: threatLevel,
      score: confidence,
      // You can add more details here if needed
    };
    
    await History.create({
      userId: req.session.userId,
      action: "Analyze",
      url: url,
      result: analysisResults.level.charAt(0).toUpperCase() + analysisResults.level.slice(1), // Capitalize first letter e.g. "Safe"
    });
    
    res.json({
      success: true,
      scannedUrl: url,
      // Frontend expects 'analysis' object with 'level' and 'score'
      analysis: analysisResults 
    });
    
  } catch (err) {
    console.error("❌ URL Analysis Error:", err);
    res.status(500).json({ error: "An error occurred during analysis." });
  }
}
