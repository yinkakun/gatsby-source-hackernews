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

const fetchStory = async (storyId) => {
  try {
    const response = await axiosInstance.get(`/item/${storyId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const fetchStoriesWithComments = async (storyType) => {
  try {
    const stories = await fetchStories(storyType);
    const storiesWithComment = await Promise.all(
      stories.map(async (story) => {
        const storyWithComents = await fetchStory(story.id);
        return {
          ...story,
          comments: JSON.stringify(storyWithComents.comments),
        };
      }),
    );
    return storiesWithComment;
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

  const topStories = await fetchStoriesWithComments('news');
  const latest = await fetchStoriesWithComments('newest');
  const best = await fetchStoriesWithComments('best');
  const show = await fetchStoriesWithComments('show');
  const jobs = await fetchStoriesWithComments('jobs');
  const ask = await fetchStoriesWithComments('ask');

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
