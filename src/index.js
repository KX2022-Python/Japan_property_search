// 简化的测试代码
console.log("index.js已加载");

// 尝试创建一个简单的元素而不使用React
const rootElement = document.getElementById('root');
if(rootElement) {
  rootElement.innerHTML = '<div style="background-color: lightblue; padding: 20px; color: black;">这是由index.js渲染的内容</div>';
}

// 记录任何错误
window.addEventListener('error', function(event) {
  console.error('捕获到错误:', event.error);
  const errorDiv = document.createElement('div');
  errorDiv.style.color = 'red';
  errorDiv.style.padding = '20px';
  errorDiv.style.backgroundColor = 'pink';
  errorDiv.textContent = '错误: ' + event.message;
  document.body.appendChild(errorDiv);
}); 