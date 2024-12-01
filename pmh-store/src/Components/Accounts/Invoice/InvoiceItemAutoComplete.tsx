import React, { useState } from 'react';
import { Form, ListGroup } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import axios from '../../../Api/Api';


interface InvoiceItemAutoCompleteProps {
  onItemSelect: (item: any) => void;
}

const InvoiceItemAutoComplete: React.FC<InvoiceItemAutoCompleteProps> = ({ onItemSelect }) => {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const { register, setValue } = useForm();

  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    if (searchTerm.length > 0) {
      let response:any = await axios.get(`/stock/invoice-item?query=${searchTerm}`)
      setSearchResults(response.data.results);
    } else {
      setSearchResults([]);
    }
  };

  const handleItemSelect = (item: any) => {
    onItemSelect(item);
    setValue('itemSearch', '');
    setSearchResults([]);
  };

  return (
    <div style={{ position: 'relative' }}>
      <Form.Control
        {...register('itemSearch')}
        type="text"
        placeholder="Scan barcode or enter item name"
        onChange={handleSearch}
        autoComplete="off"
      />
      {searchResults.length > 0 && (
        <ListGroup 
          style={{
            position: 'absolute',
            width: '100%',
            marginTop: '1px',
            zIndex: 9999,
            maxHeight: '200px',
            overflowY: 'auto',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}
        >
          {searchResults.map((item) => (
            <ListGroup.Item
              key={item.stockId}
              action
              onClick={() => handleItemSelect(item)}
            >
              {item.name} - {item.code} :- Stocks Available : {item.stock} {item.unitCode}, Racks: {item.racks.map((rack: any) => rack.rackCode).join(', ')}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
};

export default InvoiceItemAutoComplete;
