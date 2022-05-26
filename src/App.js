import logo from './logo.svg';
import './App.css';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import ConvertSizeToString from './SizeFormatter';

class FileTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: Array(0),
      isLoaded: false,
      selectedFile: null,
    };
  }

  initList() {
    fetch('https://localhost:7146/api/file')
      .then(response => response.json())
      .then(response => {
        console.log(response);
        this.setState({
          items: response,
          isLoaded: true,

        });
      })
      .catch(err => console.error(err));
  }

  async downloadFile(item) {
    const res = await fetch('https://localhost:7146/api/file/' + item.id);

    const blob = await res.blob();
    const newBlob = new Blob([blob]);

    const blobUrl = window.URL.createObjectURL(newBlob);

    const link = document.createElement('a');
    link.href = blobUrl;
    link.setAttribute('download', `${item.name}`);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);

    // clean up Url
    window.URL.revokeObjectURL(blobUrl);
  }
  
  deleteFile(item) {
    fetch('https://localhost:7146/api/file/' + item.id, {
      method: 'DELETE',
    })
      .then(response => {
        this.initList();
      })
      .catch(err => console.error(err));
  }


  onFileUpload = () => {
    let url = 'https://localhost:7146/api/file';
    // Create an object of formData 
    const formData = new FormData();

    // Update the formData object 
    formData.append(
      'files',
      this.state.selectedFile
    );

    console.log(this.state.selectedFile);
    
    axios.post('https://localhost:7146/api/file', formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      }
    ).then(response => {
      this.initList();
    }).catch((error) => {
      console.log(error);
    });
  }; 

  onFileChange = event => {
    // Update the state 
    this.setState({ selectedFile: event.target.files[0] });
  }; 
  
  render() {
    const { isLoaded, items } = this.state;

    if (!isLoaded) {
      this.initList();
      return <div>Loading...</div>;
    } else {
      return (
        <div>
        <Table
          striped bordered hover variant="dark"
        >
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Download</th>
                <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>
                  <Button onClick={() => { this.downloadFile(item)}}>
                    Download
                  </Button>
                </td>
                <td>
                  <Button onClick={() => { this.deleteFile(item) }}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
          <input type="file" onChange={this.onFileChange}/>
          <button onClick={this.onFileUpload}>
        Upload!
          </button> 
        </div>
      );
        
    }
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        
      </header>
      <FileTable />
    </div>
  );
}

export default App;
