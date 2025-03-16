// 数据抓取服务
class PropertyScraper {
  constructor() {
    this.sources = {
      SUUMO: 'https://suumo.jp/ms/chuko/tokyo/ensen/',
      HOMES: 'https://www.homes.co.jp/chintai/tokyo/',
      ATHOME: 'https://www.athome.co.jp/chintai/tokyo/',
      YAHOO: 'https://realestate.yahoo.co.jp/rent/search/03/'
    };
  }

  // 统一的数据格式转换函数
  normalizeProperty(rawData, source) {
    return {
      id: `${source}_${rawData.id}`,
      sources: [source],
      price: this.normalizePrice(rawData.price),
      location: this.normalizeLocation(rawData.location),
      specs: this.normalizeSpecs(rawData.specs),
      features: this.normalizeFeatures(rawData.features),
      images: this.normalizeImages(rawData.images),
      updatedAt: new Date().toISOString()
    };
  }

  // 价格标准化
  normalizePrice(price) {
    // 统一转换为万日元
    return parseInt(price.replace(/[^0-9]/g, ''));
  }

  // 位置信息标准化
  normalizeLocation(location) {
    return {
      prefecture: location.prefecture || '東京都',
      city: location.city,
      address: location.address,
      station: {
        name: location.station_name,
        line: location.station_line,
        walkingTime: parseInt(location.walking_time)
      },
      coordinates: {
        lat: parseFloat(location.latitude),
        lng: parseFloat(location.longitude)
      }
    };
  }

  // 房源规格标准化
  normalizeSpecs(specs) {
    return {
      size: parseFloat(specs.size),
      layout: specs.layout,
      floor: parseInt(specs.floor),
      totalFloors: parseInt(specs.total_floors),
      direction: specs.direction,
      buildingAge: parseInt(specs.building_age)
    };
  }
} 