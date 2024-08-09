import httpClient from "../utils/httpClient";

const getAll = async () => {
  const response = await httpClient.get("/projects");
  return response.data;
};

const getRootFolder = async (projectId) => {
  const response = await httpClient.get(`projects/${projectId}/attachments/folders/root`);
  return response.data;
}

const postAttachment = async (projectId, folderId, req) => {
  const response = await httpClient.post(`/projects/${projectId}/attachments/upload?folderId=${folderId}`, req, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

const projectService = {
  getAll,
  getRootFolder,
  postAttachment
};

export default projectService;