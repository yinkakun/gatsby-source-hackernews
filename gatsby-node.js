const axios = require('axios');

const axiosInstance = axios.create({
  baseURL: 'https://api.hackerwebapp.com',
  withCredentials: true,
});

const fetchStories = async (storyType) => {
  try {
    const response = await axiosInstance.get(`/${storyType}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const TOP_STORIES_NODE_TYPE = 'HNTopStories';
const LATEST_NODE_TYPE = 'HNLatestStories';
const BEST_NODE_TYPE = 'HNBestStories';
const ASK_NODE_TYPE = 'HNAsks';
const SHOW_NODE_TYPE = 'HNShow';
const JOBS_NODE_TYPE = 'HNJobs';

exports.sourceNodes = async ({ actions, createContentDigest }) => {
  const { createNode } = actions;

  const topStories = await fetchStories('news');
  const latest = await fetchStories('newest');
  const best = await fetchStories('best');
  const show = await fetchStories('show');
  const jobs = await fetchStories('jobs');
  const ask = await fetchStories('ask');

  topStories.forEach((story) => {
    createNode({
      ...story,
      id: story.id.toString(),
      children: [],
      internal: {
        type: TOP_STORIES_NODE_TYPE,
        content: JSON.stringify(topStories),
        contentDigest: createContentDigest(topStories),
      },
    });
  });

  latest.forEach((story) => {
    createNode({
      ...story,
      id: story.id.toString(),
      children: [],
      internal: {
        type: LATEST_NODE_TYPE,
        content: JSON.stringify(latest),
        contentDigest: createContentDigest(latest),
      },
    });
  });

  best.forEach((story) => {
    createNode({
      ...story,
      id: story.id.toString(),
      children: [],
      internal: {
        type: BEST_NODE_TYPE,
        content: JSON.stringify(best),
        contentDigest: createContentDigest(best),
      },
    });
  });

  ask.forEach((story) => {
    createNode({
      ...story,
      id: story.id.toString(),
      children: [],
      internal: {
        type: ASK_NODE_TYPE,
        content: JSON.stringify(ask),
        contentDigest: createContentDigest(ask),
      },
    });
  });

  show.forEach((story) => {
    createNode({
      ...story,
      id: story.id.toString(),
      children: [],
      internal: {
        type: SHOW_NODE_TYPE,
        content: JSON.stringify(show),
        contentDigest: createContentDigest(show),
      },
    });
  });

  jobs.forEach((story) => {
    createNode({
      ...story,
      id: story.id.toString(),
      children: [],
      internal: {
        type: JOBS_NODE_TYPE,
        content: JSON.stringify(jobs),
        contentDigest: createContentDigest(jobs),
      },
    });
  });

  return;
};
