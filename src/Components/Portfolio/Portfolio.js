import React, { useState } from "react";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import "./Portfolio.css";

const Portfolio = () => {
  const [portfolioItems, setPortfolioItems] = useState([
    { id: 1, image: "https://picsum.photos/300/200", title: "Project 1", description: "Description 1", date: "2024-11-19"},
    { id: 2, image: "https://picsum.photos/300/200", title: "Project 2", description: "Description 2", date: "2024-11-19" },
    { id: 3, image: "https://picsum.photos/300/200", title: "Project 3", description: "Description 3", date: "2024-11-19" },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const openForm = () => setShowForm(true);
  const closeForm = () => {
    setShowForm(false);
    setNewTitle("");
    setNewDescription("");
    setNewDate("");
    setNewImage(null);
    setPreviewImage(null);
    setIsEditing(false);
    setEditId(null);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewImage(file);
      setPreviewImage(URL.createObjectURL(file)); // Generate a preview URL for the uploaded image
    }
  };

  const handleAdd = () => {
    if (newTitle && newImage && newDate && newDescription) {
      const newItem = {
        id: portfolioItems.length + 1,
        image: previewImage, // Use the preview URL for display
        title: newTitle,
        description: newDescription,
        date: newDate
      };
      setPortfolioItems([...portfolioItems, newItem]);
      closeForm();
    }
  };

  const handleEdit = (id) => {
    const itemToEdit = portfolioItems.find((item) => item.id === id);
    setNewTitle(itemToEdit.title);
    setPreviewImage(itemToEdit.image);
    setNewDescription(itemToEdit.description);
    setNewDate(itemToEdit.date);
    setIsEditing(true);
    setEditId(id);
    openForm();
  };

  const handleUpdate = () => {
    if (newTitle && newDescription && newDate) {
      setPortfolioItems(
        portfolioItems.map((item) =>
          item.id === editId
            ? { ...item, title: newTitle, image: previewImage,description: newDescription,date: newDate }
            : item
        )
      );
      closeForm();
    }
  };

  const handleDelete = (id) => {
    setPortfolioItems(portfolioItems.filter((item) => item.id !== id));
  };

  return (
    <div className="portfolio">
      <h2>Memorable Events</h2>
      <button className="add-button" onClick={openForm}>
        <FaPlus /> Add 
      </button>
      <div className="portfolio-list">
        {portfolioItems.map((item) => (
          <div className="portfolio-item" key={item.id}>
            <img src={item.image} alt={item.title} />
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p>Date:{item.date}</p>
            <div className="actions">
              <FaEdit onClick={() => handleEdit(item.id)} className="icon edit" />
              <FaTrash onClick={() => handleDelete(item.id)} className="icon delete" />
            </div>
          </div>
        ))}
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <h3>{isEditing ? "Edit Item" : "Add New Item"}</h3>
            <input
              type="text"
              placeholder="Enter title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter description"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
            <input
              type="date"
              placeholder="Enter date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
            />
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {previewImage && (
              <div className="preview">
                <img src={previewImage} alt="Preview" />
              </div>
            )}
            <div className="modal-actions">
              <button onClick={isEditing ? handleUpdate : handleAdd}>
                {isEditing ? "Update" : "Add"}
              </button>
              <button onClick={closeForm}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
