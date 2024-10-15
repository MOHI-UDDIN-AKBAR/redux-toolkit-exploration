import React from 'react';
import { useContextValue } from './context/UseContext';
import './style.css';

const App: React.FC = () => {
  const { isLoading, error, data } = useContextValue();

  return (
    <section className="main-content">
      <div className="status">
        {isLoading && <p className="loader">Loading...</p>}
        {error && <p className="error-message">Error: {error}</p>}
      </div>
      <div className="data">
        {data ? (
          data.map((post) => (
            <div key={post.id} className="post">
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </div>
          ))
        ) : (
          <p>No data available</p>
        )}
      </div>
    </section>
  );
};

export default App;
