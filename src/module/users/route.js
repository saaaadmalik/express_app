const express = require('express');
const controller = require('./controller');
const validation = require('./validation');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const { storage, imageFilter } = require('../../utils/fileUpload')
const multer = require("multer");

const router = express.Router();

const uploadPic = multer({

  storage: storage,
  fileFilter: imageFilter

}).single('image');

router
  .route('/')
  .post(auth(), validate(validation.createUser), controller.createUser)
  .get(auth(),validate(validation.queryUsers), controller.queryUsers);


router
  .route('/:userId')
  .get(auth('getUsers'), validate(validation.getUser), controller.getUser)
  .patch(auth('manageUsers'), validate(validation.updateUser), uploadPic, controller.updateUser)
  .delete(auth('manageUsers'), validate(validation.deleteUser), controller.deleteUser);

module.exports = {
  userRoutes: router,
};
