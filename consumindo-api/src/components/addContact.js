import { useState } from "react";
import "./addContact.css";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

function AddContact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const addContact = async () => {
        try {
            await axios.post("http://localhost:3000/contatos",formData);
        } catch (error) {
          console.error("Erro ao buscar contatos:", error);
        }
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        addContact();
        console.log("Contato cadastrado:", formData);
        alert("Contato cadastrado com sucesso!");
        setFormData({ name: "", email: "", phone: "" });
        // window.location.href = "http://localhost:3001/consulta";
        Navigate("/consulta");
    };

    return (
        <div className="container">
            <h1 className="title">Cadastrar Contato</h1>
            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label>Nome:</label>
                    <input 
                        type="text" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label>E-mail:</label>
                    <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label>Telefone:</label>
                    <input 
                        type="tel" 
                        name="phone" 
                        value={formData.phone} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <button type="submit" className="submit-button">Cadastrar</button>
            </form>
        </div>
    );
}

export default AddContact;
