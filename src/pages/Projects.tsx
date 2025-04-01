import { useState } from "react";
import { PlusCircle } from "lucide-react";

import cardamom from '../assets/cardamom.avif'
import benz from '../assets/benz.avif'
import tomatoes from '../assets/tomatoes.webp'
import disease from '../assets/disease.webp'
import detection from '../assets/detection.jpg'
import detection2 from '../assets/detection2.jpg'
import detection3 from '../assets/detection3.png'
import detection4 from '../assets/detection4.jpg'
import coffee from '../assets/coffee.jpg'
import ids from '../assets/ids.webp'
import infrared from '../assets/infrared.jpg'
import biometric  from '../assets/biometric.jpg'

const projects = [
  {
    title: 'Cardamom Plant Disease Detection',
    description: 'Cardamom, a key spice, faces diseases affecting yield. This study uses EfficientNetV2 for detection, achieving 98.26% accuracy.',
    image: cardamom,
    technologies: ['Python'],
    demoUrl: 'https://ieeexplore.ieee.org/abstract/document/9663367',
  },
  {
    title: 'Tomato plant disease classification',
    description: 'Agricultural productivity declines due to climate change and plant diseases. This study classifies tomato diseases using MFFN, achieving 99.83% accuracy.',
    image: tomatoes,
    technologies: ['Python'],
    demoUrl: 'https://www.sciencedirect.com/science/article/abs/pii/S0957417423008837',
  },
  {
    title: 'Multi-level deep information feature fusion extraction network for interpretable plant disease classification',
    description: 'DFN-PSAN enhances plant disease classification in real-world farms using deep learning, achieving 95.27% accuracy with improved interpretability and efficiency.',
    image: disease,
    technologies: ['Python'],
    demoUrl: 'https://www.sciencedirect.com/science/article/abs/pii/S0168169923008694',
  },
  {
    title: 'Systematic study on deep learning-based plant disease detection or classification',
    description: 'This study reviews 160 plant disease detection approaches using ML and DL, analyzing datasets, challenges, and the need for cost-effective automation.',
    image: detection,
    technologies: ['Python'],
    demoUrl: 'https://link.springer.com/article/10.1007/s10462-023-10517-0',
  },
  {
    title: 'Binary class and multi-class plant disease detection using ensemble deep learning-based approach',
    description: 'This study proposes an ensemble deep learning approach for plant disease detection, achieving up to 100% accuracy across various crop datasets.',
    image: detection2,
    technologies: ['Python'],
    demoUrl: 'https://www.inderscienceonline.com/doi/abs/10.1504/IJSAMI.2022.126802',
  },
  {
    title: 'Empirical Study on Multi Convolutional Layer-based Convolutional Neural Network Classifier for Plant Leaf Disease Detection',
    description: 'This study evaluates the MCLCNN classifier for real-time plant disease detection, achieving up to 99.25% accuracy on Peach plant leaves.',
    image: detection3,
    technologies: ['Python'],
    demoUrl: 'https://ieeexplore.ieee.org/abstract/document/9342729',
  },
  {
    title: 'An Efficient Infectious Disease Detection in Plants Using Deep Learning',
    description: 'This research explores deep learning for plant disease detection, achieving up to 99% accuracy using ensemble models, MFFN, and EfficientNetV2.',
    image: detection4,
    technologies: ['Python'],
    demoUrl: 'https://link.springer.com/chapter/10.1007/978-981-97-5204-1_3',
  },
  {
    title: 'Coffee Plant Disease Identification using Enhanced Short Learning EfficientNetV2',
    description: 'This study employs Enhanced EfficientNetV2-S for coffee plant disease detection, achieving 98.1% accuracy, surpassing DenseNet-121’s 92.9%.',
    image: coffee,
    technologies: ['Python'],
    demoUrl: 'https://ieeexplore.ieee.org/abstract/document/10440883',
  },
  {
    title: 'Comparative Analysis of Intrusion Detection System using ML and DL Techniques',
    description: 'This study enhances intrusion detection using feature selection and stacked ensemble learning, achieving robust classification on the NSL-KDD dataset.',
    image: ids,
    technologies: ['Python'],
    demoUrl: 'https://link.springer.com/chapter/10.1007/978-3-031-27409-1_67',
  },
  {
    title: 'Vehicle Re-identification Using Convolutional Neural Networks',
    description: 'This study enhances vehicle re-identification without number plates using filter grafting, semi-supervised learning, and multi-loss techniques for improved accuracy.',
    image: benz,
    technologies: ['Python'],
    demoUrl: 'https://link.springer.com/chapter/10.1007/978-981-99-1203-2_35',
  },
  {
    title: 'Aerial infrared thermal imaging transmission line defect detection methods incorporating explicit visual center structures',
    description: 'This study enhances infrared thermal imaging for transmission line defect detection using an explicit visual center structure and global attention mechanism, achieving 83.14% accuracy.',
    image: infrared,
    technologies: ['Python'],
    demoUrl: 'https://www.sciencedirect.com/science/article/abs/pii/S0263224124024904',
  },
  {
    title: 'Feature integration for frontal gait recognition through contour image analysis',
    description: 'This study introduces a frontal-view gait recognition method using Gait Energy Image (GEI), achieving superior identification performance on benchmark datasets.',
    image: biometric,
    technologies: ['Python'],
    demoUrl: 'https://link.springer.com/article/10.1007/s11760-024-03655-7',
  },
];

export default function Projects() {
  const [projectsList, setProjectsList] = useState(projects);
  const [editingProject, setEditingProject] = useState<{
    title: string;
    description: string;
    image: string;
    technologies: string[];
    demoUrl: string;
    index: number;
  } | null>(null);

  const [creatingProject, setCreatingProject] = useState<{
    title: string;
    description: string;
    image: string;
    technologies: string[];
    demoUrl: string;
  } | null>(null);

  // Open edit modal
  const handleEdit = (index: number) => {
    setEditingProject({ ...projectsList[index], index });
  };

  // Handle image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!editingProject || !event.target.files) return;

    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Preview uploaded image
      setEditingProject({ ...editingProject, image: imageUrl });
    }
  };

  // Handle save after editing
  const handleSave = () => {
    if (!editingProject) return;
    const updatedProjects = [...projectsList];
    updatedProjects[editingProject.index] = { ...editingProject };
    setProjectsList(updatedProjects);
    setEditingProject(null); // Close modal
  };

  // Delete project
  const handleDelete = (index: number) => {
    const filteredProjects = projectsList.filter((_, i) => i !== index);
    setProjectsList(filteredProjects);
  };

  const handleCreateProject = () => {
    setCreatingProject({
      title: "",
      description: "",
      image: "",
      technologies: [],
      demoUrl: "",
    });
  };

  const handleCreate = () => {
    if (!creatingProject) return;

    const newProject = {
      ...creatingProject,
      index: projectsList.length, // ✅ Dynamically set index
    };

    setProjectsList([...projectsList, newProject]); // ✅ Add to projects list
    setCreatingProject(null); // ✅ Close modal
  };

  return (
    <div className="min-h-screen p-6 py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Heading with Create Button */}
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800" data-aos="fade-down">
            My Projects
          </h2>
          <button
            onClick={handleCreateProject}
            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:scale-105 hover:bg-green-600 transition-all duration-300"
          >
            <PlusCircle size={20} />
            Create Project
          </button>
        </div>

        {/* Create Project Modal */}
        {creatingProject && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-4">Create New Project</h3>

      {/* Image Upload */}
      <label className="block mb-2 text-sm font-medium">Project Image:</label>
      {creatingProject.image && (
        <img
          src={creatingProject.image}
          alt="Preview"
          className="w-full h-40 object-cover rounded mb-2"
        />
      )}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            const imageUrl = URL.createObjectURL(e.target.files[0]);
            setCreatingProject({ ...creatingProject, image: imageUrl });
          }
        }}
        className="w-full p-2 border rounded mb-4"
      />

      <label className="block mb-2 text-sm font-medium">Title:</label>
      <input
        type="text"
        value={creatingProject.title}
        onChange={(e) => setCreatingProject({ ...creatingProject, title: e.target.value })}
        className="w-full p-2 border rounded mb-4"
      />

      <label className="block mb-2 text-sm font-medium">Description:</label>
      <textarea
        value={creatingProject.description}
        onChange={(e) => setCreatingProject({ ...creatingProject, description: e.target.value })}
        className="w-full p-2 border rounded mb-4"
      />

      <label className="block mb-2 text-sm font-medium">Technologies (comma-separated):</label>
      <input
        type="text"
        value={creatingProject.technologies.join(", ")}
        onChange={(e) => setCreatingProject({ ...creatingProject, technologies: e.target.value.split(", ") })}
        className="w-full p-2 border rounded mb-4"
      />

      <label className="block mb-2 text-sm font-medium">Demo URL:</label>
      <input
        type="text"
        value={creatingProject.demoUrl}
        onChange={(e) => setCreatingProject({ ...creatingProject, demoUrl: e.target.value })}
        className="w-full p-2 border rounded mb-4"
      />

      {/* Create and Cancel Buttons */}
      <div className="flex gap-2">
        <button onClick={handleCreate} className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
          Create
        </button>
        <button onClick={() => setCreatingProject(null)} className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition">
          Cancel
        </button>
      </div>
    </div>
  </div>
)}



        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsList.map((project, index) => (
            <div
              key={project.title}
              className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:-translate-y-2 hover:shadow-2xl duration-300 flex flex-col"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {project.title}
                </h3>
                <p className="text-gray-600 flex-grow">{project.description}</p>

                <div className="flex flex-wrap gap-2 my-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex gap-2">
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300"
                  >
                    Article
                  </a>
                  <button
                    onClick={() => handleEdit(index)}
                    className="flex-1 px-4 py-2 bg-yellow-500 text-white rounded-lg shadow-md hover:scale-105 hover:bg-yellow-600 transition-all duration-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:scale-105 hover:bg-red-600 transition-all duration-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Modal */}
      {editingProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Edit Project</h3>

            {/* Image Preview */}
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">Project Image:</label>
              <img
                src={editingProject.image}
                alt="Preview"
                className="w-full h-40 object-cover rounded"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="mt-2 w-full p-2 border rounded"
              />
            </div>

            <label className="block mb-2 text-sm font-medium">Title:</label>
            <input
              type="text"
              value={editingProject.title}
              onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
              className="w-full p-2 border rounded mb-4"
            />

            <label className="block mb-2 text-sm font-medium">Description:</label>
            <textarea
              value={editingProject.description}
              onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
              className="w-full p-2 border rounded mb-4"
            />

            <label className="block mb-2 text-sm font-medium">Technologies (comma-separated):</label>
            <input
              type="text"
              value={editingProject.technologies.join(", ")}
              onChange={(e) =>
                setEditingProject({ ...editingProject, technologies: e.target.value.split(", ") })
              }
              className="w-full p-2 border rounded mb-4"
            />

            <label className="block mb-2 text-sm font-medium">Demo URL:</label>
            <input
              type="text"
              value={editingProject.demoUrl}
              onChange={(e) => setEditingProject({ ...editingProject, demoUrl: e.target.value })}
              className="w-full p-2 border rounded mb-4"
            />

            {/* Save and Cancel Buttons */}
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              >
                Save
              </button>
              <button
                onClick={() => setEditingProject(null)}
                className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}