// 模拟API数据
// 在实际应用中，这将是真正的API调用，从各个网站获取并合并数据

// 房源数据来源网站列表
const sourceSites = [
  { id: 'homes', name: 'HOMES', baseUrl: 'https://www.homes.co.jp/property/' },
  { id: 'suumo', name: 'SUUMO', baseUrl: 'https://suumo.jp/property/' },
  { id: 'athome', name: 'at home', baseUrl: 'https://www.athome.co.jp/property/' },
  { id: 'cowcamo', name: 'カウカモ', baseUrl: 'https://cowcamo.jp/property/' },
  { id: 'lifull', name: "LIFULL HOME'S", baseUrl: 'https://www.homes.co.jp/property/' },
  { id: 'nifty', name: 'Nifty不動産', baseUrl: 'https://myhome.nifty.com/property/' },
  { id: 'mansion', name: 'mansion-market.com', baseUrl: 'https://mansion-market.com/property/' },
  { id: 'note', name: 'マンションノート', baseUrl: 'https://mansionnote.com/property/' },
  { id: 'canary', name: 'カナリー', baseUrl: 'https://www.canary.co.jp/property/' },
  { id: 'yahoo', name: 'Yahoo!不動産', baseUrl: 'https://realestate.yahoo.co.jp/property/' },
  { id: 'ierabu', name: 'いえらぶ', baseUrl: 'https://ierabu.jp/property/' },
  { id: 'homemate', name: 'ホームメイト', baseUrl: 'https://www.homemate.co.jp/property/' },
  { id: 'pitatto', name: 'ピタットハウス', baseUrl: 'https://www.pitatto.com/property/' },
  { id: 'iibeyainet', name: 'いい部屋ネット', baseUrl: 'https://www.eheya.net/property/' },
  { id: 'apaman', name: 'アパマンショップ', baseUrl: 'https://www.apamanshop.com/property/' },
  { id: 'chintai', name: 'CHINTAI', baseUrl: 'https://www.chintai.net/property/' }
];

// 生成随机房源数据
const generateMockProperties = () => {
  const properties = [];
  const areas = [
    { name: '新宿区', lat: 35.6938, lng: 139.7034 },
    { name: '渋谷区', lat: 35.6580, lng: 139.7016 },
    { name: '港区', lat: 35.6586, lng: 139.7454 },
    { name: '中央区', lat: 35.6697, lng: 139.7714 },
    { name: '目黒区', lat: 35.6414, lng: 139.6981 },
    { name: '品川区', lat: 35.6092, lng: 139.7303 },
    { name: '世田谷区', lat: 35.6465, lng: 139.6532 },
    { name: '豊島区', lat: 35.7235, lng: 139.7125 }
  ];

  const roomTypes = ['1K', '1DK', '1LDK', '2K', '2DK', '2LDK', '3LDK', '4LDK'];
  
  // 生成30个房源
  for (let i = 1; i <= 30; i++) {
    const area = areas[Math.floor(Math.random() * areas.length)];
    const randomSources = [];
    
    // 随机选择1-4个来源网站
    const numSources = Math.floor(Math.random() * 4) + 1;
    const sourcesCopy = [...sourceSites];
    
    for (let j = 0; j < numSources; j++) {
      if (sourcesCopy.length === 0) break;
      
      const randomIndex = Math.floor(Math.random() * sourcesCopy.length);
      const source = sourcesCopy.splice(randomIndex, 1)[0];
      
      randomSources.push({
        name: source.name,
        url: `${source.baseUrl}${100000 + i}`
      });
    }
    
    // 计算随机位置（围绕选定区域）
    const lat = area.lat + (Math.random() - 0.5) * 0.02;
    const lng = area.lng + (Math.random() - 0.5) * 0.02;
    
    // 生成随机价格（5万-25万日元）
    const price = Math.floor(Math.random() * 200000) + 50000;
    
    // 生成随机面积（20-80平方米）
    const size = Math.floor(Math.random() * 60) + 20;
    
    // 随机选择房间类型
    const rooms = roomTypes[Math.floor(Math.random() * roomTypes.length)];
    
    // 生成随机建造年份（1980-2023）
    const yearBuilt = Math.floor(Math.random() * 43) + 1980;
    
    properties.push({
      id: `prop-${i}`,
      title: `${area.name}的${rooms}公寓`,
      price: price,
      address: `东京都${area.name}${Math.floor(Math.random() * 5) + 1}-${Math.floor(Math.random() * 20) + 1}-${Math.floor(Math.random() * 15) + 1}`,
      size: size,
      rooms: rooms,
      yearBuilt: yearBuilt,
      lat: lat,
      lng: lng,
      image: `https://picsum.photos/id/${(i % 50) + 100}/600/400`,
      sources: randomSources
    });
  }
  
  return properties;
};

// 模拟的API调用函数
export const fetchProperties = async (filters) => {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // 生成模拟数据
  let properties = generateMockProperties();
  
  // 应用过滤器
  if (filters) {
    if (filters.location) {
      properties = properties.filter(prop => 
        prop.address.includes(filters.location)
      );
    }
    
    if (filters.priceMin) {
      properties = properties.filter(prop => 
        prop.price >= parseInt(filters.priceMin)
      );
    }
    
    if (filters.priceMax) {
      properties = properties.filter(prop => 
        prop.price <= parseInt(filters.priceMax)
      );
    }
    
    if (filters.size) {
      properties = properties.filter(prop => 
        prop.size >= parseInt(filters.size)
      );
    }
    
    if (filters.rooms) {
      properties = properties.filter(prop => {
        // 简单的房间数匹配，可以根据需要完善
        if (filters.rooms === '1') return prop.rooms.startsWith('1');
        if (filters.rooms === '1.5') return prop.rooms.includes('DK') || prop.rooms.includes('LDK');
        if (filters.rooms === '2') return prop.rooms.startsWith('2');
        if (filters.rooms === '2.5') return prop.rooms.includes('2LDK');
        if (filters.rooms === '3') return prop.rooms.startsWith('3');
        if (filters.rooms === '4') return prop.rooms.startsWith('4');
        return true;
      });
    }
    
    if (filters.propertyType) {
      // 在实际应用中，这里会有更复杂的过滤逻辑
      // 简化版本，假设所有房源都是公寓
    }
    
    if (filters.yearBuilt) {
      const currentYear = new Date().getFullYear();
      properties = properties.filter(prop => {
        if (filters.yearBuilt === 'new') return currentYear - prop.yearBuilt <= 3;
        if (filters.yearBuilt === '5') return currentYear - prop.yearBuilt <= 5;
        if (filters.yearBuilt === '10') return currentYear - prop.yearBuilt <= 10;
        if (filters.yearBuilt === '15') return currentYear - prop.yearBuilt <= 15;
        if (filters.yearBuilt === '20') return currentYear - prop.yearBuilt <= 20;
        return true;
      });
    }
  }
  
  return properties;
}; 