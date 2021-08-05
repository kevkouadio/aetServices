import React, { useState, useEffect } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, Select, SubjectSelect, FormBtn, SujectSelect } from "../components/Form";
import { Form, Button } from 'react-bootstrap';


function Books() {
  // Setting our component's initial state
  const [books, setBooks] = useState([])
  const [formObject, setFormObject] = useState({})

  // Load all books and store them with setBooks
  useEffect(() => {
    loadBooks()
  }, [])

  // Loads all books and sets them to books
  function loadBooks() {
    API.getBooks()
      .then(res => 
        setBooks(res.data)
      )
      .catch(err => console.log(err));
  };

  // Deletes a book from the database with a given id, then reloads books from the db
  function deleteBook(id) {
    API.deleteBook(id)
      .then(res => loadBooks())
      .catch(err => console.log(err));
  }

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({...formObject, [name]: value})
  };

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  function handleFormSubmit(event) {
    event.preventDefault();
    var data = {first_name: formObject.first_name,
      last_name: formObject.last_name,
      birthdate: formObject.birthdate,
      grade: formObject.grade,
      subject: formObject.subject
    };
    console.log(data);

    //if (formObject.first_name && formObject.last_name) {
      API.saveBook({
        first_name: formObject.first_name,
        last_name: formObject.last_name,
        birthdate: formObject.birthdate,
        grade: formObject.grade,
        subject: formObject.subject
      })
        .then(res => loadBooks())
        .catch(err => console.log(err));
    //}
    
  };
  const current = new Date().toISOString().split("T")[0];
  

    return (
      // <Container fluid>
        <div className="col-sm-6 offset-sm-4 col-md-4">
          {/* <Col size="md-6"> */}
            <Jumbotron>
              <h1>Enter your information to register</h1>
            </Jumbotron>
            <form>
        
              <Input
                onChange={handleInputChange}
                name="first_name"
                placeholder="First name"
              />
              
              <Input
                onChange={handleInputChange}
                name="last_name"
                placeholder="Last Name"
              />
              
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control 
            className="form-group col-md-12"
            onChange={handleInputChange}
            type="date"
            name="birthdate"
            placeholder="select your date of birth"
            autoComplete="off"
            max={current}
            />
              
            <Select 
            name="grade"
            onChange={handleInputChange}/>
            <br/>
            
            <SujectSelect
            name="subject" 
            onChange={handleInputChange}/>
          <br/>
          <br/>
          
              <FormBtn
                //disabled={!(formObject.author && formObject.title)}
                onClick={handleFormSubmit}
              >
                Register
              </FormBtn>
            </form>
         {/* </Col> */}
         </div>
      // </Container>
    );
  }


export default Books;
