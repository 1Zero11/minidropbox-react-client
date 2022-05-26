import axios from 'axios';



class FileManager{
    constructor() {
        this.url = 'https://localhost:7146/api/';

        this.downloadFile = async (item) => {
            const res = await fetch(this.url + 'file/' + item.id);

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

        this.deleteFile = async (item) => {
            await fetch(this.url + 'file/' + item.id, {
                method: 'DELETE',
            })
                .then(response => {
                    return true;
                })
                .catch(err => console.error(err));
        }

        this.uploadFile = async (file) => {
            
            // Create an object of formData 
            const formData = new FormData();

            // Update the formData object 
            formData.append(
                'files',
                file
            );

            await axios.post(this.url + 'file', formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                }
            ).then(response => {
                return true;
            }).catch((error) => {
                console.log(error);
            });
        };

        this.getFileList = () => {
            return fetch('https://localhost:7146/api/file')
                .then(response => response.json())
                .then(response => {
                    return response;
                })
                .catch(err => console.error(err));
        }

    }
};

export default FileManager;