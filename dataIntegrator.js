// 数据整合服务
class PropertyIntegrator {
  constructor() {
    this.properties = new Map();
  }

  // 添加或更新房源
  addProperty(property) {
    const existingProperty = this.properties.get(property.location.address);
    
    if (existingProperty) {
      // 合并数据源
      existingProperty.sources = [...new Set([...existingProperty.sources, ...property.sources])];
      
      // 更新价格（取最新）
      if (new Date(property.updatedAt) > new Date(existingProperty.updatedAt)) {
        existingProperty.price = property.price;
      }
      
      // 合并特征
      existingProperty.features = [...new Set([...existingProperty.features, ...property.features])];
      
      // 更新时间戳
      existingProperty.updatedAt = new Date().toISOString();
      
      this.properties.set(property.location.address, existingProperty);
    } else {
      this.properties.set(property.location.address, property);
    }
  }

  // 获取所有房源
  getAllProperties() {
    return Array.from(this.properties.values());
  }

  // 根据筛选条件获取房源
  getFilteredProperties(filters) {
    return this.getAllProperties().filter(property => {
      return this.matchesFilters(property, filters);
    });
  }

  // 筛选条件匹配
  matchesFilters(property, filters) {
    // 价格范围匹配
    if (filters.price.min && property.price < filters.price.min) return false;
    if (filters.price.max && property.price > filters.price.max) return false;
    
    // 面积范围匹配
    if (filters.size.min && property.specs.size < filters.size.min) return false;
    if (filters.size.max && property.specs.size > filters.size.max) return false;
    
    // 房型匹配
    if (filters.layouts.length && !filters.layouts.includes(property.specs.layout)) return false;
    
    // 朝向匹配
    if (filters.directions.length && !filters.directions.includes(property.specs.direction)) return false;
    
    // 地区匹配
    if (filters.areas.length && !filters.areas.includes(property.location.city)) return false;
    
    // 线路匹配
    if (filters.lines.length && !filters.lines.includes(property.location.station.line)) return false;
    
    return true;
  }
} 