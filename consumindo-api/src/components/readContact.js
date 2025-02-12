import { useEffect, useState } from "react";
import "./readContact.css";
import axios from "axios";

function ReadContact() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/contatos");
        setContacts(response.data);
      } catch (error) {
        console.error("Erro ao buscar todos:", error);
      }
    };
    fetchContacts();
  });

  return (
    <div className="container">
      <h1 className="title">Lista de Contatos</h1>
      <table className="contact-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
          </tr>
        </thead>
        <tbody>
          {contacts.length > 0 ? (
            contacts.map((contact) => {
              return (
                <tr key={contact.id}>
                  <td>{contact.id}</td>
                  <td>{contact.name}</td>
                  <td>{contact.email}</td>
                  <td>{contact.phone}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td style={{ textAlign: "center" }} colSpan={4}>
                Nenhum contato encontrado
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ReadContact;
