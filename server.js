// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import rootdir from './utils/pathutils';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';



//========internal Module============

import userRouter from './routers/userRouter.js';
import accessRouter from './routers/accessRouter.js'
import historyRouter from './routers/historyRouter.js'
import errorRouter from './routers/ErrorRouter.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 7777;

// ===== View engine =====
app.set('view engine', 'ejs');
app.set("views", path.join(rootdir, "./views"));
app.use(express.static(path.join(rootdir,"./public")));


// ===== middleware =====
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===== Session setup =====
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'fallbackSecret123!',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  })
);

// ===== Routers =====
app.use(userRouter);
app.use(accessRouter);
app.use(historyRouter);
app.use(errorRouter);



// ===== MongoDB connection =====
mongoose.connect(process.env.MONGO_URI)
  .then(() =>{ console.log('--> MongoDB connected successfully.')
    // ===== Start server =====
    app.listen(PORT, () => console.log(` ==> Server running at http://localhost:${PORT}`));

  })
  .catch(err => console.error('---> MongoDB connection error:', err));


