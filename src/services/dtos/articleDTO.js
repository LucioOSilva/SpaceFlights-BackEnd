const { v4 } = require('uuid');
const { isAnArray, isNullOrEmpty } = require('../verifiers');
const { objectResponse, statusCode } = require('../statusResponse');

function articlePropsValidator(props) {
  if (isNullOrEmpty(props.title)) return 'empty or invalid field [title]';
  if (isNullOrEmpty(props.url)) return 'empty or invalid field [url]';
  if (isNullOrEmpty(props.imageUrl)) return 'empty or invalid field [imageUrl]';
  if (isNullOrEmpty(props.newsSite)) return 'empty or invalid field [newsSite]';
  if (isNullOrEmpty(props.summary)) return 'empty or invalid field [summary]';
  if (!isAnArray(props.launches)) return 'invalid field [launches]';
  if (!isAnArray(props.events)) return 'invalid field [events]';
  return false;
}

function articleDTOcreate(props) {
  const textReturn = articlePropsValidator(props);
  if (textReturn) return objectResponse(statusCode.badRequest, textReturn);

  return {
    id: v4(),
    title: String(props.title),
    url: String((props.url)),
    imageUrl: String(props.imageUrl),
    newsSite: String(props.newsSite),
    summary: String(props.summary),
    publishedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    featured: false,
    launches: Array.prototype.concat(props.launches),
    events: Array.prototype.concat(props.events),
  };
}

function articleDTOupdate(props) {
  const articleKeys = ['title', 'url', 'imageUrl', 'newsSite', 'summary', 'launches', 'events'];
  const propsKeys = Object.keys(props);

  const result = propsKeys.find((prop) => articleKeys.find((p) => p === prop));
  if (!result) return objectResponse(statusCode.badRequest, 'Impossible to update, verify the key property');
  return {
    ...props,
    updatedAt: new Date().toISOString(),
  };
}

module.exports = {
  articleDTOcreate,
  articleDTOupdate,
};
