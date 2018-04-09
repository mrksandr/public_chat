import models from '../models';
import { resSuccess, resError } from '../utils';

module.exports.getAllPosts = async (req, res) => {
  try {
    const posts = await models.Post.findAll();
    resSuccess(res, { posts });
  } catch (err) {
    resError(res, err, 400);
  }
};

export const createPost = async (req, res, next) => {
  try {
    const post = await models.Post.create({
      username: req.body.username,
      text: req.body.text,
    });

    resSuccess(res, { post }, 201);
  } catch (err) {
    resError(res, err, 400);
  }
};

export const postByPage = async (req, res) => {
  const page = req.params.page;
  const limit = 10;
  const offset = limit * (page - 1);

  try {
    const data = await models.Post.findAndCountAll({
      limit: limit,
      offset: offset,
      $sort: { id: 1 },
    });

    const pages = Math.ceil(data.count / limit);

    let posts = data.rows;

    resSuccess(res, { posts, count: data.count, pages: pages });
  } catch (err) {
    resError(res, err, 400);
  }
};
