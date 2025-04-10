import { useState, useEffect } from 'react';
import './App.css';

interface Billionaire {
  id: number;
  name: string;
  description: string;
  url: string;
  alt: string;
}

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [billionaires, setBillionaires] = useState<Billionaire[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBillionaires();
  }, []);

  const fetchBillionaires = async () => {
    try {
      const response = await fetch('http://localhost:8080/mingoy/personalities');
      const data = await response.json();
      setBillionaires(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching billionaires:', error);
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (billionaires.length === 0) return <div>No billionaires found</div>;

  const hasNext = index < billionaires.length - 1;
  const currentBillionaire = billionaires[index];

  function handleNextClick() {
    if (hasNext) {
      setIndex(index + 1);
    } else {
      setIndex(0);
    }
  }

  function handleBackClick() {
    if (index === 0) {
      setIndex(billionaires.length - 1);
    } else {
      setIndex(index - 1);
    }
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h1>BILLIONAIRES</h1>
        <p>Kristenz Mingoy - BSIT-3A</p>
      </div>

      <div className="card-actions">
        <div className="button-group">
          <button className="btn" onClick={handleBackClick}>Back</button>
          <button className="btn" onClick={handleNextClick}>Next</button>
          <button className="btn refresh-btn" onClick={fetchBillionaires}>Refresh</button>
        </div>
      </div>

      <div className="card-media">
        <img src={currentBillionaire.url} alt={currentBillionaire.alt} />
      </div>

      <div className="card-content">
        <h2>{currentBillionaire.name}</h2>
        <h3>{index + 1 + " of " + billionaires.length}</h3>
      </div>

      <div className="card-actions">
        <button className="expand-btn" onClick={handleExpandClick}>
          {expanded ? 'Show Less' : 'Show More'}
        </button>
      </div>

      <div className={`collapse-content ${expanded ? 'expanded' : ''}`}>
        <p>{currentBillionaire.description}</p>
      </div>
    </div>
  );
}
