import React from 'https://esm.sh/react@18.2.0';

const Header = () => {
  return (
    <header>
      <div className="header-container container">
        <div className="logo">日本房源搜索</div>
        <nav>
          <ul style={{ display: 'flex', gap: '20px', listStyle: 'none' }}>
            <li><a href="#" style={{ textDecoration: 'none', color: 'var(--text-color)' }}>首页</a></li>
            <li><a href="#" style={{ textDecoration: 'none', color: 'var(--text-color)' }}>收藏</a></li>
            <li><a href="#" style={{ textDecoration: 'none', color: 'var(--text-color)' }}>关于</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header; 