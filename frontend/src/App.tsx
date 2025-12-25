import { Routes, Route, Link } from 'react-router-dom';

const Home = () => <div>这里是首页</div>;
const Chat = () => <div>这里是聊天页面</div>;
const Settings = () => <div>这里是设置页面</div>;

function App() {
  return (
    <div>
      {/* 顶部导航 */}
      <nav style={{ padding: 16, borderBottom: '1px solid #eee' }}>
        <Link to="/" style={{ marginRight: 12 }}>首页</Link>
        <Link to="/chat" style={{ marginRight: 12 }}>聊天</Link>
        <Link to="/settings">设置</Link>
      </nav>

      {/* 路由出口 */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  );
}

export default App;
