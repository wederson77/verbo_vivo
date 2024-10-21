import React, { useState } from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function App(){
  const [searchTerm, setSearchTerm] = useState("");
  const [versiculos, setVersiculos] = useState([]);
  const [errorMessage, setErrorMessage] = useState(""); //Novo estado para menssagens de erro.

  // Função para buscar os versiculos.
  const handleSearch = async (e) =>{
    e.preventDefault(); // Evita comportamento padrão do formulário.

    try{
      // Faz a requisição GET para a API.
      const response = await fetch(`http://localhost:80/search?word=${searchTerm}`);

      // Caso não tenha uma resposta "ok" da requisição.
      if (!response.ok){
        const errorData = await response.json(); // Obtém a menssagem de erro do backend.
        setErrorMessage(errorData.message); // Armazena a menssagem de erro.
        setVersiculos([]); // Limpa a lista de versículos.
        return;
      }

      const data = await response.json();
      setVersiculos(data); // Armazena os versiculos na lista de estado.
      setErrorMessage(""); // Limpa a menssagem de erro se a busca for bem-sucedida.
    }catch (error){
      console.error("Erro ao buscar versiculos:", error);
      setErrorMessage("Erro ao buscar os versículos. Tente novamente mais tarde.");
    }
  };

  return (
    <div className="App">
      {/*Header*/}
      <header className="header">
        <div className="logo">
          <h1>Verbo Vivo</h1>
        </div>
        <nav>
          <ul>
            <li>Produtos</li>
            <li>Doações</li>
            <li>
              Login <FontAwesomeIcon icon={faUser} size="1x" color="#F4CE14"/> 
            </li>
          </ul>
        </nav>
      </header>

      {/*Main Content*/}
      <div className="main-content">
        {/*Search Bar*/}
        <div className="search-section">
          <form onSubmit={handleSearch}>
            <input 
            type="text"
            placeholder="Pesquise por versiculos"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Atualiza o valor do campo de input.
            />
            <button id="searchButton" type="submit">Pesquisar</button> 
          </form>

          {/* Side Section com a Lista de Versiculos */}
          <div className="side-section">
            <h3>Versículos Listados</h3>
            {/* Exibe a menssagem de erro, se houver */}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <ul>
              {versiculos.length > 0 ? (
                versiculos.map((versiculo, index) => (
                  <li key={index}>
                    <strong>{versiculo.livro} {versiculo.capitulo}: {versiculo.versiculo}</strong> - {versiculo.texto}
                  </li>
                ))
              ) : (
                !errorMessage && <li>Nenhum versículo encontrado, pesquise apenas palavras, não digite números ou emojis.</li>
              )}
            </ul>
          </div>
        
        </div>
      </div>
    </div>
  )
}


export default App;