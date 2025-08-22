// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Alert, AlertDescription } from '@/components/ui';
// @ts-ignore;
import { Smartphone, Monitor, Building2, ExternalLink, Loader2, MapPin, Navigation } from 'lucide-react';

export default function WeappRedirectPage(props) {
  const [env, setEnv] = useState('detecting');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 已配置的小程序信息
  const config = {
    appId: 'wx40efa4f7d3753ae1',
    envId: 'xydt-0gmzkfesdbbb699e',
    ghId: 'gh_c82060fba1d1',
    path: 'pages/map/map.html',
    name: '小北云校园'
  };
  useEffect(() => {
    detectEnvironment();
    loadScripts();
  }, []);
  const detectEnvironment = () => {
    const ua = navigator.userAgent.toLowerCase();
    if (/micromessenger/.test(ua)) {
      if (/wxwork/.test(ua)) {
        setEnv('wxwork');
      } else {
        setEnv('wechat');
      }
    } else if (/mobile/.test(ua)) {
      setEnv('mobile');
    } else {
      setEnv('desktop');
    }
  };
  const loadScripts = () => {
    // 加载微信JS-SDK
    const wxScript = document.createElement('script');
    wxScript.src = 'https://res.wx.qq.com/open/js/jweixin-1.6.0.js';
    wxScript.async = true;
    document.head.appendChild(wxScript);

    // 加载云开发SDK
    const cloudScript = document.createElement('script');
    cloudScript.src = 'https://imgcache.qq.com/qcloud/cloudbase/1.1.0/cloud.js';
    cloudScript.async = true;
    document.head.appendChild(cloudScript);
  };
  const openWeapp = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await props.$w.cloud.callFunction({
        name: 'get-url-scheme',
        data: {
          appId: config.appId,
          path: config.path
        }
      });
      if (result && result.success && result.openlink) {
        window.location.href = result.openlink;
      } else {
        throw new Error(result.error || '获取跳转链接失败');
      }
    } catch (err) {
      console.error('跳转失败:', err);
      setError(err.message || '跳转失败，请重试');
    } finally {
      setLoading(false);
    }
  };
  const getEnvIcon = () => {
    switch (env) {
      case 'wechat':
        return <Smartphone className="w-6 h-6 text-green-600" />;
      case 'wxwork':
        return <Building2 className="w-6 h-6 text-blue-600" />;
      case 'mobile':
        return <Smartphone className="w-6 h-6 text-gray-600" />;
      case 'desktop':
        return <Monitor className="w-6 h-6 text-gray-600" />;
      default:
        return <Loader2 className="w-6 h-6 animate-spin" />;
    }
  };
  const getEnvText = () => {
    switch (env) {
      case 'wechat':
        return '微信内打开';
      case 'wxwork':
        return '企业微信内打开';
      case 'mobile':
        return '手机浏览器打开';
      case 'desktop':
        return '桌面浏览器打开';
      default:
        return '检测环境中...';
    }
  };
  const renderWechatButton = () => <div className="w-full">
      <wx-open-launch-weapp username={config.ghId} path={config.path} style={{
      display: 'block',
      width: '100%'
    }}>
        <script type="text/wxtag-template">
          {`
            <style>
              .weapp-btn {
                width: 100%;
                padding: 14px 28px;
                background: linear-gradient(135deg, #07c160, #029f45);
                color: white;
                border: none;
                border-radius: 8px;
                font-size: 16px;
                font-weight: 500;
                cursor: pointer;
                box-shadow: 0 2px 8px rgba(7, 193, 96, 0.3);
                transition: all 0.3s ease;
              }
              .weapp-btn:hover {
                transform: translateY(-1px);
                box-shadow: 0 4px 12px rgba(7, 193, 96, 0.4);
              }
            </style>
            <button class="weapp-btn">立即进入校园导航</button>
          `}
        </script>
      </wx-open-launch-weapp>
    </div>;
  const renderExternalButton = () => <Button onClick={openWeapp} disabled={loading} className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium py-6 text-lg" size="lg">
      {loading ? <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          正在生成安全链接...
        </> : <>
          <Navigation className="mr-2 h-5 w-5" />
          进入小北云校园
        </>}
    </Button>;
  return <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              <MapPin className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
              {config.name}
            </CardTitle>
            <CardDescription className="text-gray-600 text-base">
              北民大校园实时导航系统
              <br />
              <span className="text-sm text-gray-500">免登录 · 一键直达</span>
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                {getEnvIcon()}
                <div>
                  <p className="text-sm font-medium text-blue-800">
                    {getEnvText()}
                  </p>
                  <p className="text-xs text-blue-600">
                    已为您准备最佳跳转方案
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-sm font-bold">1</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">实时定位</p>
                  <p className="text-xs text-gray-500">精准定位校园内位置</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-sm font-bold">2</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">路径规划</p>
                  <p className="text-xs text-gray-500">智能规划最佳路线</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-sm font-bold">3</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">地点搜索</p>
                  <p className="text-xs text-gray-500">快速找到校园建筑</p>
                </div>
              </div>
            </div>

            {env === 'detecting' ? <div className="text-center py-8">
                <Loader2 className="mx-auto h-8 w-8 animate-spin text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">正在检测环境...</p>
              </div> : <>
                {env === 'wechat' || env === 'wxwork' ? <div className="space-y-4">
                    <p className="text-sm text-gray-600 text-center">
                      点击按钮即可直接跳转到小程序
                    </p>
                    {renderWechatButton()}
                  </div> : <div className="space-y-4">
                    <p className="text-sm text-gray-600 text-center">
                      正在为您生成安全跳转链接
                    </p>
                    {renderExternalButton()}
                  </div>}
              </>}

            {error && <Alert variant="destructive" className="bg-red-50 border-red-200">
                <AlertDescription className="text-sm text-red-800">
                  {error}
                </AlertDescription>
              </Alert>}
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            由小北云校园 · 云开发提供技术支持
          </p>
        </div>
      </div>
    </div>;
}