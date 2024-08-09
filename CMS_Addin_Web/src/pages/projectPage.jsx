import React, { useState, useEffect } from 'react';
import projectService from '../services/projectService';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProjectPage = ({ item }) => {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    projectService.getAll()
      .then((data) => {
        setProjects(data);
      })

    console.log(item);
  }, [])

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAttachment = (projectId) => {
    if (item.attachments.length > 0) {
      item.attachments.forEach((attachment) => {
        item.getAttachmentContentAsync(attachment.id, (result) => {
          if (result.status === Office.AsyncResultStatus.Succeeded) {
            console.log(result);
            const attachmentContent = result.value.content;
            let blob = new Blob([attachmentContent], { type: attachment.contentType });

            projectService.getRootFolder(projectId)
              .then((data) => {
                projectService.postAttachment(projectId, data._id, {
                  file: new File([blob], attachment.name, { lastModified: Date.now() })
                });
              });
          } else {
            console.error('Failed to get attachment content:', result.error.message);
          }
        });
      });
    } else {
      console.log('No attachments found.');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Projects</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by project name"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Attachment</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredProjects.map(project => (
            <tr key={project.id}>
              <td>{project.name}</td>
              <td>
                <button className="btn btn-primary" onClick={() => handleAttachment(project.id)}>
                  Attach
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectPage;