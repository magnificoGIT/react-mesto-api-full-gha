const http2 = require('http2');

module.exports.INTERNAL_SERVER_500 = http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR;
module.exports.STATUS_CONFLICT_409 = http2.constants.HTTP_STATUS_CONFLICT;
module.exports.NOT_FOUND_404 = http2.constants.HTTP_STATUS_NOT_FOUND;
module.exports.FORBIDDEN_403 = http2.constants.HTTP_STATUS_FORBIDDEN;
module.exports.UNAUTHORIZED_401 = http2.constants.HTTP_STATUS_UNAUTHORIZED;
module.exports.BAD_REQUEST_400 = http2.constants.HTTP_STATUS_BAD_REQUEST;
module.exports.OK_200 = http2.constants.HTTP_STATUS_OK;
module.exports.CREATED_201 = http2.constants.HTTP_STATUS_CREATED;
