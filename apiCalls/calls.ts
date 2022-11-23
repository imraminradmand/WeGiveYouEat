import axios from "axios";

const URL = "http://34.82.133.0:8081/api";

export const getAllPosts = async () => {
  const res = await axios.get(`${URL}/posts`);
  return res.data;
};

export const getPostInfo = async (opt2: string) => {
  const res = await axios.get(`${URL}/posts?opt2=${opt2}`);
  return res.data;
};

export const getUserPosts = async (uid: string) => {
  const res = await axios.get(`${URL}/posts/user/${uid}`);
  return res.data;
};

export const getPostFromId = async (id: number) => {
  const res = await axios.get(`${URL}/posts/post/${id}`);
  return res.data;
};

export const addUser = async (body: string) => {
  const res = await axios.post(`${URL}/users`, JSON.parse(body));
  return res.data;
};

export const addPost = async (body: string) => {
  const res = await axios.post(`${URL}/posts`, JSON.parse(body));
  return res.data;
};

export const deleteUser = async (uid: number) => {
  const res = await axios.delete(`${URL}/delete/users/${uid}`);
  return res.data;
};

export const deletePost = async (id: number) => {
  const res = await axios.delete(`${URL}/delete/posts/${id}`);
  return res.data;
};

export const updateUser = async (body: string) => {
  const res = await axios.patch(`${URL}/patch/users`, JSON.parse(body));
  return res.data;
};
