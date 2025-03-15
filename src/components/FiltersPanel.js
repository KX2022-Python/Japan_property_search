import React, { useState } from 'https://esm.sh/react@18.2.0';

const FiltersPanel = ({ filters, onFilterChange, onApplyFilters }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters({
      ...localFilters,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterChange(localFilters);
    onApplyFilters();
  };

  const handleReset = () => {
    const resetFilters = {
      location: '',
      priceMin: '',
      priceMax: '',
      size: '',
      rooms: '',
      propertyType: '',
      yearBuilt: ''
    };
    setLocalFilters(resetFilters);
    onFilterChange(resetFilters);
    onApplyFilters();
  };

  return (
    <div className="filters">
      <form onSubmit={handleSubmit}>
        <div className="filters-container">
          <div className="filter-group">
            <label htmlFor="location">地区</label>
            <input 
              type="text" 
              id="location" 
              name="location" 
              value={localFilters.location}
              onChange={handleInputChange}
              placeholder="输入地区、地址或车站"
            />
          </div>

          <div className="filter-group">
            <label htmlFor="priceMin">最低价格 (¥)</label>
            <input 
              type="number" 
              id="priceMin" 
              name="priceMin" 
              value={localFilters.priceMin}
              onChange={handleInputChange}
              placeholder="最低价格"
            />
          </div>

          <div className="filter-group">
            <label htmlFor="priceMax">最高价格 (¥)</label>
            <input 
              type="number" 
              id="priceMax" 
              name="priceMax" 
              value={localFilters.priceMax}
              onChange={handleInputChange}
              placeholder="最高价格"
            />
          </div>

          <div className="filter-group">
            <label htmlFor="size">面积 (㎡)</label>
            <input 
              type="number" 
              id="size" 
              name="size" 
              value={localFilters.size}
              onChange={handleInputChange}
              placeholder="最小面积"
            />
          </div>

          <div className="filter-group">
            <label htmlFor="rooms">房间数</label>
            <select 
              id="rooms" 
              name="rooms" 
              value={localFilters.rooms}
              onChange={handleInputChange}
            >
              <option value="">不限</option>
              <option value="1">1R/1K</option>
              <option value="1.5">1DK/1LDK</option>
              <option value="2">2K/2DK</option>
              <option value="2.5">2LDK</option>
              <option value="3">3K/3DK/3LDK</option>
              <option value="4">4K以上</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="propertyType">房源类型</label>
            <select 
              id="propertyType" 
              name="propertyType" 
              value={localFilters.propertyType}
              onChange={handleInputChange}
            >
              <option value="">不限</option>
              <option value="mansion">公寓</option>
              <option value="apartment">独栋公寓</option>
              <option value="house">一户建</option>
              <option value="newConstruction">新建房</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="yearBuilt">建筑年份</label>
            <select 
              id="yearBuilt" 
              name="yearBuilt" 
              value={localFilters.yearBuilt}
              onChange={handleInputChange}
            >
              <option value="">不限</option>
              <option value="new">新建（3年以内）</option>
              <option value="5">5年以内</option>
              <option value="10">10年以内</option>
              <option value="15">15年以内</option>
              <option value="20">20年以内</option>
            </select>
          </div>
        </div>

        <div className="filter-actions">
          <button type="button" className="reset-filters" onClick={handleReset}>
            重置筛选
          </button>
          <button type="submit" className="apply-filters">
            应用筛选
          </button>
        </div>
      </form>
    </div>
  );
};

export default FiltersPanel; 