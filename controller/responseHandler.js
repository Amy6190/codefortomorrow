exports.successResponse = (message, data = {}) => ({
    success: true,
    status: 200,
    message,
    data,
  });
  
  exports.errorResponse = (message = 'Something Went Wrong! Please Try Again', error = null) => ({
    success: false,
    status: 500,
    message,
    error,
  });
  