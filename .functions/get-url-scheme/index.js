
const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

exports.main = async (event, context) => {
  const { appId, path = 'pages/map/map.html' } = event;
  
  try {
    // 获取URL Scheme
    const result = await cloud.openapi.urlscheme.generate({
      jumpWxa: {
        path: path,
        query: ''
      },
      isExpire: false,
      envVersion: 'release'
    });
    
    return {
      success: true,
      openlink: result.openlink,
      scheme: result.scheme
    };
  } catch (error) {
    console.error('生成URL Scheme失败:', error);
    return {
      success: false,
      error: error.errMsg || '生成跳转链接失败'
    };
  }
};
    