import logo from './logo.svg';
import './App.css';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import ConvertSizeToString from './SizeFormatter';
import FileManager from './FileManager';

class FileTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: Array(0),
      isLoaded: false,
      selectedFile: null,
    };
    this.FileManager = new FileManager();
  }

  async initList() {
    let list = await this.FileManager.getFileList();
    
    console.log(list);
    this.setState({
      items: list,
      isLoaded: true,
    });
  }

  async onDownloadButtonClick(item) {
    await this.FileManager.downloadFile(item);
  }
  
  async onDeleteButtonClick(item) {
    await this.FileManager.deleteFile(item);
    this.initList();
  }


  onFileUpload = async () => {
    let file = this.state.selectedFile;
    console.log(file)
    await this.FileManager.uploadFile(file);
    this.initList();
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
                <th>Size</th>
                <th>Download</th>
                <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{ConvertSizeToString(item.size)}</td>
                <td>
                  <Button onClick={() => { this.onDownloadButtonClick(item)}}>
                    Download
                  </Button>
                </td>
                <td>
                  <Button onClick={() => { this.onDeleteButtonClick(item) }}>
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
