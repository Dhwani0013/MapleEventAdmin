import React, { useState } from "react";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import "./Events.css";

const Events = () => {
  const [eventItems, setEventItems] = useState([
    { id: 1, image: "https://picsum.photos/300/200", title: "Project 1", description: "Description 1"},
    { id: 2, image: "https://picsum.photos/300/200", title: "Project 2", description: "Description 2"},
    { id: 3, image: "https://picsum.photos/300/200", title: "Project 3", description: "Description 3" },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
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
    if (newTitle && newImage && newDescription) {
      const newItem = {
        id: eventItems.length + 1,
        image: previewImage, // Use the preview URL for display
        title: newTitle,
        description: newDescription,
      
      };
      setEventItems([...eventItems, newItem]);
      closeForm();
    }
  };

  const handleEdit = (id) => {
    const itemToEdit = eventItems.find((item) => item.id === id);
    setNewTitle(itemToEdit.title);
    setPreviewImage(itemToEdit.image);
    setNewDescription(itemToEdit.description);
    setIsEditing(true);
    setEditId(id);
    openForm();
  };

  const handleUpdate = () => {
    if (newTitle && newDescription) {
      setEventItems(
        eventItems.map((item) =>
          item.id === editId
            ? { ...item, title: newTitle, image: previewImage,description: newDescription }
            : item
        )
      );
      closeForm();
    }
  };

  const handleDelete = (id) => {
    setEventItems(eventItems.filter((item) => item.id !== id));
  };

  return (
    <div className="event">
      <h2>Event</h2>
      <button className="add-button" onClick={openForm}>
        <FaPlus /> Add
      </button>
      <div className="event-list">
        {eventItems.map((item) => (
          <div className="event-item" key={item.id}>
            <img src={item.image} alt={item.title} />
            <h3>{item.title}</h3>
            <p>{item.description}</p> 
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

export default Events;
