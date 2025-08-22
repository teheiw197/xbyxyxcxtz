
const cloud = require('wx-server-sdk');

// 初始化云开发
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

// 云函数入口函数
exports.main = async (event, context) => {
  const { action, appId, path = 'pages/map/map.html' } = event;
  
  // 仅处理 getUrlScheme 动作
  if (action !== 'getUrlScheme') {
    return {
      code: 400,
      message: '无效的动作参数',
      data: null
    };
  }
  
  try {
    // 验证必要参数
    if (!appId) {
      return {
        code: 400,
        message: '缺少必要参数：appId',
        data: null
      };
    }
    
    // 计算过期时间（当前时间 + 60秒）
    const expireTime = Math.floor(Date.now() / 1000) + 60;
    
    // 调用微信开放接口生成 URL Scheme
    const result = await cloud.openapi.urlscheme.generate({
      jumpWxa: {
        path: path, // 小程序页面路径
        query: ''   // 可选的查询参数
      },
      isExpire: true,
      expireTime: expireTime
    });
    
    // 返回成功结果
    return {
      code: 0,
      message: 'success',
      data: {
        openlink: result.openlink,
        expireTime: expireTime,
        ghId: 'gh_c82060fba1d1' // 小程序原始账号ID
      }
    };
    
  } catch (error) {
    console.error('生成 URL Scheme 失败:', error);
    
    // 返回错误信息
    return {
      code: 500,
      message: error.errMsg || '生成跳转链接失败',
      data: null
    };
  }
};
  