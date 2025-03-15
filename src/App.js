import React, { useState, useEffect } from 'https://esm.sh/react@18.2.0';
import Header from './components/Header.js';
import FiltersPanel from './components/FiltersPanel.js';
import ListView from './components/ListView.js';
import MapView from './components/MapView.js';
import { fetchProperties } from './api/propertiesApi.js';

const App = () => {
  const [viewMode, setViewMode] = useState('list'); // 'list' 或 'map'
  const [properties, setProperties] = useState([]);
  const [filters, setFilters] = useState({
    location: '',
    priceMin: '',
    priceMax: '',
    size: '',
    rooms: '',
    propertyType: '',
    yearBuilt: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 初始加载数据
    loadProperties();
  }, []);

  const loadProperties = async () => {
    setLoading(true);
    try {
      const data = await fetchProperties(filters);
      setProperties(data);
    } catch (error) {
      console.error('加载房源失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleApplyFilters = () => {
    loadProperties();
  };

  const toggleView = (mode) => {
    setViewMode(mode);
  };

  return (
    <>
      <Header />
      <main className="container">
        <div className="view-toggle">
          <button 
            className={viewMode === 'list' ? 'active' : ''} 
            onClick={() => toggleView('list')}
          >
            列表视图
          </button>
          <button 
            className={viewMode === 'map' ? 'active' : ''} 
            onClick={() => toggleView('map')}
          >
            地图视图
          </button>
        </div>

        <FiltersPanel 
          filters={filters} 
          onFilterChange={handleFilterChange} 
          onApplyFilters={handleApplyFilters} 
        />

        {loading ? (
          <div className="loading">加载中...</div>
        ) : (
          viewMode === 'list' ? (
            <ListView properties={properties} />
          ) : (
            <MapView properties={properties} />
          )
        )}
      </main>
    </>
  );
};

export default App; 