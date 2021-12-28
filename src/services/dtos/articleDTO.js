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
  const object = articlePropsValidator(props);
  if (object) return objectResponse(statusCode.badRequest, object);

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

module.exports = {
  articleDTOcreate,
};
