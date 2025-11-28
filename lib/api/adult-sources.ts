import type { VideoSource } from '@/lib/types';

export const ADULT_SOURCES: VideoSource[] = [
    {
        id: 'ck',
        name: 'CK',
        baseUrl: 'https://www.ckzy1.com/api.php/provide/vod',
        searchPath: '',
        detailPath: '',
        enabled: true,
        priority: 1
    },
    {
        id: 'jkun',
        name: 'jkun',
        baseUrl: 'https://jkunzyapi.com/api.php/provide/vod',
        searchPath: '',
        detailPath: '',
        enabled: true,
        priority: 2
    },
    {
        id: 'souav',
        name: 'souav',
        baseUrl: 'https://api.souavzy.vip/api.php/provide/vod',
        searchPath: '',
        detailPath: '',
        enabled: true,
        priority: 3
    },
    {
        id: '155',
        name: '155',
        baseUrl: 'https://155api.com/api.php/provide/vod',
        searchPath: '',
        detailPath: '',
        enabled: true,
        priority: 4
    },
    {
        id: 'lsb',
        name: 'lsb',
        baseUrl: 'https://apilsbzy1.com/api.php/provide/vod',
        searchPath: '',
        detailPath: '',
        enabled: true,
        priority: 5
    },
    {
        id: 'hsck',
        name: '黄色仓库',
        baseUrl: 'https://hsckzy.vip/api.php/provide/vod',
        searchPath: '',
        detailPath: '',
        enabled: true,
        priority: 6
    },
    {
        id: 'yutu',
        name: '玉兔',
        baseUrl: 'https://yutuzy10.com/api.php/provide/vod',
        searchPath: '',
        detailPath: '',
        enabled: true,
        priority: 7
    }
];
